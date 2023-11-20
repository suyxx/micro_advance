import request from 'supertest';
import { app } from '../../app'; // Adjust the path accordingly
import { User } from '../../models/user'; // Adjust the path accordingly
import jwt from 'jsonwebtoken';

describe('POST /api/users/signin', () => {
  
    it('sets a cookie after successful signin', async () => {
        // Create a user for testing
        const userData = {
          email: 'test@test.com',
          password: 'test123',
          name: 'Test User',
        };
      
        // Sign up the user
        await request(app)
          .post('/api/users/signup')
          .send(userData)
          .expect(201);
      
        // Sign in the user
        const signinResponse = await request(app)
          .post('/api/users/signin')
          .send({
            email: userData.email,
            password: userData.password,
          })
          .expect(200);
            
        // Check if a cookie is set in the response
        const cookies = signinResponse.get('Set-Cookie');
        expect(cookies).toBeDefined();
    });
  it('returns a 400 on user not registered', async () => {
    // Make a request with an email that is not registered
    const response = await request(app)
      .post('/api/users/signin')
      .send({
        email: 'nonexistent@test.com',
        password: 'test123',
      })
      .expect(400);

    expect(response.body.errors).toBeDefined();
    expect(response.body.errors[0].message).toEqual('User not registered');
  });

  it('returns a 400 on invalid credentials', async () => {
    // Create a user for testing
    const userData = {
      email: 'test@test.com',
      password: 'test123',
      name: 'Test User',
    };

    const newUser = new User(userData);
    await newUser.save();

    // Make a request with an incorrect password
    const response = await request(app)
      .post('/api/users/signin')
      .send({
        email: userData.email,
        password: 'incorrectpassword',
      })
      .expect(400);

    expect(response.body.errors).toBeDefined();
    expect(response.body.errors[0].message).toEqual('Invalid Credentials');
  });

  it('returns a 400 on missing email', async () => {
    // Make a request without providing an email
    const response = await request(app)
      .post('/api/users/signin')
      .send({
        // Missing email
        password: 'test123',
      })
      .expect(400);

    expect(response.body.errors).toBeDefined();
    expect(response.body.errors[0].message).toEqual('Email must be valid');
  });

  it('returns a 400 on missing password', async () => {
    // Make a request without providing a password
    const response = await request(app)
      .post('/api/users/signin')
      .send({
        email: 'test@test.com',
        // Missing password
      })
      .expect(400);

    expect(response.body.errors).toBeDefined();
    expect(response.body.errors[0].message).toEqual('You must supply a password');
  });

  // Add more test cases as needed

});
