import request from 'supertest';
import { app } from '../../app';
import { signin } from '../../test/auth-helper';


it('responds with details about the current user', async () => {
    let cookie = await signin();
    const response = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', cookie)
        .send()
        .expect(200);
    expect(response.body.currentUser.email).toEqual('test@test.com');
})

it('respons with null if not authenticated', async () => {
    const response = await request(app)
        .get('/api/users/currentuser')
        .send()
        .expect(200);

    expect(response.body.currentUser).toEqual(null);
});