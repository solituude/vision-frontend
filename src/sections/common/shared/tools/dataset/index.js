/**
 * Incrum Framework
 * 
 * Datasets managing package
 * Reactive data management methods implementation.
 * Those methods are developed during science work.
 * 
 * This file is part of the Incrum Framework.
 * Copyright (c) Smartlabs 2023-2024.
 * Published under LGPL v3 on Incrum NPM Server.
 * 
 * @author demiurg (SergeyN)
 * @see readme.md
 * @since 2024
 * @version 1.0.73-dev
 */

/**
 * Datasets managing package.
 * Copyright Smartlabs (c) 2023. Distributed under MIT License. 2023
 * Version: 1.0.1 DEV
 * 
 * Author: Sergey N.
 */

import { useEffect, useState } from "react";
import {
	fetch as FetchRequest,
	unsubscribeConcurrent,
	IDLE, PENDING, FINISHED, ERROR, NODATA, UPDATING, cacheRemoveForPayload
} from "./fetcher";
import { foreachKey, helpers } from "../helpers";
// import { useContextStore } from "../incrumStore/store";
import { registerGarbage, unregisterGarbage } from './garbageCollector';

import { registerDebugger } from "../debug";

// import { competenciesDatasource, competencySave } from "../../datasources/competenciesDatasource";

const d = registerDebugger(false, 'DatasetPackage');

const datasets = {};

const globalHandlers = {
	onSuccess: new Set(),
	onError: new Set(),
	onProgress: new Set()
}

// setInterval(() => {
// 	console.log('datasets:', datasets);
// }, 5000);

// state to state name dictionary
const stateNames = {
	[IDLE]:		'idle',
	[PENDING]:	'pending',
	[UPDATING]: 'updating',
	[FINISHED]:	'finished',
	[ERROR]:	'error',
	[NODATA]:	'no-data'
}

/**
 * Returns string representation of state
 * @param {int} state State integer value
 * @returns string representation of state
 */
const stateToString = (state) => {
	return state && stateNames[state] ? stateNames[state] : 'unknown';
}

/* Data mutation observer (mos) */

/**
 * MOS Listeners updater
 * @param {Array} mos MOS listeners array
 * @param {Object} payload Current payload
 * @returns void
 */
const mosUpdate = (mos, payload, comparator) => {
	if (!mos || !mos.length) return;

	mos.map((snapshot) => {
		if (
			helpers.isEqual(payload, snapshot.payload) ||	// if payloads are equal
			!snapshot.payload || 							// if snapshot payload is undefined or null
			!helpers.count(snapshot.payload) ||				// if snapshot payload is empty
			(comparator && comparator(payload, snapshot.payload)) // if comaprator exists and returns true
		)
			Object.keys(snapshot.subscribers).map((sub_id) => {
				// run state setter of subscriber
				snapshot.subscribers[sub_id](snapshot.payload, false, undefined, undefined, undefined, true);
			})
	});
}

const mosTryCancelCurrentlyOnPendingSnapshots = (payload, comparator, dataSource) => {
	const payloadSnapshotPool = dataSource.payloadPool;

	d.log('mosTryStopReload: ', payload, comparator, JSON.stringify(payloadSnapshotPool));
	d.log('datasource:', JSON.stringify(dataSource));

	const todel = [];
	var index = 0;

	// console.log(dataSource.onlyOneAtOnce);

	payloadSnapshotPool.map((snapshot) => {
		if (
			dataSource.onlyOnePendingAtOnce === true ||
			(
				helpers.isEqual(payload, snapshot.payload) ||	// if payloads are equal
				!snapshot.payload || 							// if snapshot payload is undefined or null
				!helpers.count(snapshot.payload) ||				// if snapshot payload is empty
				(comparator && comparator(payload, snapshot.payload)) // if comaprator exists and returns true
			)
		) {
			// set the fact of snapshot is canceled to prevent error event flow
			snapshot.isCanceled = true;
			// abort (cancel) current reuqest. After aborting fetcher's onError events will be fired and it wont
			// rise the error to data receivers.
			snapshot.transport.abort();

			d.log('snapshot:', JSON.stringify(snapshot));
			// erase current snapshot
			// snapshot.payload = helpers.getId(); // this works fine but it 

			// Push current snapshot to removeList
			todel.push(index++);
		}
	})

	todel.reverse().map((index => dataSource.payloadPool.splice(index, 1)));
}

/**
 * Subscribe component to data mutations for currently used payload of datasource
 * @param {string} id Component identificator (created by useDataset and actual for rendered components)
 * @param {Object} request the datasource (request) object
 * @param {Object} payload Current payload
 * @param {callback} stateSetter State setter of useDataset hook
 */
