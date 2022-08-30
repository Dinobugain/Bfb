const {Router} = require('express'),
    router = Router();

const path = __dirname + '../views/';

router.get('/', function (req, res) {
    res.sendFile(path + "index.html");
});

module.exports = router