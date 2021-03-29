module.exports = {
  apps: [
    {
       name: 'entertainme - Client',
       script: 'cd client/entertainme&&npm install&&npm start',
    },
    {
      name: 'entertainme - Orchestrator',
      script: 'cd server/orchestrator && npm install && nodemon app.js',
    },
    {
      name: 'entertainme - Service Movies',
      script: 'cd server/services/movies && npm install && nodemon app.js',
    },
    {
      name: 'entertainme - Service TV Series',
      script: 'cd server/services/series && npm install && nodemon app.js',
    },
  ],
};