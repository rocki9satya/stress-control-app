module.exports = {
  apps: [
    {
      name: 'backend',
      script: 'server.js',
      cwd: '/app',
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};