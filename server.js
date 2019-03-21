const express = require('express');
const postRouter = require('./routes/post-router')
const userRouter = require('./routes/user-router')

const server = express();
const parser = express.json();
server.use(parser);


server.use('/api/posts', postRouter)
server.use('/api/users', userRouter)

module.exports = server;