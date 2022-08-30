const {Router} = require('express'),
    errorsService = require('../helpers/services/error.service'),
    router = Router(),
    { v4: uuidv4 } = require('uuid'),
    web3Controller = require('../controllers/web3.controller');

// api/calculate/execute
router.post('/execute',
    async(req, res) =>{
        try{
            const { expression } = req.body;
            let result;
            let type;
            let id;

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
                return res.status(400).json({code: errorsService.EXPRESSION_IS_INVALID});
            }

            if(!result){
                return res.status(400).json({code: errorsService.EXPRESSION_IS_INVALID});
            }

            if(!req.session.operations){
                req.session.operations = [];
            }
            
            id = uuidv4();
            req.session.operations.push({id, type, expression, result});

            return res.status(200).json({result: {id, type, expression, result}});
        }catch(e){
            return res.status(200).json({code: errorsService.UNKNOWN, message: `Error ${e}`})
        }
})

module.exports = router;