const subscribeMutationObserver = (id, request, payload, stateSetter) => {
	if ( request.mos == undefined )	{
		request.mos = [];
	}

	const mos = request.mos;
	// set update function to request
	request.mosUpdate = (payload, comparator) => mosUpdate(mos, payload, comparator);

	// get snapshot
	var snapshot = null;
	for (const item of mos) {
		if (helpers.isEqual(payload, item.payload)) {
			snapshot = item;
			break;
		}
	}

	// if payload snapshot has not been found we create new payload snapshot
	if (!snapshot) {
		snapshot = {
			payload: payload,
			subscribers: {}
		}
		mos.push(snapshot);
	}

	snapshot.subscribers[id] = stateSetter;
}

/**
 * Unsubscribe component from data mutations. Function called when component will finally unmount.
 * @param {string} id Component identificator
 * @param {Object} request the datasource (request) object
 * @returns void
 */
const unsubscribeMutationObserver = (id, request) => {
	const mos = request.mos ? request.mos : null;
	if (!mos) return;


	registerGarbage(request, id);

	const toremove = [];
	mos.map((snapshot) => {
		if (snapshot.subscribers[id] !== undefined) delete snapshot.subscribers[id];
		if (!helpers.count(snapshot.subscribers)) toremove.push(mos.indexOf(snapshot));
	});
	toremove.reverse().map((index) => mos.splice(index, 1));
}

/* Dataset inner state manager */

const INITIAL	= 1;
const SET		= 2;

const registerDataset = (id) => {
	if (!datasets[id]) {
		datasets[id] = {
			payload: null,
			initialPayload: null,
		}
	}

	return datasets[id];
}

const unregisterDataset = (id) => {
	datasets[id] && delete datasets[id];
}

/* Dataset hooks */

/**
 * Use dataset hook
 * @param {Object} request request definition object
 * @param {Object} initialPayload Initial payload
 * @param {bool} immediatelly on component mount start/not start data loading
 * @returns array: state, methods
 */
