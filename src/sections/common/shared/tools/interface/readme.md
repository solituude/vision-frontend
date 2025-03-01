# incrum frontend framework packages

## wiring
Package allows to wire two or more React/Preact components with interface-based interaction and use methods of one component in another one (the count of components are wired with one interface is not limited). Wired components can be logically arranged in one context or defined in different contexts (it does not matter where wired components are located).

`@incrum/wiring` is part of incrum framework and can be included from incrum npm server.

## Discussion
The Wiring object is an interface that contains a list of methods (defined in component's scope) that can be accessed from another component or scope to solve some tasks of data or events direct transport or perform direct control of concrete component from anther scope or another component.

An example of application is a case where it is necessary to close a modal window when events occur outside the context of this window. In this case, the modal window can broadcast the closing method to the Wiring object, and this method can be called from an external context. This allows not to rigidly bind the implementation of the modal window component to the control logic and not to pass logic and events to the component that are not the tasks of this component (the principle of single responsibility).

Also, in React, to transfer data up the component tree from the lower to the upper, it is usually necessary to declare data transfer mechanisms in each component by level, for example, the "onChange" property, which greatly complicates the code. In the case of using the Wiring object, it is enough to define a method for obtaining this data for the upper-level components at the lowest level of the component tree (in the component that broadcasts the initial data change event), which provides the ability to obtain the necessary data at the moment when they are needed according to the logic defined specifically at the upper level of the hierarchy, which also allows you to untie the responsibility and dependencies of the components.

The example above shows a case where the components are located in the same context, and in this case there are mechanisms for transferring events up the tree within the context. However, there are cases when the components are located in different contexts, which significantly complicates the implementation of data transfer between components. In some cases, reactive storage is used, but it is not always elegant and clear to implement a transparent algorithm for transferring events and data using a reactive storage, and in some cases it is also unjustified from the point of view of optimal use of resources.

Using the proposed Wiring package solves many different cases, providing direct access to methods defined inside the component through the Wiring object.

## The Wiring package
Wiring module export two methods:
- `useWiring` - A hook that provides concrete or new created wiring object inside the component to use with.
- `createWiring` - Standalone method to create global wiring object inside module scope and use it in another modules (and components)

Created Wiring object contains methods:
- `setMethods` - method allows to define methods inside component. Defined methods will be accessible in another components through the Wiring object.
- `getIface` - returns object with methods defined in it. Can de used to read the interface and get information about existant methods in Wiring object.

## Common usage
### Create wiring in top component and use methods of lower-leveled components
````js
const Child = ({wiring}) => {
	/**
	 * Here component uses concrete wiring object provided from another component.
	 * useWiring() here will not create new wiring object but use concrete provided.
	 * If provided wiring is undefined, new one will be created and used.
	*/
	const wirings = useWiring(wiring)

	wirings.setMethods({
		// Child component defines common_method() in wiring object
		common_method: (from) => console.log('Child handler' + from)
	})

	return <span>
		Child {wirings.abc}
		<Button onClick={
			() => {
				wirings.common_method(' - from Child')
				// Call top level component method
				wirings.Some_Method_Of_TopC_Component(' - from Child')
				wirings.abc = '888'
			}
		}>
			Child2
		</Button>
	</span>
}

const Child2 = ({wiring}) => {
	/**
	 * Here component uses concrete wiring object provided from another component.
	 * useWiring() here will not create new wiring object but use concrete provided.
	 * If provided wiring is undefined, new one will be created and used.
	*/
	const wirings = useWiring(wiring)

	wirings.setMethods({
		// Child2 component defines common_method() in wiring object
		common_method: (from) => console.log('Child2 handler' + from)
	})

	return <span>
		Child2 {wirings.abc}
		<Button onClick={
			() => {
				wirings.common_method(' - from Child2');
				// Setting some data to wiring object. Data will be accessible in all
				// components that using this wiring object
				wirings.abc = '1232'
			}
		}>
			Child2
		</Button>
	</span>
}

const TopC = () => {
	/**
	 * useWiring called without arguments creates new Wiring object
	 * that will be accessible during the life cycle of current component
	*/
	const wiring = useWiring()

	/**
	 * Calling setMethods() method allows to TopC to provide its inner method to
	 * other components that will use current wiring object
	 */
	wiring.setMethods({
		Some_Method_Of_TopC_Component: (from) => console.log('SMA TopC handler' + from),
		// TopC component defines common_method() in wiring object
		common_method: (from) => console.log('TopC handler' + from)
	})

	/**
	 * We provide wiring object to low-level components
	*/
	return <>
		<p>
			Top component {wiring.abc}
			<Button
				onClick={
					() => {
						// Call common_method() of wiring
						wiring.common_method(' - from TopC')
						// Store some data to wiring object
						wiring.abc = 'TopC'
					}
			}>
				Topc
			</Button>
			{/* provide wiring object to children */}
			<Child wiring={wiring}/>
			<Child2 wiring={wiring}/>
		</p>

	</>
}
````
The console outputs:

When click on `Child2` button:
````console
TopC handler - from Child2
SMA TopC handler - from Child2
Child handler - from Child2
````

When click on `Child` button:
````console
TopC handler - from Child
Child handler - from Child
````

When click on `TopC` button:
````console
TopC handler - from TopC
Child handler - from TopC
````
As showed above all methods defined in wiring object is accessible from all components and all defined methods are called.

In components we define three methods (in each component) with name `common_method` to show that all defined methods will be accessible with calling them and all three methods will be executed on `wiring.common_method(...)` and results will be returned as array. It is not necessary to define same named methods in all components: every component can provide its own interface.

`Some_Method_Of_TopC_Component()` method will be also accessible in all components.

When undefined method will be called from wiring object nothing bad is happend and `undefined` will be returned.

Setting properties of wiring object is allowed and properties are set will be accessible in all components that use concrete wiring object.

### Using global defined wiring object
````js
// .... Child and Child2 are the same as in example above

const iface = createWiring({
	method: (from) => console.log('global handler' + from)
})

const TopC = () => {
	/**
	 * useWiring called with argument `iface` and will use global defined wiring object
	*/
	const wiring = useWiring(iface)

	/**
	 * Calling setMethods() method allows to TopC to provide its inner method to
	 * other components that will use current wiring object
	 */
	wiring.setMethods({
		Some_Method_Of_TopC_Component: (from) => console.log('SMA TopC handler' + from),
		// TopC component defines common_method() in wiring object
		common_method: (from) => console.log('TopC handler' + from)
	})

	/**
	 * We provide wiring object to low-level components
	*/
	return <>
		<p>
			Top component {wiring.abc}
			<Button
				onClick={
					() => {
						// Call common_method() of wiring
						wiring.common_method(' - from TopC')
						// Store some data to wiring object
						wiring.abc = 'TopC'
					}
			}>
				Topc
			</Button>
			{/* provide wiring object to children */}
			<Child wiring={wiring}/>
			<Child2 wiring={wiring}/>
		</p>

	</>
}
````
The console output will be the same as above example but using global defined wiring object allows to share wiring interfaces in meaning of conponent independent usage.

### Memory usage
Global wiring object instantiates and exists all time of app lifecycle.

Local (inside component) wiring object instantiated at component mounting and will be destroyed when component is unmounted.

Methods that defined by components will be accessible when component is mounted and becomes inaccessible when component is unmounted from DOM.