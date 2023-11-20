import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from './nats-wrapper';
import { OrderCreatedListener } from "./events/listeners/order-created-listener";
import { OrderCancelledListener } from "./events/listeners/order-cancelled-listener";


const start = async () => {
    if(!process.env.JWT_KEY){
        throw new Error('Error: JWT');
    }
    if(!process.env.MONGO_URI){
        throw new Error('Error: Mongo URI must be defined');
    }

    if(!process.env.NATS_CLIENT_ID){
        throw new Error('NATS CLIENT ID must be defined');
    }

    if(!process.env.NATS_URL){
        throw new Error('NATS URL must be defined');
    }

    if(!process.env.NATS_CLUSTER_ID){
        throw new Error('NATS Cluster ID must be defined');
    }
    try{
    await natsWrapper.connect(
        process.env.NATS_CLUSTER_ID,
        process.env.NATS_CLIENT_ID,
        process.env.NATS_URL);
    natsWrapper.client.on('close', () => {
        console.log('NATS connection closed')
        process.exit();
    });

    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    new OrderCancelledListener(natsWrapper.client).listen();
    new OrderCreatedListener(natsWrapper.client).listen();

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



