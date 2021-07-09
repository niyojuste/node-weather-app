const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static Directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather',
		name: 'Anonymous',
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About me',
		name: 'Anonymous',
	})
})

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		name: 'Anonymous',
		message: 'Example',
	})
})

app.get('/help/*', (req, res) => {
	res.render('error', {
		title: '404',
		name: 'Anonymous',
		errorMessage: 'Help article not found',
	})
})

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'You must provide an address',
		})
	}

	const address = req.query.address
	// console.log(address)

	geocode(address, (error, { latitude, longitude, location } = {}) => {
		if (error) {
			return res.send({
				error,
			})
		}

		forecast(longitude, latitude, (error, forecastData) => {
			if (error) {
				return res.send({
					error,
				})
			}
			res.send({
				address,
				location,
				forecast: forecastData,
			})
		})
	})
})

app.get('*', (req, res) => {
	res.render('error', {
		title: '404',
		name: 'Anonymous',
		errorMessage: 'Page not found',
	})
})

app.listen('3000', () => {
	console.log('Server up and running on port 3000')
})
