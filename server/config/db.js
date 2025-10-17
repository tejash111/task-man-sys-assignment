import mongoose from "mongoose";

const connectToDb=async()=>{
    try {
        const connection = mongoose.connect(process.env.DB_URL)
        console.log("db connected");
        
    } catch (error) {
        console.error("error connecting to db : ",error);
        
    }
}

export default connectToDb;