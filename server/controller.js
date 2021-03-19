const { OWM_KEY } = process.env,
  axios = require("axios");

module.exports = {
  getWeather: (req, res) => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?id=5600685&units=imperial&appid=${OWM_KEY}`
      )
      .then((weather) => {
        res.status(200).send(weather.data);
      })
      .catch((err) => {
        console.log("weather error", err);
        res.status(500).send(err);
      });
  },
  getQuote: (req, res) => {
    const quotes = [],
      quote = {};
    let id = 1;
    axios
      .get("https://quotesondesign.com/wp-json/wp/v2/posts")
      .then((quote) => {
        quotes.push(quote.data);
        quotes[0].forEach((e) => {
          e.id = id;
          id++;
        });
        const rand = Math.ceil(Math.random() * quotes[0].length),
          randQuote = quotes[0].find((e) => e.id === rand);

        res.status(200).send(randQuote);
      })
      .catch((err) => {
        console.log("quote error", err);
        res.status(500).send(err);
      });
  },
  getImage: (req, res) => {
    axios
      .get("http://www.splashbase.co/api/v1/images/random")
      .then((img) => {
        res.status(200).send(img.data);
      })
      .catch((err) => {
        console.log("image error", err);
        res.status(500).send(err);
      });
  },
};
