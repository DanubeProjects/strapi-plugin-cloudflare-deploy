'use strict'

module.exports = {
  getPluginService(name) {
    return strapi
      .plugin('cloudflaredeploy')
      .service(name);
  },
};
