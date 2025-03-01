import { registerDebugger } from "../debug";
import { helpers } from "../helpers";

const d = registerDebugger(true, 'cacheDriver');

class DefaultCacheDriver {
	datasource = null;
	cache = [];

	constructor(datasource) {
		this.datasource = datasource;
	}

	findInCache(payload) {
		return this.cache.find( (item) => {
			if (item.payload === payload || helpers.isEqual(payload, item.payload)) {
				return true;
			}
		})
	}

	get(payload) {
		if (!this.cache.length) return null;
		const cacheItem = this.findInCache(payload);

		d.log('get():', cacheItem, payload);

		return cacheItem === undefined
			?	null
			:	cacheItem.data;
	}

	set(payload, data) {
		const cacheItem = this.findInCache(payload);

		if (cacheItem === undefined) {
			this.cache.push({
				payload: payload,
				data: data
			})
		} else {
			cacheItem.data = data;
		}

		d.log('set():', cacheItem, this.cache);

	}

	diff(payload) {
		const cacheItem = this.findInCache(payload);
		return cacheItem === undefined
			?	payload
			:	null
	}

	remove(payload) {
		const index = this.cache.findIndex( (item) => (item.payload === payload || helpers.isEqual(payload, item.payload)) );

		if (index !== -1) {
			this.cache.splice(index, 1);
		}
	}
}

export const createCacheDriver = (datasource, payloadModel) => {
	if (payloadModel) {
		//
	} else
		return new DefaultCacheDriver(datasource);
}