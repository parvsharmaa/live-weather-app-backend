const axios = require('axios');
const { OpenWeatherApiKey } = require('../services/weatherService');

exports.fetchWeatherData = async (req, res, next) => {
  const { latitude, longitude } = req.body;
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${OpenWeatherApiKey}`
    );
    res.json({ data: response.data });
  } catch (error) {
    console.error('Error fetching weather data:', error);
    next(error);
  }
};
