const express = require('express');
const cors = require('cors');
const app = express();

const whitelist = ['http://localhost:3000','http://10.41.182.166:5501','http://localhost:3001','http://localhost:5501','http://10.41.179.91:5501'];
var corsOptionsDelegate = (req, callback) => {
    var corsOptions;
    console.log(req.header('Origin'));
    if(whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true };
    }
    else {
        corsOptions = { origin: false };
    }
    callback(null, corsOptions);
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);