/**
 * stack context
 */

import { useEffect } from "react"

const stack = []

function push(data) {
	stack.push(data)
}

function get() {
	const data = stack[stack.length - 1] ?? undefined
	return data
}

function remove() {
	stack.pop()
}

export const useCreateStackContext = (object) => {
	useEffect(() => {
		push(object)

		return remove
	}, [])

	return get
}

export const useStackContext = () => {
	return get
}