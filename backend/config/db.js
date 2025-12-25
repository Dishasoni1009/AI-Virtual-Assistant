import mongoose from "mongoose"
const connectDb=async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("database connected successfully")
    } catch (error) {
        console.log("error in connecting to database")

    }
}
export default connectDb