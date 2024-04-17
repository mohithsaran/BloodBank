const express=require('express')
const {registerController,loginController,currentUser}=require('../controllers/authController')

const router=express.Router()

//routes
router.post('/register',registerController)
router.post('/login',loginController)
//get current user
router.get('/currentuser',authMiddleware,currentUser)






module.exports=router