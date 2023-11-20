import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';


let mongo: any;

jest.mock('../nats-wrapper');


beforeAll(async () => {
    jest.clearAllMocks();
    process.env.JWT_KEY = 'asdfgh';

    mongo = await MongoMemoryServer.create();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri, {
    });
});



beforeEach( async () => {
    jest.clearAllMocks();
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll( async () => {
    await mongo.stop();
    await mongoose.connection.close();
});


