# Incrum state manager

Provides reactive observable object storage for React/PReact applications.
This storage works blazingly fast and supports optimized pointed UI updating
for dependent components only.

## Getting started

Import store
````js
import {buildStore, useStore} from './store'
````

Create (build) storage from parameters object with default values:
````js
const appStore = buildStore({
	var1: 1,
	var2: 2,
	var3: 3
})
````

use appStore in component (default usage):
````js
import {useStore} from './store'
import {appStore} from './appStore'

const TheComponent = () => {
	const [store, services] = useStore(appStore)

	// Change property value in store
	// This changine will trigger compenents redrawing that read value from store.var2
	// Current component will not be subscribed for store.var2 changes because
	// component stores value in store.var2 but not reads a value from it.
	store.var2 = 'some value'

	return (
		<>
			{/* Use property from store */}
			{/* This will make a subscription for current component on event of store.var1 changing and when it was changed current component will be re-rendered*/}
			<p>{store.var1}</p>
		</>
	)
}
````

## How incrum store works
The buildStore() method creates a JS Proxy object of given object for further observe this object on changes and reads of/from its properties.

When someone reads property value from store the store engine perform subscribing current component as dependency of current property returning its real actual value.

When someone changes property value in the store engine will trigger re-render for all components in list of dependencies of current property is changed.

This simple algorithm based on JS Proxy works natively and very fast providing reactive UI state processing.

## Service containers
Service container allows to move some logic outside from component. It is more effective that using of useCallback or something like that. Service container blocks subscribing and allows using store values freely. Service container does not block re-rendering events and store works full-featured.

usage:
````js
import {appStore} from './appStore'

const services = (store) => ({
	someMethod: (arg1, arg2) => {
		// store.var1 is changed, re-renders of dependent components will be triggered
		// store.var3 is read, component that uses this service will not be subscribed on this value changes
		store.var1 = arg1 + arg2 + store.var3;
		return /*you can return everything you need*/
	},
	/*you can implement here all services you want and need*/
})

const Component = () => {
	const [store, service] = useStore(appStore, services)

	service.someMethod(2,3)

	return <>
		<Button onClick={() => service.someMethod(4,5)}>Button</Button>
	</>
}
````
Currently used store will be injected inside service container. Service container will not be instantiated every time when component renders unlike useCallback hook.


## Additional features

### Capsule: Dependency and store values capsulation
The main and very useful feature of incrum store engine is capsulation of properies. To optimize re-renders count you can capsulate properties of store.

````js
// Some big component...
const [store, service] = useStore(appStore)

// ...

return <>
	<p>{store.capsulate('var3')}</p>
</>
````

In example before capsulated var3 property will not subscribe component for changes but will re-render a value of var3 inside a capsule. A capsulate() method injects a capsule component inplace of using `store.capsulate(...)` method and injected capsule component will be subscribed on `var3` changes and only capsule will be re-rendered. This feature allows to grow up the performance of UI and makes application working blazingly fast.

The common usecase is:
When we need not only value showing but perform some processing if its value, like showing some text near it or inject a comment for value like 'low, middle, high' or something. For this we have to provide a template component inside capsule method. Template is just a function that returns a component. Template will be not subscribed on value changing but only capsule provides this feature.
````js
const PropTemplate = (propValue) => {
	let comment;
	if (propValue < 3) comment = 'low' else
	if (propValue > 3 && propValue < 6) comment = 'middle' else
	if (propValue > 6) comment = 'high';

	return <>{propValue} ({comment})</>
}

// Some big component...
const [store, service] = useStore(appStore)

// ...

return <>
	<p>{store.capsulate('var3', PropTemplate)}</p>
</>
````

### Store functionality extending
You can extend store functionality with using .extend() method when you build your store.
````js
const store = buildStore({/* here you store initial object*/})

store.extend('someMethodName', (initialStore, store) => {
	// here implementation of your extender
})
````
This allows you to provide additional features to your reactive application store. Inside an implementation function you have two basic parameters: `initialStore` - your object of store that you have specified in buildStore method as is and `store` - reactive store. Be careful with using `store` inside implementor: it is full powered and reactive and can subscribe current activity place in code like inside a component and will trigger redraw events. To silently work with store inside implementor use initialStore.

#### Default extenders
`capsulate` - make property cupsule. described above.

`exists(propName)` - returns true if property exists in storage

`silent(propName)` - returns value of propName without components subscribing on propName value changes

`silentSet(propName, value)` - set value to propName without triggering re-renders

`history` - returns store history object to navigate on store history

`historyEnable` - enables using history

`historyDisable` - disables using history

## Store history

`.history()` method of store returns object with two methods: `forward()` and `back()`. `back()` method performs UNDO functionality and moves history of store into its past state. `forward()` method performs REDO functionality and moves history of store into its future state or do nothing if future is not exists.

By default history feature is disbled. To enable it create store with option {'history': true}:
````js
const store = buildStore(
	{/* store object */},
	{
		'history': true
	}
)
````