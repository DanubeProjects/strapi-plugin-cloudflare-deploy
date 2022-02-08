# Strapi plugin Cloudflare Deploy

A Strapi v4 plugin for triggering cloudflare pages deploy.

## Installation

```
npm install @danube-dev/strapi-plugin-cloudflare-deploy
```

Then rebuild your admin panel

```
strapi build
```

Done! You will be able to see Cloudflare deploy in plugins panel.

## Configuration

in config/plugins.js

```
module.exports = ({ env }) => ({
// ...
  cloudflaredeploy: {
    enabled: true,
    config: {
      instances: [
        {
          name: "production website",
          hook_url: 'https://...'
        },
        {
          name: "development website",
          hook_url: 'https://...'
        },
        // ...
      ]
    },
  },
// ...
});

```
