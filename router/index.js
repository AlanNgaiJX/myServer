const express = require('express');
const regist = require('./regist.js');

const router = express.Router();
router.install = function(module){
    module.install(this);
};

router.install(regist);

module.exports = exports = router;