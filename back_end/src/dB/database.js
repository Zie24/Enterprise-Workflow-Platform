const mongooose =require("mongoose")
const connectDB =async()=>{
    try{
        await mongooose.connect(process.env.MONGO_URI)// URI=> Uniform Resource Identifier
        console.log("dB Is Connected")
    }catch(e){
console.log("dB connection Faild")
console.error(e.message)
process.exit(1)
    }
}
module.exports=connectDB