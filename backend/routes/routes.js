const getRegistered =require('../controllers/registration');
const getLogin = require('../controllers/registration')
const express = require('express')

const router = express.Router()

router.post('/registration', getRegistered.Registered);
router.post('/login', getLogin.Login)
router.post('/addpost', getRegistered.AddPostData)
router.get('/addpost', getRegistered.getPost)



router.post('/login/update/:id', getLogin.UpdateLogin)
router.post('/registration/update/:id', getRegistered.UpdateRegistration)
router.post('/login/delete/:id', getLogin.DeleteLogin)
router.post('/registration/delete/:id', getRegistered.DeleteRegistration)
router.post('/login/forgetPassword', getLogin.ForgetPassword)
router.post('/login/forgetPassword/otpverification', getLogin.OtpVerification)
router.post('/login/forgetPassword/otpverification/updatePassword', getLogin.UpdatePassword)
router.post('/registration/EmailVerification', getRegistered.EmailVerification);


module.exports = router
