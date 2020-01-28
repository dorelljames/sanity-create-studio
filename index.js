const serverless = require("serverless-http");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const axios = require("axios");

app.use(bodyParser.json({ strict: false }));

function createNewProject({ APP_TOKEN, req, res }) {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ name: "Name is required!" });
  }

  return axios({
    url: "https://api.sanity.io/v1/projects",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + APP_TOKEN
    },
    data: {
      displayName: name
    }
  })
    .then(function(response) {
      res.status(201).json(response.data);
    })
    .catch(function(error) {
      res.status(500).json(error);
    });
}

app.post("/", function(req, res) {
  const { APP_TOKEN } = process.env;
  console.log("APP_TOKEN", APP_TOKEN);

  createNewProject({ req, res, APP_TOKEN });
});

module.exports.handler = serverless(app);
