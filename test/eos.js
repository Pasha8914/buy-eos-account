const expect = require('chai').expect

const httpEndpoint = 'https://jungle.eosio.cr'
const chainId = '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca'


const options = {
  params: {
    serviceAccount: 'sevenflash12',
    bytesAmount: '10000',
    netAmount: '100.0000',
    cpuAmount: '100.0000'
  },
  config: {
    keyProvider: '',
    httpEndpoint: httpEndpoint,
    chainId: chainId,
  }
}

const init = (done) => {
  return require('seneca')()
    .test(done)
    .use(require('../src/modules/eos.js'), options)
}

const accountName = 'sevenflashss'
const publicKey = 'EOS6J2765xNSyjNi26QHPrj851FKYxuy88jE37ZWaCeLuQmtv9Lwn'

describe('eos microservice', function() {
  this.timeout(42000)

  it('should create an account', (done) => {
    const seneca = init(done)

    seneca.act({ role: 'eos', cmd: 'createAccount' }, { accountName, publicKey }, (err, result) => {
      expect(result.transaction_id.length).to.be.above(0)
      done()
    })
  })
})
