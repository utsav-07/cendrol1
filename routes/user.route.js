const express = require('express');
const app = express();
const fs = require("fs");
const userExpressRoute = express.Router();
let userSchema = require('../model/user.mdel');
const bcrypt = require("bcrypt")
const saltRounds = 10

const multer = require('multer');

//image upload 
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.filename + "_" + Date.now() + "_" + file.originalname);
    }
});

var upload = multer({
    storage: storage,
}).single("image");


userExpressRoute.route('/').get((req, res) => {
    userSchema.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

userExpressRoute.route('/user/:id').get((req, res) => {
    userSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

userExpressRoute.route('/add-user').post(upload, (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function(err, hash) {
            // store hash in the database
        req.body.password = hash
        });
    var obj = {
        name : req.body.name,
        email : req.body.email,
        password :  req.body.password,
        mobile : req.body.mobile,
        profilePic : req.file.filename
    };
    userSchema.create(obj, (error, data) => {
        if (error) {
            console.log(error);
            return next(error)
        } else {
            res.json(data)
        }
    })
})


userExpressRoute.route('/del-user/:id').delete((req, res) => {
    userSchema.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

userExpressRoute.route('/update-user/:id').put(upload , (req, res) => {
    let  obj = {
        name : req.body.name,
        email : req.body.email,
        password :  req.body.password,
        mobile : req.body.mobile,
        profilePic : req.file.filename
    };
    
    userSchema.findByIdAndUpdate(req.params.id, {
        //whole body is set here
        $set: obj
    }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data);
            console.log('updated successfully')
        }
    })
})

module.exports = userExpressRoute;