## News-Portal

A web application that shows a tile-based news portal.

Each tile provides real-time teaser information of a different category and get its data from a different API.

The tiles are: News, Weather, Finance, Sports, Subscribe.

## Motivation

The motivation behind this project was to build a web application that connects to third-party APIs and displaying the data with beautiful UI using the modern web frameworks that are used today for client and server side - **ReactJS & Node.js**.

## Screenshots

![image](screenshots/HomePage.png?raw=true "Home Page")

![image](screenshots/WeeklyWeather.png?raw=true "Weekly Weather")

![image](screenshots/NewsModal.png?raw=true "News Modal")

## Tech/framework used

**Client-side:**

- [ReactJS](https://reactjs.org/)

**Server-side:**

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Socket.io](https://socket.io/)

## Features

- **News updates** - the news updates tile displays the latest news break update teaser. Clicking on the tile will show more info about the article in the modal window with a direct URL to the full article. This tile updates every 10 minutes.

- **Weather** - this tile displays the current weather conditions in my city. Clicking on the tile will display a weekly based forecast. This tile updates every 4 hours.

- **Finance** - this tile displays the Nasdaq stock market line chart using the [chart.js](https://www.chartjs.org/) library. This tile updates every 5 minutes.

- **Sports** - this tile displays the current score of five live football matches. This tile updates every 10 second.

- **Subscribe** - users can subscribe to news portal using their emails. The subscription is limited per browser session.

## Code Example

Connecting to third-party API and emitting the JSON result to the client using socket

```
//news.js

const axios = require("axios");
const { newsKey } = require('../config');

/** function that gets the JSON result for news from News API and emit it to client */
const getNewsApiAndEmit = async socket => {
    try {
        // getting the data from News API
        const response = await axios.get("https://newsapi.org/v2/top-headlines", {
            params: {
                country: 'us',
                pageSize: 1,
                apiKey: newsKey
            }
        });
        // emitting a new message. It will be consumed by the client
        socket.emit("News", response.data.articles[0]);
    }
    catch (error) {
        console.error(`News Error: ${error.code}`);
    }
};
```

## Installation

**Running in development environment**

    git, npm and node softwares should be installed
    before moving on

- git clone https://github.com/dimakol/News-Portal.git
- cd News-Portal/
- npm install - installing the node modules at server folder.
- cd news-portal/
- npm install - installing the node modules at client folder.
- cd .. - returning to the root folder of the project.
- creating .env file like .env.example file in the root of the folder and setting your API keys instead of the asterisks (\*\*\*)
- npm run dev

## API Reference

- https://newsapi.org/docs - News API
- https://darksky.net/dev/docs - Dark Sky API
- https://www.alphavantage.co/documentation/ - Alpha Vantage API
- https://www.football-data.org/documentation/quickstart - Football-Data API

## Deployed to Render

https://my-news-portal.onrender.com

## Credits

- https://www.valentinog.com/blog/socket-react/ - Socket.IO, React and Node.js: Going Real-Time with WebSockets.
- https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786 - Node.js Everywhere with Environment Variables!
- https://github.com/chimurai/http-proxy-middleware - http-proxy-middleware
- https://www.chartjs.org/docs/latest/ - Chart.js
- https://www.freecodecamp.org/news/how-to-deploy-a-react-app-with-an-express-server-on-heroku-32244fe5a250/ - How to deploy a React app with an Express server on Heroku
- https://render.com/docs/migrate-from-heroku - Migrate from Heroku to Render

## License

MIT © Dima Kolyas
