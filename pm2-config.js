module.exports = {
  apps: [
    {
      name: 'backend',
      script: 'server.js',
      cwd: './backend',
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
      args: 'run dev -- --host 0.0.0.0',
      cwd: './frontend',
      interpreter: 'none',
      instances: 1,
      autorestart: true,
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};


