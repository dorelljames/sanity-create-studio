const axios = require("axios");

class Sanity {
  constructor() {
    this.request = axios.create({
      baseURL: "https://api.sanity.io/v1",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.APP_TOKEN
      }
    });
  }

  setToken(token) {
    this.request.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  newProject({ name }) {
    this.request.defaults.baseURL = "https://api.sanity.io/v1";

    return this.request.post("/projects", {
      displayName: name
    });
  }

  newDataset({ projectId, datasetName = `production`, aclMode = `public` }) {
    this.request.defaults.baseURL = `https://${projectId}.api.sanity.io/v1`;

    return this.request.put(`/datasets/${datasetName}`, {
      aclMode
    });
  }

  deployGraphQL({ projectId, jsonSchema, datasetName = `production ` }) {
    this.request.defaults.baseURL = `https://${projectId}.api.sanity.io/v1`;

    return this.request.put(`/apis/graphql/${datasetName}/default`, {
      jsonSchema
    });
  }

  addCORSUrl({ projectId }) {}
}

module.exports = Sanity;
