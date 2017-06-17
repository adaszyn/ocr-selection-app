module.exports = {
  apps : [
    // First application
    {
      name      : 'ocr-app',
      // script    : 'app.js',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production : {
        NODE_ENV: 'production'
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : 'wojtek',
      host : '52.213.91.165',
      ref  : 'origin/master',
      repo : 'git@github.com:wojciechAdaszynski/ocr-selection-app.git',
      path : '/home/wojtek/ocr-app',
      'post-deploy' : 'npm install && npm build && pm2 reload ecosystem.config.js --env production'
    }
  }
};
