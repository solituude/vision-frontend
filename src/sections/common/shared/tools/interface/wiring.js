/**
 * incrum frontend / wiring
 * 
 * This file is part of the Incrum Framework.
 * Copyright (c) Smartlabs 2023-2024.
 * Published under LGPL v3 on Incrum NPM Server.
 * 
 * @author demiurg (SergeyN)
 * @see readme.md
 * @since 2024
 */

import { foreachKey, helpers } from "../helpers"
import { useEffect, useState } from "preact/hooks" // Change preact to react if you working with React

const interfaces = {}
const proxies = {}

const addInterface = (id, isReceiver) => {
	if (interfaces[id] === undefined) {
		interfaces[id] = {
			id: id,
			interface: {
				PosterReload: () => {},
				ReceiverReload: () => {}
			},
			methodsAssignedBy: {}
		}

		proxies[id] = buildProxy(interfaces[id], isReceiver, id)
	}

	return [interfaces[id], proxies[id]]
}

/**
 * Creates proxy wiring object
 * 
 * @param {Object} iface Wiring interface object description
 * @param {boolean} isReceiver Determines which type of wiring interface to create: for receiver (main component) or for poster (child components)
 * @param {string} id Identifier of component
 * @returns Proxy Wiring object to wire components and post into child components to wire with
 */
const buildProxy = (iface, isReceiver, id) => {
	return new Proxy(iface, {
		get: (initialStore, prop, storeInstance) => {
			if (prop == 'getIface') return initialStore
			if (prop == 'setMethods' || prop == 'setProps') {
				return (methods) => {
					if (! helpers.isObject(methods)) throw 'Interface methods must be object'

					/*initialStore.interface = isReceiver
						? {...initialStore.interface, ...methods}
						: {...methods, ...initialStore.interface}*/
					/*foreachKey(methods, (method, instance) => {
						if (initialStore.interface[method] === undefined) {
							initialStore.interface[method] = instance
							initialStore.methodsAssignedBy[method] = id
						}
					})*/

					foreachKey(methods, (method, instance) => {
						if (initialStore.interface[method] === undefined) {
							initialStore.interface[method] = {}
						}

						initialStore.interface[method][id] = instance
					})
				}
			}

			if (initialStore.interface[prop] === undefined)
				return undefined//throw `Method or property '${prop}' is undefined in wiring interface`

			const count = helpers.count(initialStore.interface[prop])

			if (count == 0)
				return undefined//throw `No methods or properties named '${prop}' is defined in wiring interface`

			let one_method
			return (...args) => count > 1
				? foreachKey(initialStore.interface[prop], (id, method) => helpers.isFunction(method) ? method(args) : method)
				: helpers.isFunction(one_method = helpers.first(initialStore.interface[prop])) ? one_method(args) : one_method
		},

		set: (initialStore, prop, val, receiver) => {
			initialStore.interface[prop] = val
			
			isReceiver ? initialStore.interface.PosterReload() : initialStore.interface.ReceiverReload()

			return true
		}
	})
}

/**
 * Creates and uses or uses wiringObject that wires one or more
 * components with one interface with props and methods.
 * 
 * @param {Proxy} wiringObject 
 * @returns Proxy Wiring object to wire components and post into child components to wire with
 */
export const useWiring = (wiringObject) => {
	const [reloader, Reload] = useState(0)

	if (wiringObject !== undefined) {
		wiringObject.setMethods({
			Reload: () => Reload((reloadCounter) => ++reloadCounter),
			PosterReload: () => Reload((reloadCounter) => ++reloadCounter)
		})

		const [id] = useState(wiringObject.getIface?.id)

		useEffect(() => {
			return () => {
				foreachKey(wiringObject.interface, (assignedBy, method) => {
					if (id == assignedBy) delete wiringObject.getIface.methods[assignedBy]
				})
				if (interfaces[id] !== undefined) delete interfaces[id]
				// console.log(id, interfaces)
			}
		}, [])

		const [iface, proxy] = addInterface(id, false)

		return buildProxy(proxy.getIface, false, helpers.getId())
	}

	const [id] = useState(helpers.getId())
	const [iface, proxy] = addInterface(id, true)

	proxy.setMethods({
		Reload: () => Reload((reloadCounter) => ++reloadCounter),
		ReceiverReload: () => Reload((reloadCounter) => ++reloadCounter)
	})

	useEffect(() => {
		return () => {
			if (interfaces[id] !== undefined) delete interfaces[id]
			// console.log(id, interfaces)
		}
	}, [])

	return proxy;
}

/**
 * Creates components wiring object
 * 
 * @param {object} methods 
 * @returns Proxy Wiring object to wire components and use in useWiring
 */
export const createWiring = (methods = {}) => {
	const [iface, proxy] = addInterface(helpers.getId(), true)

	proxy.setMethods({
		...{
			Reload: () => {},
			ReceiverReload: () => {}
		},
		...methods
	})

	return proxy
}