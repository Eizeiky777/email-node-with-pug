/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const http = require('http');
const app = require('./app');

const { env } = process;
const svc = env.SVC_NAME || 'Meteor';
const host = env.HOST || 'localhost';
const port = Number(env.PORT) || 3333;

const server = http.createServer(app);
const conParam = { timeout: 30000 };

server.listen(port, () => console.log('Server Running Well', port));
