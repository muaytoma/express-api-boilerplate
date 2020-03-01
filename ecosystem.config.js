module.exports = {
  apps : [{
    name: "app",
    script: "./src/index.js",
    watch: true,
    instances: "1",
    exec_interpreter: "node_modules/.bin/babel-node",
    exec_mode : "fork",
    ignore_watch : ["node_modules"],
    watch_options: {
      "followSymlinks": false
    },
    env: {
      NODE_ENV: "development",
      PORT: 3001
    }
  }]
}
