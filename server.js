//server.js

// import external libraries
const express = require("express");
const socketIo = require("socket.io");
// import internal libraries
const { nodeEnv, port } = require("./config");
const userRoute = require("./routes/userRoute");
const news = require("./core/news");
const weather = require("./core/weather");
const finance = require("./core/finance");
const sports = require("./core/sports");

// create new express app and save it as "app"
const app = express();
// defining the port that the server will use (read from config file)
const PORT = port || 5000;
// defining the environment that the server will use (read from config file)
const NODE_ENV = nodeEnv || "development";

// the possible routes for the app
app.use(userRoute);

// make the server listen to requests
const server = app.listen(PORT, () => {
  // production mode
  if (NODE_ENV === "production") {
    console.log(`Server listening on port: ${PORT}`);
  }
  // development mode
  else {
    console.log(`Server running at: http://localhost:${PORT}/`);
  }
});

// create the listening object from socket.io
const io = socketIo(server);
// handle connection (listening for "connection" event from the browser)
io.on("connection", (socket) => {
  console.log("New client connected: ", socket.id);

  // initial presentation of news data
  news.getNewsFromApiAndEmit(socket);
  // news data update every 10 minutes
  news.handleUpdate(socket);
  // initial presentation of weather data
  weather.getWeatherFromApiAndEmit(socket);
  // weather data update every 4 hours
  weather.handleUpdate(socket);
  // initial presentation of finance chart
  finance.getFinanceFromApiAndEmit(socket);
  // finance chart update every 5 minutes
  finance.handleUpdate(socket);
  // initial presentation of sports data
  sports.getSportsFromApiAndEmit(socket);
  // sports data update every 10 seconds
  sports.handleUpdate(socket);

  // handle disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected: ", socket.id);
  });
});
