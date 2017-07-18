import App from './App.html'
import serviceMaker from './service'

const app = new App({
	target: document.querySelector('main'),
	data: { name: 'world' }
})

const service = serviceMaker(window, document)

app.on('open', () => service.call('open', 'My New Title'))
app.on('close', () => service.call('close'))

service.provide('open modal', () => {
	console.log('open')
	app.set({
		message: 'yolo',
		visible: true
	})
})

service.provide('close modal', () => {
	console.log('close')
	app.set({
		message: undefined,
		visible: false
	})
})
