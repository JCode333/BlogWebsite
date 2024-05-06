import mongoose from "mongoose"


const connectDB = async() => {

    try{
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect(process.env.MMONGODB_URI); //Connect to a MongoDB database
        console.log(`Database Connected: ${conn.connection.host}`) //Verify that the connection is successfull and post to the console on server startup
    }catch (error) {
        console.log(error)
    }
}

export default connectDB; //Exports the connectDB function as the default export of the module