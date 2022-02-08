'use strict';

const axios = require("axios");
const {getPluginService} = require("../utils/functions");

module.exports = {
  getService(name = 'cloudflaredeploy') {
    return getPluginService(name);
  },

  async index(ctx) {
    // Add your own logic here.
    const instances = this.getService().getConfig('instances', []);
    // Send 200 `ok`
    ctx.send({
      instances: (instances || []).map((instance, id) => ({id, name: instance.name}))
    });
  },

  async publish(ctx) {
    const {id} = ctx.request.body;
    const instances = this.getService().getConfig('instances', []);

    if (instances && instances[id] && instances[id].hook_url) {
      await axios.post(instances[id].hook_url)
    }

    ctx.send({
      message: 'ok'
    });
  }
};
