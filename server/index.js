require("dotenv").config();
const express = require("express"),
  ctrl = require("./controller"),
  { SERVER_PORT } = process.env,
  app = express();

app.use(express.json());

// endpoints
app.get("/api/weather", ctrl.getWeather);
app.get("/api/quote", ctrl.getQuote);
app.get("/api/image", ctrl.getImage);

app.listen(SERVER_PORT, () =>
  console.log(`Server is running on port ${SERVER_PORT}`)
);