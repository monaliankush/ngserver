const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const mongodb = require('mongodb');
const app = express();// creating rest object where app is rest object
app.use(cors());//communication between port
app.use(bodyparser.json() ); // communication between client and server
//create reference variable for connect to mongodb
const ashokIT = mongodb.MongoClient;

// create post request
app.post('/login',(req, resp)=>{
ashokIT.connect('mongodb+srv://admin:admin@angular.ogtlw.mongodb.net/angular9pm?retryWrites=true&w=majority',(err,connection)=>{
    if(err) throw err;
    else{
        const db = connection.db('angular9pm');
        db.collection('login_details')
        .find({'email':req.body.email,'password':req.body.password})
        .toArray((err, array)=>{
            if(err) throw err;
            else{
                if(array.length > 0){
                    resp.send({'login': 'success'});
                }else{
                    resp.send({'login':'fail'});
                }
            }
        })
    }
})
})
app.listen('8080',()=>{
    console.log('port listing 8080')
})