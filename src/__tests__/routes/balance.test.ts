import request from 'supertest';
import app from '../../app';

test('GET "/balance": shouldnt be accessible', async () => {
    const response = await request(app).get('/balance');
    expect(response.status).toBe(404);
    expect(response.body).toBe(0);
});