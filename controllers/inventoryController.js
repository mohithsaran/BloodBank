const inventoryModel = require("../models/inventoryModel");

const createInventoryController=async(req,res)=>{
    try{
        const {email}=req.body
        const user=await userModel.findOne({email})

        if(!user){
             throw new Error("User not found");
        }
        if(inventoryType==='in' && user.role!=='donor'){
             throw new Error("User is not a donor");
    }
        if(inventoryType==='out' && user.role!=='hospital'){
             throw new Error("User is not a hospital");

            }
            //save record
            const inventory=new inventoryModel(req.body)
            await inventory.save()
            return res.status(200).send({
                success:true,
                message:"New Blood record created successfully",
                inventory
            })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            success:false,
            message:"Error in creating inventory",
            err
        }
        )
    }

}

module.exports={createInventoryController}