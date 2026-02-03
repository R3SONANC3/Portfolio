module.exports = {
    apps: {
      name: 'Website',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      port :  80 ,
      watch: false,
      max_memory_restart: '1G',
    }
  }
