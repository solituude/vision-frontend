/**
 * Incrum Framework
 * 
 * Reactive store engine
 * Fast reactive lightweight store engine.
 * 
 * This file is part of the Incrum Framework.
 * Copyright (c) Smartlabs 2023-2024.
 * Published under LGPL v3 on Incrum NPM Server.
 * 
 * @author demiurg (SergeyN)
 * @see readme.md
 * @since 2024
 */

/**
 * Incrum uses primaryly a preact as rendering engine.
 * So if you using react rendeerer, change imports of same hooks of react.
 * This store engine is complient with react/preact renderers.
 */
import {useState, useEffect} from 'react'
import {helpers} from '../helpers'

let id = 0;
let redrawCounter = 0;
let updaters = {}

let idStack = [];
let redrawStack = [];

/**
 * useStore hook. Must be used inside the component.
 * 
 * @param {Object} store Previously built store with buildStore() method
 * @returns Object store
 */
const useStore = (store, serviceContainer, containerDependencies) => {
	/**
	 * This hook contains a logic that performs redrawing component trigger
	 * when store state is changed.
	 * This implemented with using inner state of component to store redraw identification
	 * counter that will be changed when component's dependencies (properties of store that used
	 * in component in 'get' mode) has been changed.
	 */

	// create redrawing trigger with useState hook
	const [redraw, setRedraw] = useState(redrawCounter++);
	const [refId] = useState(id++);

	idStack.push(refId);
	redrawStack.push(setRedraw);

	// mount and unmount of component is significant for unsubscribing.
	useEffect(() => {
		// here component is mounted. We dont subscribe component here.
		// The subscription must be handled only when component uses (reads) properties from store.
		return () => {
			// Here component is unmounted.
			// Here component must be unsubscribed from property dependency.
			unsubscribe(store, refId)
		}
	}, [])

	useEffect(() => {
		// after render effect
		idStack.pop();
		redrawStack.pop();
	})

	return [
		store,
		createServiceContainer(store, serviceContainer, containerDependencies)
	]
}

/**
 * Creates service container for current store usage in component
 * 
 * @param {Object} store Initial store object
 * @param {Object} container 
 * @param {Object} containerDependencies 
 * @returns service container object
 */
const createServiceContainer = (store, container, containerDependencies) => {
	if (! container) return null;
	if (! helpers.isFunction(container))
		throw 'Service container must be a function'

	const holder = {
		store: store,
		container: null,
		dependencies: containerDependencies ?? {}
	}

	const service = new Proxy(holder, {
		get: (_holder, method, thisProxy) => {
			const container = _holder.container;

			if (container[method] !== undefined) {
				return (...args) => {
					_holder.store.disableSubscription()
					const result = container[method](...args)
					_holder.store.enableSubscription()
					return result
				}
			} else
			if (_holder.dependencies[method] !== undefined) {
				return _holder.dependencies[method];
			}

			throw 'Unknown reactive store service container method called: ' + method
		}
	})

	holder.container = container(store, service)

	return service;
}

/**
 * Subscribe currently on render component as dependent on concrete property
 * of store.
 * 
 * @param {*} prop Property of store
 * @param {*} store Store instance object
 */
const subscribe = (prop, store) => {
	if (store.__subscribers[prop] === undefined) {
		store.__subscribers[prop] = new Set()
	}

	if (! idStack.length) return;

	const id = idStack.pop(); idStack.push(id);
	const redraw = redrawStack.pop(); redrawStack.push(redraw);

	store.__subscribers[prop].add(id);
	updaters[id] = redraw
}

/**
 * Unsubscrube concrete component out of store property dependency.
 * 
 * @param {Proxy} store Store instance object
 * @param {int} refid Component reference Id
 */
const unsubscribe = (store, refid) => {
	const subscribers = store.getInitial.__subscribers

	Object.keys(subscribers).map((prop) => {
		if (subscribers[prop].has(refid)) subscribers[prop].delete(refid);
	})

	if (updaters[refid] !== undefined) delete updaters[refid]
}

/**
 * Perform component updating (redrawing). Runs when store property is changed.
 * 
 * @param {*} prop Property of store
 * @param {*} store Store instance property
 */
const handleUpdate = (prop, store) => {
	if (store.__subscribers[prop] !== undefined)
		store.__subscribers[prop].forEach(refid => {
			if (updaters[refid] !== undefined) updaters[refid](id++)
		});
}

/**
 * Builds instance of reactive store.
 * 
 * @param {*} obj Initial Store Object (key-value instance).
 * @param {*} opts Options
 * @returns Reactive store instance ready to work with.
 */
