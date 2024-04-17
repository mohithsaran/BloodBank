const userModel = require("../models/userModel")
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const authConfig=require('../config/authConfig')



const registerController=async(req,res)=>{
    try{
        const existingUser=await userModel.findOne({email:req.body.email})
        if(existingUser){
            return res.status(400).send({
                message:'User already exists'
            })
        }
        //hashing the password
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(req.body.password,salt)
        req.body.password=hashedPassword
        const user=new userModel(req.body)
        await user.save()
        return res.status(201).send({
            success:true,
            message:'User Registered Successfully',
            user
        })

    }
    catch(err){
        console.log(err)
    res.status(500).json({
        success:false,
        message:'Error in Registering',
    })
    }
}

const loginController = async (req, res) => {
    try {
      const user = await userModel.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "Invalid user. Please signup",
        });
      }
      //compare password
      const comparePassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!comparePassword) {
        return res.status(500).send({
          success: false,
          message: "Invalid Credentials",
        });
      }
      const token = jwt.sign({ userId: user._id }, authConfig.JWT_SECRET, {
        expiresIn: "1d",
      });
      return res.status(200).send({
        success: true,
        message: "Login Successfully",
        token,
        user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error In Login API",
        error,
      });
    }
  };

const currentUser=async(req,res)=>{
    try{
        const user=await userModel.findById(req.body.userId)
        if(!user){
            return res.status(404).send({
                success:false,
                message:'User not found'
            })
        }
        return res.status(200).send({
            success:true,
            message:'User found successfully',
            user
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).send({
            success:false,
            message:'Error in getting current user',
            err
        })

    }
}

module.exports={registerController,loginController,currentUser}