const express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    session = require('express-session'),
    cors = require('cors');

const allowList = ['http://localhost:8080'];

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ extended: true }))
app.use(express.static(__dirname + '/views/'));

app.use(session({
    secret: 'secret$%^134',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, 
        httpOnly: false, 
        maxAge: 1000*60*10 
    }
}))

app.use(
    cors(
        {
            origin:function (req, callback) {
                let corsOptions;
                if(allowList.includes(req)){
                    corsOptions = { origin: true }
                }else{
                    corsOptions = { origin: true }//TODO
                }

                callback(null, corsOptions) // callback expects two parameters: error and options
              }, 
            credentials: true,
            exposedHeaders: ["set-cookie"]
        }
    )
);

app.use('/api/calculate', require('./routes/calculate.routes'));
app.use('/api/operations', require('./routes/operation.routes'));
app.use('/', require('./routes/client.routes'));

module.exports = server;