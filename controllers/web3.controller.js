const config = require('config'),
    abi = require('../helpers/contracts/calculate.contract.json'),
    Web3 = require("web3");

class Web3Controller{
    constructor(){
        this.web3 = new Web3(new Web3.providers.HttpProvider(config.get('ethNetwork')));
        this.myContract = new this.web3.eth.Contract(abi, config.get('contractAddress'),
            {
                from: config.get('defaultFrom'), // default from address
                gasPrice: config.get('defaultGas') // default gas price in wei, 20 gwei in this case
            }
        );
    }

    async add(first, second){
        try{
            let operation = await this.myContract.methods.add(first, second).call();

            return operation;
        }catch(e){
            throw new Error(`ERROR(add): ${e}`);
        }
    }

    async sub(first, second){
        try{
            let operation = await this.myContract.methods.sub(first, second).call();

            return operation;
        }catch(e){
            throw new Error(`ERROR(sub): ${e}`);
        }
    }

    async mul(first, second){
        try{
            let operation = await this.myContract.methods.mul(first, second).call();

            return operation;
        }catch(e){
            throw new Error(`ERROR(mul): ${e}`);
        }
    }

    async div(first, second){
        try{
            if(second <= 0){
                return false;
            }

            let operation = await this.myContract.methods.div(first, second).call();

            return operation;
        }catch(e){
            throw new Error(`ERROR(DIV): ${e}`);
        }
    }

    async execute(str, symbol){
        try{
            let [first, second] = str.split(symbol);
            
            if(!second || second.trim() == '' || !first || first.trim() == ''){
                return false;
            }else{
                let result;
                first = parseInt(first.trim());
                second = parseInt(second.trim());
                
                switch(symbol){
                    case '+':
                        result = await this.add(first, second);
                        break;
                    case '-':
                        result = await this.sub(first, second);
                        break;
                    case '*':
                        result = await this.mul(first, second);
                        break;
                    case '/':
                        result = await this.div(first, second);
                        break;
                }
                
                return result;
            }
        }catch(e){
            throw new Error(`ERROR(execute): ${e}`);
        }
    }
}

module.exports = new Web3Controller();