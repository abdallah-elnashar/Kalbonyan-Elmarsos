const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;
// define express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handlebars engine
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "weather",
    name: "abdallah elnashar",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "abdallah elnashar",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "Help",
    title: "Help ",
    name: "abdallah elnashar",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "you have to provide an adress",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );

  //   res.send({
  //     forecast: "It is snowing",
  //     location: "Philadelphia",
  //     address: req.query.address,
  //   });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "abdallah elnashar",
    errorMsg: "page not found",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
