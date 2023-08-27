const config = require('config'),
    abi = require('../../helpers/contracts/calculate.contract.json'),
    Web3 = require("web3");

class BaseWeb3Controller{
  constructor(){
    this.web3 = new Web3(new Web3.providers.HttpProvider(config.get('ethNetwork')));
    this.myContract = new this.web3.eth.Contract(abi, config.get('contractAddress'),
      {
        from: config.get('defaultFrom'), // default from address
        gasPrice: config.get('defaultGas') // default gas price in wei, 20 gwei in this case
      }
    );
  }
}

module.exports = BaseWeb3Controller;