module.exports = {
  apps: [
    {
      name: 'backend',
      script: 'server.js',
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'frontend',
      script: 'npm',
      args: 'start',
      cwd: './frontend',
      interpreter: 'none',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
}

