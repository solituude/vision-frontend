var Id = 0;

export const helpers = {
	getId: () => 'i' + (Id++),

	removeSlash: function(path) {
		if (path.startsWith('/')) 
			return path.substr(1, path.length);
		else
			return path;
	},

	addSlash: function(path) {
		if (path.startsWith('/')) 
			return path;
		else
			return '/'+path;
	},

	isFunction: function(obj) {
		return (typeof obj === "function");
	},

	isArrowFn: f => typeof f === 'function' && (/^([^{=]+|\(.*\)\s*)?=>/).test(f.toString().replace(/\s/, '')),

	isMobile: function() {
		return (function(a){if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) return true; else return false;})(navigator.userAgent||navigator.vendor||window.opera);
	},

	hasJsonStructure: function (str) {
		if (typeof str !== 'string') return false;
		try {
			const result = JSON.parse(str);
			const type = Object.prototype.toString.call(result);
			return type === '[object Object]' 
				|| type === '[object Array]';
		} catch (err) {
			return false;
		}
	},

	isObject: (o) => (typeof o == 'object' && !Array.isArray(o) && o !== null),

	isArray: (a) => (typeof a == 'object' && Array.isArray(a)),

	isInt: (a) => {
		if (isNaN(a)) return false;
		var x = parseInt(a);
		return (x | 0) === x;
	},

	count: (o) => {
		if (helpers.isArray(o)) return o.length;
		if (helpers.isObject(o)) return Object.keys(o).length;
		return 0;
	},

	first: (o) => {
		if (helpers.isArray(o)) return o.length ? o[0] : null;
		if (helpers.isObject(o)) {
			const keys = Object.keys(o);
			return keys.length ? o[keys[0]] : null;
		}
		return 0;
	},

	in_array: (value, array) => {
		if (value === undefined || value === null || array === undefined || array === null) return false;

		if (helpers.isArray(array)) {
			if (!array?.length) return false;
			return array.indexOf(value) !== -1 || array.indexOf(parseInt(value)) !== -1  || array.indexOf(value.toString()) !== -1
		}
		if (helpers.isObject(array)) {
			if (!Object.keys(array).length) return false;
			for(let i in array)
				if (array[i] == value) return true;
		}

		return false;
	},

	array_pos: (value, array) => {
		if (value === undefined || value === null || array === undefined || array === null) return false;
		return array.indexOf(value) !== -1
			? array.indexOf(value)
			: ( 
				array.indexOf(parseInt(value)) !== -1
					? array.indexOf(parseInt(value))
					: (
						array.indexOf(value.toString()) !== -1
							? array.indexOf(value.toString())
							: -1
					)
			)
	},

	key_exists: (key, obj) => helpers.isObject(obj) && Object.keys(obj).indexOf(key) !== -1,

	array_merge: (array1, array2) => {
		if ( array2 == undefined ) return array1;

		array1 = array1.concat(array2);
		array1 = array1.filter((i,p) => array1.indexOf(i) === p);
		return array1;
	},

	array_diff: (array1, array2) => {
		let diffed = [];

		var basicArray, secondArray;
		if (array1.length > array2.length) {
			basicArray = array1;
			secondArray = array2;
		} else {
			basicArray = array2;
			secondArray = array1;
		}

		basicArray.map( (item) => {
			if (!helpers.in_array(item, secondArray)) diffed.push(item);
		});
		
		return diffed;
	},

	/**
	 * Returns array of items that absent in reference array and exists in base array
	 * @param {array} base Array to check
	 * @param {array} reference Refernce array
	 * @returns 
	 */
	array_refDiff: (base, reference) => {
		let diffed = [];
		base.map( (item) => {
			if (!helpers.in_array(item, reference)) diffed.push(item);
		});
		
		return diffed;
	},

	obj_merge: (obj1, obj2) => {
		Object.keys(obj2).map((key) => {
			obj1[key] = obj2[key];
		});

		return obj1;
	},

	toCamelCase: (str) => {
		// Lower cases the string
		return str.toLowerCase()
			// Replaces any - or _ characters with a space 
			.replace( /[-_]+/g, ' ')
			// Removes any non alphanumeric characters 
			.replace( /[^\w\s]/g, '')
			// Uppercases the first character in each group immediately following a space 
			// (delimited by spaces) 
			.replace( / (.)/g, function($1) { return $1.toUpperCase(); })
			// Removes spaces 
			.replace( / /g, '' );
	},

	isEqual: (object1, object2) => {
		if (helpers.isObject(object1) && helpers.isObject(object2)) {
			const keys1 = Object.keys(object1);
			const keys2 = Object.keys(object2);

			if (keys1.length !== keys2.length) {
				return false;
			}

			for (const key of keys1) {
				const val1 = object1[key];
				const val2 = object2[key];
				
				const areObjects = (helpers.isObject(val1) && helpers.isObject(val2)) || (helpers.isArray(val1) && helpers.isArray(val2));

				if (areObjects && !helpers.isEqual(val1, val2) || !areObjects && val1 != val2) {
					return false;
				}
			}

			return true;
		} else
		if (helpers.isArray(object1) && helpers.isArray(object2)) {
			if (object1.length !== object2.length) {
				return false;
			}

			for (let i in object1) {
				const val1 = object1[i];
				const val2 = object2[i];

				const areObjects = (helpers.isObject(val1) && helpers.isObject(val2)) || (helpers.isArray(val1) && helpers.isArray(val2));

				if (areObjects && !helpers.isEqual(val1, val2) || !areObjects && val1 != val2) {
					return false;
				}
			}

			return true;
		} else
		if (object1 == object2) {
			return true;
		}

		return false;
	},

	sleep: (delay) => {
		var start = new Date().getTime();
		while (new Date().getTime() < start + delay);
	}
}

/**
 * Wrapper to Object.keys(...).map or Array.map
 * @param {object|array} obj Object or array to traverse in
 * @param {callback} callback function to execute on every item of obj
 * @returns object or array
 */
export const foreach = (obj, callback) => {
	if (helpers.isArray(obj)) return obj.map(callback); else
	if (helpers.isObject(obj)) return Object.keys(obj).map(callback); else
	callback(obj);
}

/**
 * Wrapper to Object.keys(...).map or Array.map. 
 * @param {object|array} obj Object or array to traversse in
 * @param {callback} callback function to execute on every item of obj. Callback receives key and obj[key] parms.
 * @returns object or array
 */
export const foreachKey = (obj, callback) => {
	if (helpers.isArray(obj)) {
		var i = 0;
		return obj.map((item) => callback(i++, item));
	} else
	if (helpers.isObject(obj)) {
		var i = 0;
		return Object.keys(obj).map((key) => callback(key, obj[key], i++));
	} else
		callback(null, obj);
}
/**
 * Determines type of given data and returns:
 * 1. if given data is not array returns data as is.
 * 2. if given data is array returns every item.
 * @param {object|array|scalar} children incoming data of type object or array or scalar
 * @param {callback} callback function will be called on every item found in array
 * @returns null
 */
export const foreachItemOfArray = (data, callback) => {
	if (data === undefined || data === null) return;

	if (helpers.isArray(data)) {
		data.map( (item) => callback(item) )
		return
	}

	callback(data)
}
