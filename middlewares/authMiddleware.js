const jwt=require('jsonwebtoken')
const authConfig=require('../config/authConfig')

module.exports=async(req,res,next)=>{
    try {
        const token = req.headers["authorization"].split(" ")[1];
        jwt.verify(token, authConfig.JWT_SECRET, (err, decode) => {
          if (err) {
            return res.status(401).send({
              success: false,
              message: "Auth Failed",
            });
          } else {
            req.body.userId = decode.userId;
            next();
          }
        });
      } catch (error) {
        console.log(error);
        return res.status(401).send({
          success: false,
          error,
          message: "Auth Failed",
        });
      }
    };