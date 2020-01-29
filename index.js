const serverless = require("serverless-http");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const axios = require("axios");

app.use(bodyParser.json({ strict: false }));

const Sanity = require("./services/sanity");
const sanityService = new Sanity();

app.post("/", function(req, res) {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: `Name is required!` });
  }

  return sanityService
    .newProject({ name })
    .then(function(response) {
      res.status(201).json(response.data);
    })
    .catch(function(error) {
      res.status(500).json(error);
    });
});

module.exports.handler = serverless(app);
