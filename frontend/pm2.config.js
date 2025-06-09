module.exports = {
  apps: [
    {
      name: 'frontend',
      script: 'npm',
      args: 'run dev -- --host 0.0.0.0',
      cwd: '/app',
      interpreter: 'none',
      instances: 1,
      autorestart: true,
      env: {
        NODE_ENV: 'dev',
        PATH: '/app/node_modules/.bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin'
      }
    }
  ]
};