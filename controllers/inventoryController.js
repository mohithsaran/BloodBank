const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");

const createInventoryController=async(req,res)=>{
    try{
        const {email,inventoryType}=req.body
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

const getInventoryController=async(req,res)=>{
    try{
        const inventory=await inventoryModel.find({organisation:req.body.userId})
        return res.status(200).send({
            success:true,
            message:"Inventory fetched successfully",
            inventory
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            success:false,
            message:"Error in getting inventory",
            err
        }
        )
    }
}

module.exports={createInventoryController,getInventoryController}