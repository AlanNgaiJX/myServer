const expressJwt = require("express-jwt");
const config = require("../config/index.js");

const jwtAuth = expressJwt({ secret: config.jwtSecret, algorithms: ['HS256'] });

module.exports = exports = {
    jwtAuth,
};