export const useDataset = (request, initialPayload, immediatelly) => {
	const [state, setComponentState] = useState(IDLE);
	const [data, setData] = useState(null);
	const [transportStatus, setTransportStatus] = useState({code: 0, message: ''})
	//const [payload, setNewPayload] = useState(initialPayload ? initialPayload : request.payload);
	const [id, setId] = useState(helpers.getId());

	d.log('useDataset run', id, initialPayload, state)

	const current = registerDataset(id);
	current.state = state;

	const setState = (state) => {
		d.log('useDataset.SetState(): set component state to', state, 'oldcurrent:', current.state, 'compstate', state, 'component id:', id, 'data is', data ? 'exists' : 'not exists');
		current.state = state;
		setComponentState(state);
	}

	// Setting up the group state: data loading state, current payload and data.
	// Switching MOS subscribing
	const setGroupState = (newState, newPayload, newData) => {
		d.log('UseDataset.setGroupState(): setGroupState', newState, 'oldcurrent:', current.state, 'compstate', state, 'component id:', id);
		setState(newState);
		setData(newData);

		// unsubscribe from previous data mutation set
		unsubscribeMutationObserver(id, request);
		// subscribe for current data mutation
		subscribeMutationObserver(id, request, current.payload, setPayload);
	}

	// Async Data fetcher. Uses fetch (FetchRequest) from fetcher module.
	const fetch = (useCache = true, onSuccess, onError, onProgress) => {
		unregisterGarbage(request, current.payload);

		// if dataset in PENDING state try to abort current request if onlyOneAtOnce is set
		// this not widely tested. The main risk is when we have many concurrent requests.
		// Todo: test abort pending on many concurrent requests.
		if (current.state == PENDING && request.onlyOnePendingAtOnce) {
			// mosTryCancelCurrentlyOnPendingSnapshots(current.payload, null, request);
		}

		FetchRequest(
			request, current.payload, id, setState, useCache,
			(data) => { // run order 3
				d.log('UseDataset.fetch(): fetcher load', data, 'component id:', id);

				setGroupState(FINISHED, current.payload, data);
				onSuccess && onSuccess(data);

				// Run global answer handlers
				runSuccessGlobalHandlers(data, request, current.payload);

				d.log(request);
			},
			(data) => {
				d.log('UseDataset.fetch(): fetcher error', data, 'component id:', id);

				// Run global answer handlers
				runErrorGlobalHandlers(data, request, current.payload);

				setData(null);
				setTransportStatus(data?.status);

				onError && onError(data);
			},
			(data) => {
				onProgress && onProgress(data)
			}
		);
	}

	// First add component and totally remove component processing. componentDidMount and componentWillUnmount.
	// Runs unsubscribing from concurrents and MOS
	useEffect(() => {
		d.log(`UseDataset: component ${id} mounted. registering mount/unmount dataset processing. Run fetching if imm.`)

		// we have first run state
		current.payload = initialPayload;
		current.initialPayload = initialPayload;

		const imm = ((immediatelly !== undefined && immediatelly === true) || (immediatelly === undefined && request.immediatelly))

		imm && fetch();

		return () => {
			// here we have to put unsubscribing from request
			d.log(`UseDataset: component ${id} unmounted. clear all subscribings.`);

			// if dataset in PENDING state try to abort current request
			// this not widely tested. The main risk is when we have many concurrent requests.
			// Todo: test abort pending on many concurrent requests.
			if (current.state == PENDING) {
				mosTryCancelCurrentlyOnPendingSnapshots(current.payload, null, request);
			}

			unsubscribeConcurrent(id, request, current.payload);

			unsubscribeMutationObserver(id, request);
			unregisterDataset(id);
		}
	}, [])

	// Process setting new payload and start fetching data
	const setPayload = (newPayload, useCache = true, onSuccess, onError, onProgress, isMos) => {
		d.log('setPayload: ', newPayload, 'useCache:', useCache, 'component id:', id, 'isMos:', isMos)

		if (isMos) {
			// if current payload comes from MOS Updater we have to clean cache to prevent
			// situation when 
			if (request.cacheDriver) {
				d.log('setPayload: remove cache for', current.payload)
				// request.cacheDriver.remove && request.cacheDriver.remove(current.payload);
				// cacheRemoveForPayload(request, current.payload)
			}
		} else {
			if (current.state == PENDING && request.onlyOnePendingAtOnce) {
				mosTryCancelCurrentlyOnPendingSnapshots(current.payload, null, request);
			} else {
				unsubscribeConcurrent(id, request, current.payload);
			}
		}

		// if newPayload is not given we have to force reload data for current payload
		if (!newPayload) {
			d.log('No newPayload give. Run fetch with useCache', 'component id:', id)
			fetch(useCache, onSuccess, onError, onProgress);
			return;
		}

		// we have newPayload given. Force load it.
		d.log('newPayload given. Run fetch with useCache. set curPayload to newPayload', 'component id:', id)
		current.payload = newPayload;
		fetch(useCache, onSuccess, onError, onProgress);
	}

	if (current.payload) {
		// we have first or more run state
		if (!helpers.isEqual(initialPayload, current.payload)) {
			// we have changed payload or initialPayload
			if (!helpers.isEqual(current.initialPayload, initialPayload)) {
				// we have initialPayload changed
				current.initialPayload = initialPayload;
				current.payload = initialPayload;
				current.state = IDLE;
			}
			
			const imm = ((immediatelly !== undefined && immediatelly === true) || (immediatelly === undefined && request.immediatelly))

			if (current.state == IDLE && (immediatelly === true || imm)) {
				d.log('UseDataset: Running fetch on payloads change and state IDLE', current.state, state, initialPayload, current.payload, 'component id:', id);
				fetch();
			}
		}
	}

	return [
		{
			isIdle: state == IDLE,
			isFirstPending: data == null && (state == PENDING || current.state == PENDING),
			isPending: state == PENDING,
			isFinished: state == FINISHED,
			isUpdating: data !== null && (state == PENDING || current.state == PENDING || state == UPDATING || current.state == UPDATING),
			isError: state == ERROR,
			isNodata: state == NODATA || data == null,
			asString: () => stateToString(state),
			status: transportStatus,
			progress: ''
		},
		data,
		setPayload,
		id
	];
}

/**
 * useDataUpdate hook
 * @param {object} initialRequest Datasource request object
 * @param {callback} onSuccess On success callback
 * @param {callback} onError On error callback
 * @returns Callback to set payload to start updating request
 */
