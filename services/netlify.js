const axios = require("axios");

class Netlify {
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

  createDeployKey() {
    return this.request.post("/deploy_keys");
  }

  newSite({
    name,
    repo_path, // owner/repo: `webriq/example-company-website-gatsby-sanity-combo`
    deploy_key_id,
    provider = "github",
    branch = "master",
    dir = "public",
    cmd = "npm run build"
  }) {
    return new Promise((resolve, reject) => {
      if (!deploy_key_id) {
        reject({ error: true, message: "Deploy key id required!" });
      }

      if (!repo_path) {
        reject({
          error: true,
          message: "Repo path required! E.g: webriq/reponame"
        });
      }

      return this.request
        .post("/sites", {
          name,
          repo: {
            provider,
            repo: repo_path,
            branch,
            dir,
            cmd,
            deploy_key_id
          }
        })
        .then(response => resolve(response))
        .catch(err => reject(err));
    });
  }

  // {
  //     site_id: netlify_site_id,
  //     url: webhook_url,
  //     event: 'deploy_created',
  //     ...req.body,
  //   }
  newWebhook({ type = "url", siteId, event, webhookUrl }) {
    return new Promise((resolve, reject) => {
      if (!siteId || !webhookUrl) {
        return reject({
          error: true,
          message: `"siteId" and "webhookUrl" are required!`
        });
      }

      const acceptedEvents = ["deploy_created", "deploy_failed"];
      if (acceptedEvents.includes(event)) {
        reject({
          error: true,
          message: `"event" parameter can only be from following: ${acceptedEvents.join(
            ","
          )}`
        });
      }

      return this.request
        .post("/hooks", {
          site_id: siteId,
          type,
          event
        })
        .resolve(response => resolve(response))
        .catch(err => reject(err));
    });
  }
}

module.exports = Netlify;
