const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express()
const port = 3001
const  RegisterModel = require('./register');
const saltRounds = 10;

mongoose.connect('mongodb://localhost/logindb',function(err,res){
 if(err){
     console.log('-=-=-=-=err===-==',err);
 }else{
     console.log('----- db connected sucessfully');
 }
})
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())



app.post('/api/register', (req, res) => {
   let name=req.body.name;
   let email=req.body.email;
   let password=req.body.password;
   let re_password=req.body.re_password
   
   if (!name) {
    res.send({ status: 0, msg: 'Name is required' })
} else {
    if (name.length < 3) {
        res.send({ status: 0, msg: 'name length atleast 3 characters' })
    }
}   
if (!email) {
    res.send({ status: 0, msg: 'Email is Required' })
}  else{
    if(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)){
    }else{
        res.send({ status: 0, msg: 'Invaild Email' })
    }
}
if (!password) {
    res.send({ status: 0, msg: 'Password is Required' })
}
 if (password != re_password) {
    res.send({ status: 0, msg: 'Password Does Not Match' })
} 
   if(name) {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.password, salt);
    var newRegister = new RegisterModel(
        {
            name:name,
            email:email,
            password:hash,
           
        }
    );
    newRegister.save(function(err,data)
    {
        if(err){
            res.send(err);
        }else{
            res.send({status: 1,id:data._id});
        }
    });}
})


app.post('/api/login', (req, res) => {
    let username = req.body.username;
    let userpwd = req.body.userpwd;
    RegisterModel.findOne({ email:username }, function (err, data) {
        if (err) {
            res.send(err);
        } else {
            if (data == null) {
                res.send({ status: 0, msg: 'invalid email' })
            } else {
              
                let hashedPwd = data.password;
                let resultPwd = bcrypt.compareSync(userpwd, hashedPwd);
                if (resultPwd) {
                    res.send({ status: 1, id: data._id });
                } else {
                    res.send({ status: 0, msg: 'invalid password' })
                }
            }
        }
    });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})