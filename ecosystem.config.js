module.exports = {
  apps : [
    {
      name      : 'ocr-app',
      script    : 'app.js',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production : {
        NODE_ENV: 'production'
      }
    }
  ],
  deploy : {
    production : {
      user: 'wojtek',
      host: process.env.EC2_INSTANCE_IP,
      ref: 'origin/master',
      repo: 'git@github.com:wojciechAdaszynski/ocr-selection-app.git',
      path: '/opt/ocr-app',
      'post-deploy' : 'NODE_ENV=development npm install && NODE_ENV=production npm run build'
    }
  }
};
