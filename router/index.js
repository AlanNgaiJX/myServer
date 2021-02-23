const express = require('express');
const regist = require('./regist.js');
const login = require('./login.js');

const router = express.Router();
router.install = function(module){
    module.install(this);
};

router.install(regist);
router.install(login);

module.exports = exports = router;