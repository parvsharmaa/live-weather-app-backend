const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');
const cors = require('cors');
const weatherRoutes = require('./src/routes/weatherRoutes');
const errorHandler = require('./src/middlewares/errorHandler');
const { OpenWeatherApiKey } = require('./src/services/weatherService');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use('/api', weatherRoutes);
app.use(errorHandler);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('sendWeatherParams', ({ latitude, longitude }) => {
    console.log('Received weather parameters:', latitude, longitude);
    setInterval(async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${OpenWeatherApiKey}`
        );
        const updatedWeatherData = response.data;
        socket.emit('weatherUpdate', updatedWeatherData);
      } catch (error) {
        console.error('Error fetching updated weather data:', error);
      }
    }, 30000);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
