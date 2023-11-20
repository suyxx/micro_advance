import request from 'supertest';
import { app } from '../../app'

it('returns a 201 on successful signup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            name: 'test',
            email: 'test@test.com',
            password: 'test123'
        })
        .expect(201);
});

it('returns a 400 with a invalid email', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            name: 'test',
            email: 'testtest.com',
            password: 'test123'
        })
        .expect(400);
});

it('returns a 400 with a invalid password', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            name: 'test',
            email: 'test@test.com',
            password: 'tes'
        })
        .expect(400);
});

it('returns a 400 with missing email , password or name', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
        })
        .expect(400);

    await request(app)
        .post('/api/users/signup')
        .send({
            name: 'test',
        })
        .expect(400);

    await request(app)
        .post('/api/users/signup')
        .send({
            password: 'test',
        })
        .expect(400);
});

it('it disallows duplicate emails', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            name: 'test',
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);

        await request(app)
        .post('/api/users/signup')
        .send({
            name: 'test',
            email: 'test@test.com',
            password: 'password'
        })
        .expect(400);
});

it('sets a cookie after succssful sighin', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            name: 'test',
            email: 'test@test.com',
            password: 'test123'
        })
        .expect(201)

    expect(response.get('Set-Cookie')).toBeDefined();
})