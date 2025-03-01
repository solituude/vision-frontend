import { registerDebugger } from "../debug";
import { foreachKey, helpers } from "../helpers";
import { HTTP_MULTIPLE_CHOISES, CONNECTION_ERROR, CONNECTION_ABORTED } from "./HTTP";
import Cookies from "universal-cookie";

const HEADER_CONTENT_TYPE				= 'Content-Type';
const APPLICATION_FORM_URL_ENCODED		= 'application/x-www-form-urlencoded';
const APPLICATION_JSON					= 'application/json'
const MULTIPART_FORM_DATA				= 'multipart/form-data'
const TEXT_PLAIN						= 'text/plain'

const d = registerDebugger(false, 'XMLRequest');
const cookies = new Cookies();

var count = 0

function getCurrentCharset() {
	return document.characterSet;
}

const serializePayload = (obj, prefix) => {
	var str = [], p;

	for (p in obj) {
		if (obj.hasOwnProperty(p)) {
			var key = prefix ? prefix + "[" + p + "]" : p;
			var value = obj[p];

			str.push((value !== null && typeof value === "object")
				?	serializePayload(value, key)
				:	encodeURIComponent(key) + "=" + encodeURIComponent(value));
		}
	}

	return str.join("&");
}
  
// Formats query from payload object
// sets Content-type header
// Todo: type of formatted query may depend on type of serialization format: serialized or JSON encoded
function formatQueryObject(method, request, payload) {
	if (payload instanceof FormData) {
		request.setRequestHeader(HEADER_CONTENT_TYPE, `${MULTIPART_FORM_DATA}; charset=${getCurrentCharset()}`);
		return payload;
	} else
	if (helpers.isObject(payload)) {
		if (!helpers.count(payload)) {
			return '';
		}

		request.setRequestHeader(HEADER_CONTENT_TYPE, `${APPLICATION_FORM_URL_ENCODED}; charset=${getCurrentCharset()}`);
		return serializePayload(payload);
	} else
	if (helpers.isArray(payload) && payload?.length) {
		request.setRequestHeader(HEADER_CONTENT_TYPE, `${APPLICATION_FORM_URL_ENCODED}; charset=${getCurrentCharset()}`);
		return serializePayload({array: payload});
	}

	request.setRequestHeader(HEADER_CONTENT_TYPE, `${TEXT_PLAIN}; charset=${getCurrentCharset()}`);
	request.setRequestHeader('Authorization', `Bearer ${cookies.get('token')}`)

	return payload ? encodeURIComponent(payload) : null;
}

function parseResponse(request) {
	const contentType = request.getResponseHeader(HEADER_CONTENT_TYPE);
	const ctItems = contentType.split(';');

	let response = request.response;

	foreachKey(ctItems, (key, item) => {
		item = item.trim().toLowerCase();

		if ( item == APPLICATION_JSON ) {
			try {
				response = JSON.parse(response);
			} catch(e) {
				console.error('parseResponse(): Error parsing incoming data', request.response);
			}
		}
	})

	return response;
}

function getRejectObject(request) {
	return {
		status: {
			code: request.status,
			message: request.statusText
		},
		messages: [],
		body: null
	}
}

function sendRqst( method, address, payload, good, bad, progress ) {
	// increase requests count
	count ++;
	d.log('isOnLine: ', navigator.onLine);
	if (!navigator.onLine) {
		bad(getRejectObject({
			status: CONNECTION_ERROR,
			statusText: 'Connection error'
		}));

		return;
	}

	// create request
	const request = new XMLHttpRequest();

	(new Promise( (resolve, reject) => {
		request.open(method, address, true);

		request.cancelable = true;
	
		// onLoad event define
		request.onload = (e) => {
			d.log('onLoad', e);

			if ( request.status >= HTTP_MULTIPLE_CHOISES ) {
				reject(getRejectObject(request));
				return;
			}

			const response = parseResponse(request);

			if (helpers.isObject(response)) {
				if (response?.status && response.status?.code) {
					if ( response.status.code < HTTP_MULTIPLE_CHOISES ) {
						resolve(response);
					} else {
						reject(response);
					}
				}

				// No status code??
				reject(getRejectObject({
					status: CONNECTION_ERROR,
					statusText: 'Connection error on load'
				}));
			} else {
				resolve(response);
			}
		}

		// onAbort event define
		request.onabort = () => {
			reject(getRejectObject({
				status: CONNECTION_ABORTED,
				statusText: 'Connection aborted'
			}));
		};

		// onProgress event define
		request.onprogress = (e) => {
			progress && progress({
				type:			'receive',
				hasLength:		e.lengthComputable,
				loadedBytes:	e.loaded,
				totalBytes:		e.total
			})
		}

		request.upload.onprogress = (e) => {
			progress && progress({
				type:			'upload',
				hasLength:		e.lengthComputable,
				loadedBytes:	e.loaded,
				totalBytes:		e.total
			})
		}

		// onError event define
		request.onerror = (e) => {
			reject(getRejectObject({
				status: CONNECTION_ERROR,
				statusText: 'Connection error'
			}));
		}

		const query = formatQueryObject(method, request, payload)
	
		request.send( query );
	}) ).then(
		data => good(data),
		data => bad(data)
	);

	// Return fake xhr, because if we return currently created XMLHTTPRequest it will return always the same
	// object and methods returned will work only on last XMLHTTPRequest object. For example, abort() method
	// will cancel the last request but not the request we expect to cancel.
	return {
		abort: () => request.abort(),
	};
}

const withMethod = (method, good, bad, progress, url, payload) => {
	const xhr = sendRqst(method, url, payload,
		(response) => good(response),
		(response) => bad(response),
		progress
	);

	return {
		abort:		xhr.abort,
		progress:	xhr.progress,
		onSuccess:	good,
		onError:	bad
	}
}

export const XMLRequest = {
	get: (good, bad, progress, url, payload) => withMethod('GET', good, bad, progress, url, payload),
	post: (good, bad, progress, url, payload) => withMethod('POST', good, bad, progress, url, payload),
	head: (good, bad, progress, url, payload) => withMethod('HEAD', good, bad, progress, url, payload),
	put: (good, bad, progress, url, payload) => withMethod('PUT', good, bad, progress, url, payload),
	delete: (good, bad, progress, url, payload) => withMethod('DELETE', good, bad, progress, url, payload),
	connect: (good, bad, progress, url, payload) => withMethod('CONNECT', good, bad, progress, url, payload),
	options: (good, bad, progress, url, payload) => withMethod('OPTIONS', good, bad, progress, url, payload),
	trace: (good, bad, progress, url, payload) => withMethod('TRACE', good, bad, progress, url, payload),
	patch: (good, bad, progress, url, payload) => withMethod('PATCH', good, bad, progress, url, payload)
}
