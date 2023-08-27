const BaseWeb3Controller = require('./base/base.web3.controller');

class Web3Controller extends BaseWeb3Controller{
  constructor(){
    super();
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