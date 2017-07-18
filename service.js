import mannish from 'mannish'

export default function(win, doc) {
	const mediator = mannish()
	let isOpen = false

	mediator.provide('open', title => {
		// add to the history stack so that the back button works
		// but we just add the same exact state that we're already in
		win.history.pushState({}, title, win.location.toString())
		isOpen = true
		mediator.call('open modal')
	})

	mediator.provide('close', () => {
		win.history.back() // this will trigger the `onpopstate`
	})

	win.onpopstate = event => {
		if (isOpen) {
			isOpen = false
			mediator.call('close modal')
		}
	}

	return mediator
}
