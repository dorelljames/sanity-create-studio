const axios = require("axios");

class GitHub {
  constructor() {
    this.request = axios.create({
      baseURL: "https://api.netlify.com/api/v1/",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.NETLIFY_TOKEN
      }
    });
  }

  setToken(token) {
    this.request.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  newRepo({ owner, name }) {}

  updateContent({ filePath, content }) {}

  addDeployKey({ content }) {}
}

module.exports = GitHub;