const buildStore = (obj, opts) => {
	obj.__subscribers = {}
	obj.__opts = {
		...{
			'history': false
		},
		...opts
	}
	obj.__subscribtionStopped = false
	obj.__extenders = {
		/**
		 * Concrete store functionality extender. Define methods that can be called from outside
		 * of store to work with inner store instances.
		 * 
		 * @param {object} initialStore Initial store object
		 * @param {Proxy} store Reactive Store object Instance
		 * @returns extend definition function (string name, closure handler)
		 */
		extend: (initialStore, store) => {
			return (name, handler) => {
				if (name === 'extend') {
					throw 'Store extender cant be called as "extend". extend() method cant be overrided';
				}
				initialStore.__extenders[name] = handler
				return store
			}
		},
		getInitial: (initialStore, store) => initialStore
	};
	
	const store = new Proxy(obj, {
		/**
		 * Main property getter. Subscribes current component to current property changings.
		 * 
		 * @param {object} initialStore Initial store
		 * @param {string | symbol} prop Property name
		 * @param {Proxy} storeInstance Current Store Instance
		 * @returns mixed typed value of requested property.
		 */
		get: (initialStore, prop, storeInstance) => {
			// console.log('get', prop)
			// run extenders if prop is named as extender
			if (initialStore.__extenders[prop] !== undefined) {
				return initialStore.__extenders[prop](initialStore, storeInstance);
			}

			if (! initialStore.__subscribtionStopped)
				subscribe(prop, initialStore);

			return initialStore[prop];
		},
		/**
		 * Main property value setter. Runs update process for requested property subscribers (redraw chains run).
		 * @param {object} initialStore Initial store
		 * @param {string | symbol} prop property name
		 * @param {*} val value to be assigned to property
		 * @param {Proxy} receiver Current Store Instance
		 * @returns true
		 */
		set: (initialStore, prop, val, receiver) => {
			const oldVal = initialStore[prop];

			if (oldVal != val || !helpers.isEqual(val, oldVal)) {
				// save into history
				if (initialStore.__opts['history'] === true)
					initialStore.__history.set(prop, initialStore[prop]);

				initialStore[prop] = val;

				handleUpdate(prop, initialStore)
			}

			return true;
		}
	})

	obj.__history = new history(store, obj);

	return extendStoreWithDefaultExtenders(store)
}

/**
 * The store property capsule component
 * @param {Object} param0 Props of component: propname to incapsulate, store, isContext flag
 * @returns JSX
 */
const StoreCapsule = ({propname, store, template}) => {
	// The main idea of capsulation is that capsulated store item redraws capsulated component (StoreCapsule) and shows/uses value of item in capsulated component
	// without redrawing of parent component.
	// Here we can use store with useStore method and create new instance of store and it will be fully capsulated item.
	// Another way is using parent component's store instance and not creating new store instance for capsule. So in this case parent component will be redrawn
	// on store item changes because of store instance is attached to component and every using of item will subscribe component to changes.
	const [innerstore] = useStore(store);
	return <>{ template && helpers.isFunction(template) ? template(innerstore[propname]) : innerstore[propname] }</>
}

const extendStoreWithDefaultExtenders = (store) => {
	return store
		/** Capsulation extender */
		.extend('capsulate', (initialStore, store) => {
			return (prop, template) => <StoreCapsule propname={prop} store={store} template={template}/>
		})
		/** Check if property is exists in  */
		.extend('exists', (initialStore, store) => {
			return (prop) => initialStore[prop] !== undefined
		})
		/** Get property value silently (without component subscribing on property changes) */
		.extend('silent', (initialStore, store) => {
			return (prop) => initialStore[prop];
		})
		/** Set property value silently (dont fire up onChange components readraw) */
		.extend('silentSet', (initialStore, store) => {
			return (prop, value) => initialStore[prop] = value;
		})
		/** Disable subscribtion to cahnge events. All assignments to store properties will not fire redraw events after this method is called. */
		.extend('disableSubscription', (initialStore, store) => {
			return () => initialStore.__subscribtionStopped = true;
		})
		/** Enable subscribtion to change events. Store will work in default reactive logic. */
		.extend('enableSubscription', (initialStore, store) => {
			return () => initialStore.__subscribtionStopped = false;
		})
		/** Returns access to store history */
		.extend('history', (initialStore, store) => {
			return initialStore.__history
		})
		.extend('historyEnable', (initialStore, store) => {
			initialStore.__opts['history'] = true
		})
		.extend('historyDisable', (initialStore, store) => {
			initialStore.__opts['history'] = false
		})
}

class history {
	data = {};
	age = 0;

	constructor(store, initialStore) {
		this.store = store;
		this.initialStore = initialStore;
	}

	set(prop, value) {
		this.data[++ this.age] = {[prop]: value}
	}

	back() {
		if (this.age === 0 || this.data[this.age - 1] === undefined) return

		Object.keys(this.data[--this.age]).map((property) => {
			this.store[property] = this.data[this.age][property]
		})
	}

	forward() {
		if (this.data[this.age + 1] === undefined) return;

		Object.keys(this.data[++this.age]).map((property) => {
			this.store[property] = this.data[this.age][property]
		})
	}
}

const useRefreshTriggeredBy = (refreshTrigger, callbackWhenTriggered) => {
	const [counter, refresh] = useState(0)

	useEffect(() => {
		if (counter !== 0) callbackWhenTriggered && callbackWhenTriggered()
	}, [counter])

	refreshTrigger.trigger = () => {
		refresh(counter + 1)
	}
}

export {
	useStore,
	buildStore,
	useRefreshTriggeredBy
}