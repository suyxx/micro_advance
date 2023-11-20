import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
    console.log("Starting up...");
    if(!process.env.JWT_KEY){
        throw new Error('Error: JWT');
    }
    if(!process.env.MONGO_URI){
        throw new Error('Error: Mongo URI must be defined');
    }
    try{
    await mongoose.connect(process.env.MONGO_URI, {
    }).then(() => {
        app.listen(3000, () => {
            console.log('listening on new port 3000!!!!!');
        });
    });
    console.log('connection established')
}catch(err){
    console.error(err)
}
};

start();



