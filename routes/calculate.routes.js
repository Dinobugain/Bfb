const {Router} = require('express'),
    errorsService = require('../helpers/services/error.service'),
    router = Router(),
    { v4: uuidv4 } = require('uuid'),
    calculateController = require('../controllers/routes/calculate.controller');

// api/calculate/execute
router.post('/execute',
  async(req, res) =>{
    try{
      const { expression } = req.body;

      const {status, result, code, type} = await calculateController.executeInternal(expression);
      
      if(!status){
        return res.status(400).json({code: code});
      }

      const id = uuidv4();
      req.session.operations.push({id, type, expression, result});
      
      return res.status(200).json({result: {id, type, expression, result}});
    }catch(e){
      return res.status(200).json({code: errorsService.UNKNOWN, message: `Error ${e}`})
    }
  }
)

module.exports = router;