import request from 'supertest';
import app from '../../app';

test('GET "/balance": should be accessible', async () => {
    const response = await request(app).get('/balance');
    expect(response.status).toBe(200);
});