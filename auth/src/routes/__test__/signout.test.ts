import request from 'supertest'
import { app } from '../../app';

it('clears the cookie after signing out',async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            name: 'test',
            email: 'test@example.com',
            password: 'test123'
        })
        .expect(201);

    const response = await request(app)
        .post('/api/users/signout')
        .send({})
        .expect(200)

});