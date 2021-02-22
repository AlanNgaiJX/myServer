const express = require('express');
const m1 = require('./m1.js');

const router = express.Router();
router.install = function(module){
    module.install(this);
};

router.install(m1);

module.exports = exports = router;