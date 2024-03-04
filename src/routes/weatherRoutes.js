const express = require('express');
const router = express.Router();
const { fetchWeatherData } = require('../controllers/weatherController');

router.post('/weather', fetchWeatherData);

module.exports = router;
