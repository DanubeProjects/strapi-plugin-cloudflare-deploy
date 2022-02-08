'use strict';

module.exports = ({ strapi }) => ({
  getConfig(prop, defaultValue) {
    let queryProp = prop;
    if (prop && Array.isArray(prop)) {
      queryProp = prop.join('.');
    }
    return strapi.config.get(`plugin.cloudflaredeploy${ queryProp ? '.' + queryProp : ''}`) || defaultValue;
  },
});
