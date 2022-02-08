module.exports = [
  {
    method: "GET",
    path: "/",
    handler: "cloudflaredeploy.index",
    config: {
      policies: []
    }
  },
  {
    method: "POST",
    path: "/publish",
    handler: "cloudflaredeploy.publish",
    config: {
      policies: []
    }
  }
];
