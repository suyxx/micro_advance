import request from 'supertest';
import { app } from '../app';

export const signin = async () => {
    const email = 'test@test.com';
    const password = 'test123';
    const name = 'test';

    const response = await request(app)
        .post('/api/users/signup')
        .send({
            name: name,
            email: email,
            password: password
        })
        .expect(201);

    const cookie = response.get('Set-Cookie');

    return cookie;
};
