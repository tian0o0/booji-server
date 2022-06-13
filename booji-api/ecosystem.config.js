module.exports = {
  apps: [
    {
      name: "booji",
      // script: "./dist/main.js",
      script: "./index.js",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
