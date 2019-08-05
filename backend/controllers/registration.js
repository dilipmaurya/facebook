//const services = require('../service/services');

const express =  require('express')
const flash = require('connect-flash');
const session = require('express-session')
const cookieParser = require('cookie-parser')
const jwt  = require('jsonwebtoken')
const app = express()
const  passport = require('passport')

app.use(cookieParser())
app.use(session({
    secret:'secret123',
    saveUninitialized: true,
    resave: true
}))
app.use(flash())


const Registration = require('../models/registration')
const Post = require('../models/AddPost')

const login = require('../models/login')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')

const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key: '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'

    }
}))

// exports.getAddProduct = (req, res, next) => {
//   res.render('admin/edit-product', {
//     pageTitle: 'Add Product',
//     path: '/admin/add-product',
//     editing: false
//   });
// };

  exports.Registered = (req, res, next) => {
     
    const otp = Math.floor(1000 + Math.random() * 9000);
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const email = req.body.email
    const password = req.body.password
    const phonenumber = req.body.phonenumber
    const dob = req.body.dob

   Registration.findOne({
    where: { email : email }
   })
   .then(userDocs =>{

    if(userDocs){
       
        return res.send("user already exist");
    }
   
    return bcrypt.hash(password, 12)

    .then(hashedPassword =>{

    const user = new Registration({
        firstname:firstname,
        lastname:lastname,
        email:email,
        password:hashedPassword,
        phonenumber:phonenumber,
        dob:dob,
        otp:otp
        })
        return user.save()
      })

      .then(result=>{

        res.send("successfull")
        return transporter.sendMail({
            to:email,
            from: 'shop@node-complete.com',
            subject: 'Email Verification',
            html: otp + '<h1> Enter the above otp for verfication</h1>'
        })
     })
      .catch(err =>{
        console.log(err)
      })
})

  .catch(err =>{
    console.log(err)
   })
    
    
    
};


var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
opts.issuer = 'accounts.examplesoft.com';
opts.audience = 'yoursite.net';
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));


exports.Login = (req, res, next)=>{

    
    const email = req.body.email
    const password = req.body.password
let loadUser;
Registration.findOne({

    where: {email : email}

}).then(user =>{
    if(!user){
        return res.send("user doesn't exist")
    }

    else{

    bcrypt.compare(password, user.password)
    .then(doMatch=>{

            if(doMatch){
         const token = jwt.sign(
        {
          email: user.email,
          userId: user.id
        },
        'somesupersecretsecret',
        { expiresIn: '1h' }
         );
        
      res.status(200).json({ token: token, userId: user.id, data: "Ok"});
      

       
            }

          return  res.send("Incorrect email or password");
        })
    .catch(err=>{
        console.log(err);
    })
}

})
    

    

}

 exports.UpdateLogin = (req, res, next)=>{

const values = { email: req.body.email};
const selector = { 
  where: { id: req.params.id }
};
 login.update(values, selector)

.then(function(rowsUpdated) {
   res.json(rowsUpdated)
 })
 .catch(next)

}


exports.UpdateRegistration = (req, res, next)=>{

const values = { firstname: req.body.firstname, lastname: req.body.lastname,
email:req.body.email, phonenumber:req.body.phonenumber, dob: req.body.dob};
const selector = { 
  where: { id: req.params.id }
};

  Registration.update(values, selector)
 .then(function(rowsUpdated) {
   res.json(rowsUpdated)
 })
 .catch(next)
}


exports.DeleteLogin = (req, res , next)=>{
    //const id = req.body.id;
    login.destroy({
        where:{id : req.params.id}
    })
    .then(result =>{
        console.log("Deleted");
    })

    .catch(err =>{
        console.log(err);
    })
    res.send("Deleted")
}


exports.DeleteRegistration = (req, res, next)=>{
    Registration.destroy({
        where :{id : req.params.id}
    })
    .then(result =>{
        console.log("Deleted");
    })
    .catch(err  =>{
        console.log(err)
    })
    send.send("Deleted")
}


exports.ForgetPassword = (req, res, next)=>{

    const email = req.body.email
 const token = Math.floor(1000 + Math.random() * 9000);

    Registration.findOne({
        where: {email:email}
    })
    .then(user =>{
        if(!user){
            return res.send("No account with this Email exist")
        }
        user.Token = token
        user.TokenExp = Date.now() + 36000;
        return user.save();
       
    })
    .then(result =>{
        
        transporter.sendMail({
            to:req.body.email,
            from: 'shop@node-complete.com',
            subject: 'Password reset',
            html: token + '<h1> Enter above token for password reset</h1>'
        })
        res.send('Ok')
    })
    .catch(err =>{
        console.log(err)
    })
}

exports.OtpVerification = (req, res, next) =>{
    const email = req.body.email
    const token = req.body.otp
    Registration.findOne({
        where : {email : email}
    })
    .then(user =>{
        if(!user){
            return res.send("No user with this Email exist")
        }
        else{

            if(user.Token === token){
                return res.send("OTP matched continue!!")
            }
            else{
                return res.send("Ok")
            }
        }
    })
    .then(result =>{
        console.log(result)
    })
    .catch(err =>{
        console.log(err)
    })
}


exports.UpdatePassword = (req, res, next) =>{
    const email = req.body.email
    const password = req.body.password

    Registration.findOne({
        where : {email : email}
    })
    .then(user =>{
        if(!user){
            return res.send('No user with this Email exist')
        }
        else {

    return bcrypt.hash(password, 12)

    .then(hashedPassword =>{

        user.password = hashedPassword;
        return user.save()
      })

    .then(result =>{
        return res.send('Ok')
    })
    .catch(err =>{
        console.log(err)
    })

        }
    })
    .catch(err =>{
        console.log(err)
    })
    
}

exports.EmailVerification = (req, res, next) =>{
    const email = req.body.email
    const otp = req.body.otp
    Registration.findOne({
        where : {email : email}
    })
    .then(user =>{
        if(!user){
            return res.send('No user with this Email exist')
        }
        else{
            if(user.otp === otp){

                user.Status = true
                res.send('Ok')
                return user.save()
            }
            else {
                return res.send("Please Enter correct OTP")
            }
        }

    })
    
    .catch(err =>{
        console.log(err)
    })
}


exports.AddPostData = (req, res, next)=>{

    const title = req.body.title;
    const content = req.body.content;
    const imageUrl = req.body.imageUrl;
    const like = req.body.like

    Post.create({
        title:title,
        content:content,
        imageUrl:imageUrl,
        like:like
    }).then( result =>{

        res.send("successfull")
    })
    .catch(err =>{
        console.log(err)
    })
}


exports.getPost = (req, res, next)=>{

    Post.findAll()
    .then(posts =>{
     res.send({data:posts})
    })
    .catch(err =>{
        console.log(err)
    })

}