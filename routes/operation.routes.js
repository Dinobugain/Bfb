const {Router} = require('express'),
    router = Router(),
    errorsService = require('../helpers/services/error.service');

// api/operations/
router.post('/',
    async(req, res) =>{
        try{

            if(!req.session.operations || req.session.operations.length == 0){
                return res.status(400).json({code: errorsService.OPERATIONS_NOT_FOUND});
            }

            return res.status(200).json({result: true, operations:req.session.operations})
        }catch(e){
            return res.status(400).json({code: errorsService.UNKNOWN, message: `Error ${e}`})
        }
})

module.exports = router