export const useDataUpdate = (initialRequest, onSuccess, onError) => {
	const [request, setRequest] = useState(initialRequest);
	const [successActions, setSuccessActions] = useState(onSuccess);
	const [errorActions, setErrorActions] = useState(onError);

	const setPayload = (payload, directSuccessAction, directErrorAction) => {

		const beforeMiddlewareStack = runDataUpdateMiddleware(request, payload, null, true);

		(new Promise((presolve, preject) => {
			// Cancel snapshots currently on pending
			// This is needed if dataset is currently on pending mode with payloads the data of is depending on mutation request
			// we will send above. This situation if we wont cancel current pending will give us a bug when after mutation request
			// if dataset will be still in pending mode it wont updating and data will be not actual.
			// When we stop current pending of depending snapshots and run mutation request and it will be finished fine
			// the MOS updating will run the same updating request with all snapshot that was canceled.
			// This block of code can be moved to [Promise.success] function. But here we will cancel current requests more effective.
			request.mutationReceivers.map((receiver) => {
				if (receiver.dataSource) {
					const payload = receiver.payloadAdapter ? receiver.payloadAdapter(beforeMiddlewareStack.payload) : beforeMiddlewareStack.payload;
					if (receiver.dataSource.payloadPool && receiver.dataSource.payloadPool.length) {
						mosTryCancelCurrentlyOnPendingSnapshots(payload, receiver.payloadComparator ? receiver.payloadComparator : null, receiver.dataSource);
					}
				}
			})

			// Run mutation request
			request.connectionDriver(
				(response) => presolve(response),  // run order - 1				
				(response) => preject(response),
				(progressObject) => () => {},
				beforeMiddlewareStack.address,
				beforeMiddlewareStack.payload
			);
		})).then(
			data => {	// run order - 2
				/**
				 * To lines above has not been here, not tested.
				 * Added 27.10.2024 @archicoder
				 */
				// Run global answer handlers
				runSuccessGlobalHandlers(data, request, beforeMiddlewareStack.payload);
				// Run responseStatusHandler of request
				request.responseStatusHandler && request.responseStatusHandler(data);

				// run after middlewares
				const afterMiddlewareStack = runDataUpdateMiddleware(request, beforeMiddlewareStack.payload, data, false);

				directSuccessAction && directSuccessAction(afterMiddlewareStack.response);

				if (successActions && successActions.length) {
					successActions.map((action) => action(request, afterMiddlewareStack.payload, data))
				}

				if (request.onSuccess && request.onSuccess.length) {
					request.onSuccess.map((action) => action(request, afterMiddlewareStack.payload, data))
				}

				/**
				 * @archicoder @since 28.10.24:
				 * In previous version we executed silentMutationReceivers before mutationReceivers process pipeline and
				 * mutators (data updaters) didn't have a possibility to check payloads in payloadComparator to tell us that
				 * reload is needed.
				 * 
				 * So for now we have changed the order of mutationReceivers process pipeline and silentMutationReceiver process pipeline.
				 */

				// process with mutation receivers (mutationReceivers process pipeline)
				if (request.mutationReceivers) {
					request.mutationReceivers.map((receiver) => {
						if (receiver.dataSource) {
							// Payload adapters used to transform/convert mutation payload to mutation receiver's compatible payload.
							// This useful when payloads are not compatible or payload need to be calculated to perform payload comparing.
							const payload = receiver.payloadAdapter ? receiver.payloadAdapter(afterMiddlewareStack.payload) : afterMiddlewareStack.payload;
							
							// Check for reloading necessity
							// Sometimes mutation receivers shouldn't be run on some reasons like when changing temporary data that don't load.
							if ( receiver.checkIsReloadingNeeded && !receiver.checkIsReloadingNeeded(payload) ) return;

							// Update dependent of mutated data payload data receivers
							// mosUpdate method exists in dataSource when it was used previously to load data. We must check mosUpdate before using it.
							// if mosUpdate is not exists in dataSource then dataSource was not used and we dont need update something in it.
							receiver.dataSource.mosUpdate && receiver.dataSource.mosUpdate(payload, receiver.payloadComparator ? receiver.payloadComparator : null);
						}
					});
				}

				// process with cache cleaners (silentMutationReceiver process pipeline).
				// chacheCleaners allows to silently update data: not right now but when it will be requested.
				if (request.silentMutationReceivers) {
					d.log('Remove cache for silentMutationReceivers');
					request.silentMutationReceivers.map((receiver) => cacheRemoveForPayload(receiver, afterMiddlewareStack.payload))
				}

			},
			data => {
				/**
				 * To lines above has not been here, not tested.
				 * Added 27.10.2024 @archicoder
				 */
				
				// Run global answer handlers
				runErrorGlobalHandlers(data, request, beforeMiddlewareStack.payload);
				// Run responseStatusHandler of request
				request.responseStatusHandler && request.responseStatusHandler(data);

				const afterMiddlewareStack = runDataUpdateMiddleware(request, beforeMiddlewareStack.payload, data, false);

				directErrorAction && directErrorAction(data);

				if (errorActions && errorActions.length) {
					errorActions.map((action) => action(request, afterMiddlewareStack.payload, data))
				}
				if (request.onError && request.onError.length) {
					request.onError.map((action) => action(request, afterMiddlewareStack.payload, data))
				}
			}
		);
	}

	return setPayload;
}

