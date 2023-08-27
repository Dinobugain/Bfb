const errorsService = require('../../helpers/services/error.service'),
  web3Controller = require('../web3.controller'),
  BaseRouterController = require('../base/base.router.controller');


class CalculateController extends BaseRouterController{
  constructor(){
    super();
  }

  async executeInternal(expression) {
    let result;
    let type;

    if(expression.includes('+')){
      result = await web3Controller.execute(expression, '+');
      type='add';
    }else if(expression.includes('-')){
      result = await web3Controller.execute(expression, '-');
      type='sub';
    }else if(expression.includes('/')){
      result = await web3Controller.execute(expression, '/');
      type='mul';
    }else if(expression.includes('*')){
      result = await web3Controller.execute(expression, '*');
      type='div';
    }else{
      return {status: false, code: errorsService.EXPRESSION_IS_INVALID};
    }

    if(!result){
      return {status: false, code: errorsService.EXPRESSION_IS_INVALID};
    }
    
    return {status: true, type, result};
  }
}

module.exports = new CalculateController();