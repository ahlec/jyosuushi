module.exports = {
  apps: [
    {
      env: {
        NODE_ENV: "production",
      },
      name: "jyosuushi-server",
      script: "./server/main.js",
    },
  ],
};