function runDataUpdateMiddleware(request, payload, response, isBefore) {
	var stack = {
		before: isBefore,
		request: request,
		response: response,
		address: request.address,
		payload: {...payload},
		next: null,
		index: 0,
		middleware: request.middleware
	}

	if (!request.middleware || !request.middleware.length) return stack;

	stack.next = (stack) => {
		if (stack.middleware[stack.index] !== undefined) {
			var newstack;

			try {
				newstack = stack.middleware[stack.index ++](stack);
			} catch(error) {
				console.error('Error in middlewares', error);
				return stack;
			}

			return newstack;
		} else {
			return stack;
		}
	}

	return stack.next(stack);
}

/**
 * Component that preloads Dataset and can assign dataset instance to context store var to operate with dataset globally
 * @param {Object} request Data request / processor configuration
 * @param {Object} payload Payload filter for data fetching
 */
export const Dataset = ({dataSource, payload, immediatelly, useStore, children}) => {
	const [state, data, setPayload] = useDataset(dataSource, payload, immediatelly ? immediatelly : true);

	let OnDataReady, OnError, OnPending, OnUpdating

	if (useStore) {
		const [store] = useContextStore({
			[useStore]: {
				state: state,
				data: data,
				setPayload: setPayload
			}
		})

		useEffect(() => {
			store[useStore] = {
				state: state,
				data: data,
				setPayload: setPayload
			}
		})
	} else {
		if (helpers.isArray(children)) {
			foreachKey(children, (key, child) => {
				if (child.type == 'onDataReady') OnDataReady = child; else
				if (child.type == 'onError') OnError = child; else
				if (child.type == 'onPending') OnPending = child; else
				if (child.type == 'onUpdating') OnUpdating = child;
			})
		} else {
			if (children.type == 'onDataReady') OnDataReady = children; else
			if (children.type == 'onError') OnError = children; else
			if (children.type == 'onPending') OnPending = children; else
			if (children.type == 'onUpdating') OnUpdating = children;
		}
	}

	if (OnDataReady && state.isFinished) return OnDataReady; else
	if (OnError && state.isError) return OnError; else
	if (OnPending && state.isPending) return OnPending; else
	if (OnUpdating && state.isUpdating) return OnUpdating;

	return null
}

/**
 * Not Hook. Dataset inline loader with all support of datasources.
 */
export const getDataset = (dataSource, payload, onSuccess, onError, onNodata) => {
	const setState = (state) => {
		state == NODATA && onNodata && onNodata()
	}

	FetchRequest(
		dataSource, payload, helpers.getId(), setState, true,
		(data) => onSuccess && onSuccess(data),
		(data) => onError && onError(data)
	);
}

/**
 * Registers globally a handler for data loading events: onSuccess, onError, onProgress
 * Global handlers allows to handle success, errors, progresses events in one place for all datasets are run
 * instead of specify handlers in each dataset.
 * 
 * Handler must receive args: (data, request, payload)
 * 
 * @param {string} handlerType Type of event: onSuccess, onError, onProgress
 * @param {closure} handler Handler function to register as handler
 * @returns null
 */
export const registerGlobalHandlers = (handlerType, handler) => {
	if (handlerType == 'onSuccess') {
		if (globalHandlers.onSuccess.has(handler)) return;
		globalHandlers.onSuccess.add(handler);
	} else
	if (handlerType == 'onError') {
		if (globalHandlers.onError.has(handler)) return;
		globalHandlers.onError.add(handler);
	} else
	if (handlerType == 'onProgress') {
		if (globalHandlers.onProgress.has(handler)) return;
		globalHandlers.onProgress.add(handler);
	}
}

const runGlobalHandlers = (handlerType, data, request, payload) => {
	if (!globalHandlers[handlerType] || !globalHandlers[handlerType].size) return;

	for (const callback of globalHandlers[handlerType]) callback(data, request, payload);
}

const runSuccessGlobalHandlers = (data, request, payload) => runGlobalHandlers('onSuccess', data, request, payload)
const runErrorGlobalHandlers = (data, request, payload) => runGlobalHandlers('onError', data, request, payload)
const runProgressGlobalHandlers = (data, request, payload) => runGlobalHandlers('onProgress', data, request, payload)

export {registerGlobalResponseStatusHandler} from './fetcher';
