const {setVolume} = require('./TV/controllers/RemoteController');

const Koa = require('koa');
const app = new Koa();
const fetch = require('node-fetch');

require('dotenv').config({path: __dirname + '/.env'})
setVolume(8);


// app.use(async ctx => {
//   ctx.body = 'Hello World';
// });

// app.listen(3000);