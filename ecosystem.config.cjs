module.exports = {
  apps: [{
    name: "salon-app",
    script: "./backend/server.js",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
      PORT: 5000
    }
  }]
}
