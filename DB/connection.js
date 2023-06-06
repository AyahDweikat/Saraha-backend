import mongoose from "mongoose";
const connectDB = async()=>{
    return await mongoose.connect(process.env.DB_LOCAL)
    .then(()=>{
        console.log("DB Connected");
    })
    .catch((error)=>{
        console.log(`DB Connection Error ${error}`);
    })
}
export default connectDB;
