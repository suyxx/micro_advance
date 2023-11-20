import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';


export const signin =  (userId?: string) => {

    const email = 'test@test.com';
    const password = 'test123';
    const name = 'test';
    if(!userId){
      userId = new mongoose.Types.ObjectId().toHexString();
    }
    // Build a JWT payload.  { id, email }
  const payload = {
    id: userId,
    email: 'test@test.com',
    name: 'test'
  }

  // Create the JWT!
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session Object. { jwt: MY_JWT }
  const session = { jwt: token };

  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  // return a string thats the cookie with the encoded data
  return [`session=${base64}`];
};
