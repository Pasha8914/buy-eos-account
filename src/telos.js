require('dotenv').config()

const SenecaWeb = require('seneca-web')
const Express = require('express')
const Router = Express.Router
const context = new Router()

const app = Express()
  .use(require('body-parser').json())
  .use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  })
  .use(context)
  .listen(process.env.PORT)

const telosEndpoint = 'https://seven.swap.online/telos-endpoint'

const chainId = '6c8aacc339bf1567743eb9c8ab4d933173aa6dca4ae6b6180a849c422f5bb207'

const eosOptions = {
  params: {
    serviceAccount: process.env.SERVICE_ACCOUNT,
    bytesAmount: '10000',
    netAmount: '1.0000',
    cpuAmount: '1.0000'
  },
  config: {
    keyProvider: process.env.SERVICE_PRIVATE_KEY,
    httpEndpoint: telosEndpoint,
    chainId: chainId
  }
}

const seneca = require('seneca')({ debug: { undead: true } })
  .use(SenecaWeb, {
    context: context,
    adapter: require('seneca-web-adapter-express'),
    options: { parseBody: false }
  })
  .use(require('./modules/eos.js'), eosOptions)
  .use(require('./api/freeAPI.js'))
