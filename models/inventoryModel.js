const mongoose=require('mongoose')

const inventorySchema=new mongoose.Schema({
    inventoryType:{
        type:String,
        required:[true,'inventoryType is required'],
        enum:['in','out']
    },
    bloodGroup:{
        type:String,
        required:[true,'bloodGroup is required'],
        enum:['A+','A-','B+','B-','O+','O-','AB+','AB-']
    },
    quantity:{
        type:Number,
        required:[true,'quantity is required']
    },
    organisation:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'organisations',
        required:[true,'organisation is required']
    },
    hospital:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:function(){
            return this.inventoryType==='out'
        }
    },
    donor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:function(){
            return this.inventoryType==='in'
        }
    }
},{timestamps:true})

module.exports=mongoose.model('inventory',inventorySchema)