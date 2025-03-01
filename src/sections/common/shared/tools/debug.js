const DEBUG = true;

var counter = 0;
const colors = ['red', 'green', 'blue', 'chocolate', 'coral']

export const registerDebugger = function(gState, name) {

	const debug = {}
  
	if (gState && DEBUG) {
		for (let m in console)
			if (typeof console[m] == 'function')
				debug[m] = console[m].bind(window.console, '%c'+name + ": ", 'color:' + colors[counter % colors.length])
	} else {
		for (let m in console)
			if (typeof console[m] == 'function')
				debug[m] = function() {}
	}

	counter ++;

	debug.isActive = gState;

	return debug
}

export const log = (...args) => {
	DEBUG && console['log'](...args);
}

