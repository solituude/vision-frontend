import { foreachKey, helpers } from "../helpers";
import { registerDebugger } from "../debug";

const d = registerDebugger(false, 'GC');

const collection = {};

const isCollected = (request, payload, collection) => {
	for (let id in collection) {
		if (request === collection[id].request) {
			if (payload === collection[id].payload || helpers.isEqual(payload, collection[id].payload)) return true;
		}
	}

	return false;
}

export const registerGarbage = (request, id) => {
	if (request.gc === false ) return;

	const gcTime = request.gc || 100;

	var isAlone = true;
	var payloads = [];

	if (!request.mos || !request.mos.length) return;
	if (!request?.cacheDriver?.remove) return;

	request.mos.map((mosItem) => {
		foreachKey(mosItem.subscribers, (subId) => {
			if (subId == id) payloads.push(mosItem.payload); else isAlone = false;
		})

		// We collect garbage only if only one mos item (compenent or subscriber) used data.
		// If we have more than one mos subscriber of data we will not collect it.
		// The current mos if it is not alone will be removed from mos. So all mos items will be removed one by one till
		// only one subscriber is remained. After that garbage for given payload will be removed with last mos item.
		// So no needs to collect items that not currently alone.
		if (isAlone && payloads.length) {
			payloads.map((payload) => {
				if (!isCollected(request, payload, collection)) {
					// collection item id
					const itemId = helpers.getId();

					// create collection item
					collection[itemId] = {
						request: request,
						payload: payload,
						remover: setInterval(() => {
							// remove data from cache
							request.cacheDriver.remove(payload);
							// clear and remove interval
							clearInterval(collection[itemId].remover);
							// remove from collection
							delete collection[itemId];

							d.log('removed:', itemId, 'collection:', collection);
						}, gcTime)
					};
				}
				
			})
		}
	})

	d.log('collected:', collection);
}

export const unregisterGarbage = (request, payload) => {
	if (!request?.cacheDriver?.remove) return;
	if (request.gc === false ) return;
	
	for (let id in collection) {
		if (collection[id].request === request) {
			if (payload === collection[id].payload || helpers.isEqual(payload, collection[id].payload)) {
				clearInterval(collection[id].remover);
				delete collection[id];
				d.log('uncollected:', id, 'collection:', collection);
				return;
			}
		}
	}
}