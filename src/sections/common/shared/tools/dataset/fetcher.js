import { helpers } from "../helpers";
import { registerDebugger } from "../debug";
import { createCacheDriver } from "./cacheDriver";

const d = registerDebugger(false, 'fetcher');

export const IDLE		= 1;
export const PENDING	= 2;
export const FINISHED	= 3;
export const ERROR		= 4;
export const NODATA		= 5;
export const UPDATING	= 6;

const globalResponseHandlers = new Set();

// request pool contains all requests instances that has been given to fetch
// every request after fetch processing will contain payloadPool - the structure for concurrent requests from several components at idle or pending time.
// 2. dependancySubscription - the array of components that requests payloads from request and if data for that payload is changed
// components will receive changed data and rerender
const requestPool = [];

const LOADED = true;
const NOT_LOADED = false;

// get request from pool or add to pool if its not exist
function getRequestFromPool(request) {

	var currentRequest = requestPool.find(element => element === request);
	if (!currentRequest) {
		currentRequest = request;
		requestPool.push(request);
	}

	return currentRequest;
}

function removeSnapshot(request, snapshot) {
	const index = request.payloadPool.indexOf(snapshot);
	if (index !== -1) request.payloadPool.splice(index, 1);
}

function setCurrentState(snapshot, state, data, request) {
	snapshot.state = state;

	Object.keys(snapshot.subscribers).map( (sub) => {
		switch (state) {
			case IDLE:
				snapshot.subscribers[sub].setState(state);
			break;
			case PENDING:
				snapshot.subscribers[sub].setState(state);
			break;
			case UPDATING:
				snapshot.data = data;
				snapshot.subscribers[sub].onSuccess(data);
				snapshot.subscribers[sub].setState(state);
				d.log('read from cache. updating...', sub)
			break;
			case FINISHED:
				snapshot.data = data;
				snapshot.subscribers[sub].onSuccess(data);
				snapshot.subscribers[sub].setState(state);
				d.log('finished', sub)
				unsubscribe(sub, snapshot, request)
			break;
			case ERROR:
				snapshot.subscribers[sub].setState(state);
				snapshot.subscribers[sub].onError(data);
				snapshot.data = data;
				unsubscribe(sub, snapshot, request)
			break;
			case NODATA:
				snapshot.subscribers[sub].setState(NODATA);
				/**
				 * This probably fixes the bug:
				 * When we have loaded empty data (nodata was previously set here) so after that on mosUpdate
				 * dataset will be updated with previous payload (not the same that gives empty data loaded but previous that has data).
				 * So hypothesis was: all success states write received data with onSuccess() method that writes data to cache and also
				 * switches state to success finish of data fetching.
				 * 
				 * Empty data response is not error!
				 */
				snapshot.subscribers[sub].onSuccess(data); // Hipothesis 24.10.24: previous payload bug.
				snapshot.data = null;
				d.log('nodata', sub)
				unsubscribe(sub, snapshot, request)
			break;
			default:
			break;
		}
		
	});
}

// unsubscribe from shapshot concurrent list (local version)
function unsubscribe(id, snapshot, request) {
	if (snapshot.subscribers[id] !== undefined) {
		d.log('unsibscribe concurrent (inner)',id)
		delete snapshot.subscribers[id];
	}

	if (request.cacheDriver && !Object.keys(snapshot.subscribers).length) {
		removeSnapshot(request, snapshot)
		d.log('shapshot removed', request)
	}
}

// unsubscribe from shapshot concurrent list (export version for componentWillUnmount)
export function unsubscribeConcurrent(id, request, payload) {
	d.log('unsubscribe concurrent', id, request.address, requestPool)

	const currentRequest = getRequestFromPool(request);
	if (currentRequest && currentRequest.payloadPool) {
		for (const item of currentRequest.payloadPool) {
			if (helpers.isEqual(payload, item.payload)) {
				if (item.subscribers[id] !== undefined) {
					d.log('unsibscribed', id)
					delete item.subscribers[id];
				}
			}
		}
	}
}

// susbcribe to snapshot concurrent list
function subscribeConcurrent(snapshot, id, setState, onSuccess, onError) {
	d.log('subscribe concurrent (inner)', id, requestPool)
	snapshot.subscribers[id] = {
		setState: setState,
		onSuccess: onSuccess,
		onError: onError,
	}
}

// Check if currentRequest with given payload is already loaded
// actual for components that has been mounted after the request is loaded
export const checkIsLoaded = (request, payload) => {
	// search given request in pool or add if it was not added yet
	const currentRequest = getRequestFromPool(request);

	if (request.cacheDriver) {
		const modifiedPayload = request.cacheDriver.diff(payload);
		
		if (modifiedPayload === null)
			return [LOADED, request.cacheDriver.get(payload), payload];

		return [NOT_LOADED, null, modifiedPayload]
	} else {
		// get payloadPool
		if (currentRequest.payloadPool === undefined) {
			// We have no loaded data if payload pool is empty
			return [NOT_LOADED, null, payload];
		}

		// search in payload pool for given payload and return data from it if it will found
		for (const item of currentRequest.payloadPool) {
			if (helpers.isEqual(payload, item.payload)) {
				if (item.state == LOADED) {
					// Todo: subscribe current component to data reloading/changing
					return [LOADED, item.data, payload];
				} else
					return [NOT_LOADED, null, payload];
			}
		}
	}

	return [NOT_LOADED, null, payload];
}

