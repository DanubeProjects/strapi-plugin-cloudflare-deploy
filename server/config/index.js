'use strict';

/**
 * instances: [
 *   {
 *      name: "production website",
 *      hook_url: 'https://...'
 *   },
 * ]
 */

module.exports = {
  default: ({env}) => ({instances: []}),
  validator(config) {
    if (!Array.isArray(config.instances)) {
      throw new Error('instances has to be an array');
    }
    for (let instance of config.instances) {
      if (!instance.hasOwnProperty('name') || typeof instance.name !== 'string') {
        throw new Error('instances must have a name string');
      }
      if (!instance.hasOwnProperty('hook_url') || typeof instance.hook_url !== 'string') {
        throw new Error('instances must have a hook_url string');
      }
    }
  },
};
