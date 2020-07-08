const config =require('config');
const jwt= require('jsonwebtoken');
const { User } = require('../models/user');

module.exports =function(req, res, next) {
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access denied. No token provided.');

    try {
        const decorded =jwt.verify(token, config.get('jwtSecretKey'));
        req.user = decorded;
        next();

    }
    catch(ex) {
        res.status(400).send('Invalid token..');
    }
}