/**
 * Calls methods for data removing from dataSource (request) cache. It used on silentMutationReceivers to update data silently (when update is needed).
 * @param {object} request dataSource that must process removing data from its cache
 * @param {object} payload Payload to determine which data must be removed from cache
 * @returns null
 */
export const cacheRemoveForPayload = (request, payload) => {
	if (request.cacheDriver) {
		request.cacheDriver.remove && request.cacheDriver.remove(payload);
	} else {
		const currentRequest = getRequestFromPool(request);

		if (currentRequest.payloadPool === undefined) return;

		let index = 0;
		for (const item of currentRequest.payloadPool) {
			if (helpers.isEqual(payload, item.payload)) {
				currentRequest.payloadPool.splice(index, 1);
				return;
			}

			index ++;
		}
	}
}

// Main fetcher
export const fetch = (request, payload, starterId, setState, useCache, onSuccess, onError, onProgress) => {
	// search given request in pool or add if it was not added yet
	const currentRequest = getRequestFromPool(request);

	// get payloadPool or create new
	if (currentRequest.payloadPool === undefined) {
		currentRequest.payloadPool = [];
	}

	// get snapshot
	var payloadSnapshot = null;
	for (const item of currentRequest.payloadPool) {
		if (helpers.isEqual(payload, item.payload)) {
			payloadSnapshot = item;
			break;
		}
	}

	// if payload snapshot has not been found we create new payload snapshot
	if (!payloadSnapshot) {
		payloadSnapshot = {
			payload: payload,		// payload that has been requested. Used to identify snapshot between components in concurrent loading mode.
			refinedPayload: null,	// current payload is refined payload that contains what data is not currently in cache and need to be additionaly loaded
			starterId: starterId,	// What component has started fetching.
			state: IDLE,			// Current initial state of fetching.
			data: null,				// The final loaded data.
			subscribers: {},		// Concurrent subscribers.
			transport: null,
			isCanceled: false,
		}
		currentRequest.payloadPool.push(payloadSnapshot);
	}

	if (currentRequest.cacheDriver === undefined || currentRequest.cacheDriver === true)
		currentRequest.cacheDriver = createCacheDriver(currentRequest);

	// subscribe component to snapshot
	subscribeConcurrent(payloadSnapshot, starterId, setState, onSuccess, onError);

	if (useCache) {
		const [status, data, refinedPayload] = checkIsLoaded(currentRequest, payload);
		if (status === LOADED) {
			if (currentRequest.cacheDriver) {
				d.log('set current state useCache && status LOADED && cacheDriver exists after checkIsLoaded', starterId, 'snapshot.state', payloadSnapshot.state);
				// Когда компонент примонтируется во время апдейта и когда в датасете есть данные (срабатывает кэш),
				// Получается, что он попадает сюда и заканчивает загрузку данных обновления для всех MOS,
				// хотя payloadSnapshot.state = PENDING. Поэтому, если какой-то компонент во время обновления перерисуется или произойдет mount/unmount,
				// Обновление данных прервется!!!!! В этом сука был глюк ЕПТ.

				// Todo: Не надо второй раз запускать метод get, тк checkIsLoaded запускает get и возвращает data
				if (payloadSnapshot.state == PENDING || payloadSnapshot.state == UPDATING) {
					setCurrentState(payloadSnapshot, UPDATING, data, currentRequest);
				} else
					setCurrentState(payloadSnapshot, FINISHED, data, currentRequest);
			} else {
				d.log('set current state useCache && status LOADED after && no cacheDriver checkIsLoaded', starterId, 'snapshot.state', payloadSnapshot.state);
				payloadSnapshot.data = data
				if (payloadSnapshot.state == PENDING || payloadSnapshot.state == UPDATING) {
					setCurrentState(payloadSnapshot, UPDATING, data, currentRequest);
				} else
					setCurrentState(payloadSnapshot, FINISHED, data, currentRequest);
			}

			return;
		}

		payloadSnapshot.refinedPayload = refinedPayload;
	} else {
		payloadSnapshot.refinedPayload = payload;
		if (payloadSnapshot.state != PENDING) payloadSnapshot.state = IDLE;
	}

	

	// process with snapshot state
	// Idle means that nothing was done and nothing now
	if (payloadSnapshot.state == IDLE || payloadSnapshot.state == ERROR) {
		// from idle state we have run pending/fetching data loading
		setCurrentState(payloadSnapshot, PENDING, null, currentRequest);

		// run before middlewares
		const beforeMiddlewareStack = runMiddleware(currentRequest, null, payloadSnapshot, true);

		// check if middlewares returns state with error
		if (beforeMiddlewareStack.state == NODATA || beforeMiddlewareStack.state == 'nodata') {
			setCurrentState(payloadSnapshot, NODATA, null, currentRequest);
			return;
		}

		// Execute fetching
		(new Promise((presolve, preject) => {
			payloadSnapshot.transport = request.fetchDriver(
				(response) => presolve(response),  // run order - 1				
				(response) => preject(response),
				(progressData) => onProgress && onProgress(progressData),
				request.address,
				beforeMiddlewareStack.refinedPayload	//payloadSnapshot.payload
			);
		})).then(
			data => {	// run order - 2
				d.log('fetchSuccess():', JSON.stringify(payloadSnapshot.subscribers));
				
				// Handle response status data
				handleResponseStatus(currentRequest, data);

				// run after middlewares
				const afterMiddlewareStack = runMiddleware(currentRequest, data, payloadSnapshot, false);

				// check if middlewares returns state with error
				if (afterMiddlewareStack.state == NODATA || afterMiddlewareStack.state == 'nodata') {
					setCurrentState(payloadSnapshot, NODATA, null, currentRequest);
					return;
				}

				// processedData contains actual loaded data processed with middlewares.
				// processedData should contain data from currentRequest.cacheDriver if it exists or affteMiddlewareStack.response if cacheDriver is not exists.
				let processedData;

				if (currentRequest.cacheDriver) {
					// If we using custom request's cacheDriver then we use refined payload - the payload that requests data that is not in cache.
					// Here we set new data in cache with refined payload and after that we get data from cache with initial payload.
					// So with that we get all data that were requested.

					// set loaded data to cache with refined payload
					currentRequest.cacheDriver.set(afterMiddlewareStack.refinedPayload, afterMiddlewareStack.response);
					// set prcessedData
					processedData = currentRequest.cacheDriver.get(payload);
					// get final data from cache with requested payload
					setCurrentState(payloadSnapshot, FINISHED, processedData, currentRequest);
				} else {
					// If we not using request's cacheDriver we caching all data by payload. Here we don't use refined payload.

					// store whole data in payloadSnashot
					payloadSnapshot.data = data;
					
					// set processedData from afterMiddlewareStack after processing
					processedData = afterMiddlewareStack.response;
					// get final data from cache with requested payload
					setCurrentState(payloadSnapshot, FINISHED, afterMiddlewareStack.response, currentRequest);
				}

				// Run datasource.onSuccess actions
				// dataSource.onSuccess parms are: {currentRequest/dataSource, payload, extractedData, wholeServerResponseData }
				if (currentRequest.onSuccess && currentRequest.onSuccess?.length) {
					currentRequest.onSuccess.map((action) => action(currentRequest, afterMiddlewareStack.payload, processedData, data))
				}
			},
			data => {
				d.log('fetchError():', `snapshot is previously canceled: ${payloadSnapshot.isCanceled}`);

				if (!payloadSnapshot.isCanceled) {
					// Handle response status data
					handleResponseStatus(currentRequest, data);

					const afterMiddlewareStack = runMiddleware(currentRequest, data, payloadSnapshot, false);
					// set ERROR state
					setCurrentState(payloadSnapshot, ERROR, data, currentRequest);

					// Run datasource.onError actions
					// dataSource.onError parms are: {currentRequest/dataSource, payload, extractedData, wholeServerResponseData }
					if (currentRequest.onError && currentRequest.onError?.length) {
						currentRequest.onError.map((action) => action(currentRequest, afterMiddlewareStack.payload, afterMiddlewareStack.response, data))
					}
				}
			}
		);
	} else
	if (payloadSnapshot.state == PENDING) {
		// Data loading / fetching / pending state
		d.log('pending mode', payloadSnapshot.starterId, starterId);
		setCurrentState(payloadSnapshot, PENDING, null, currentRequest);
	} else
	if (payloadSnapshot.state == FINISHED) {
		// set data loaded state
		d.log('loaded mode', payloadSnapshot.starterId, starterId);
		setCurrentState(payloadSnapshot, FINISHED, payloadSnapshot.data, currentRequest);
	}
}

// run middlewares stack
// middlewares in request has to get stack parameter to himself and working only with stack mutations
// each middlewares has to return stack.next(stack) to call next middlewares or return stack to break next middlewares processing.
// middlewares can mutate stack.payload or stack.response
const runMiddleware = (request, response, snapshot, isBefore) => {
	var stack = {
		before: isBefore,
		request: request,
		response: response,
		snapshot: snapshot,
		payload: {...snapshot.payload},
		refinedPayload: snapshot.refinedPayload,
		next: null,
		index: 0,
		middleware: request.middleware,
		state: null
	}

	if (!request.middleware.length) return stack;

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
 * 
 * @param {object} datasource Datasource object
 * @param {any} data Data received
 */
const handleResponseStatus = (datasource, data) => {
	if (globalResponseHandlers.size) {
		for (const callback of globalResponseHandlers) callback(data, datasource);
	}

	datasource.responseStatusHandler && datasource.responseStatusHandler(data);
}

/**
 * Registers global response status handler
 * @param {closure} handler Handler function to handle response status data. Params that handler will receive is: data, datasource
 */
export const registerGlobalResponseStatusHandler = (handler) => {
	if (!globalResponseHandlers.has(handler)) globalResponseHandlers.add(handler);
}