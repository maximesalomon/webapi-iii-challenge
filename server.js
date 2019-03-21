const express = require('express');
const path = require('path');
const postRouter = require('./routes/post-router')
const userRouter = require('./routes/user-router')

const pathToBuildFolder = path.join(__dirname, 'build');

const server = express();
const parser = express.json();
server.use(parser);
server.use(express.static(pathToBuildFolder));

server.get('/', (req, res) => {
  res.send(`<h1>Maxime Salomon - Lambda Blog API</h1>`);
});

server.use('/api/posts', postRouter)
server.use('/api/users', userRouter)

module.exports = server;