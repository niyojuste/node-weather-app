const request = require('request')

const forecast = (longitude, latitude, callback) => {
	const url =
		'http://api.weatherstack.com/current?access_key=9747b0c1511e9d01b726b1eb60d60fe9&query=' +
		latitude +
		',' +
		longitude

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('No network available', undefined)
		} else if (body.error) {
			callback('Please provide valid coordinates')
		} else {
			const data = body.current
			callback(
				undefined,
					'It is currently ' +
					data.temperature +
					' degrees outside. It feels like ' +
					data.feelslike +
					' degrees outside. The humidity is ' +
					data.humidity + '%.'
			)
		}
	})
}

module.exports = forecast
