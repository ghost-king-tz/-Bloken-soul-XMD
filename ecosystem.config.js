module.exports = {
  apps: [
    {
      name: "𝐒𝐏𝐄𝐂𝐓𝐑𝐀-𝐕𝟏",
      script: "npm",
      args: "run pm2",
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ]
};
