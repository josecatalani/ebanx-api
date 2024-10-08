import request from 'supertest';
import app from '../app';

test('GET "/": should be accessible', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
});

test('GET "/": should return "Hello from the EBANX API" text', async () => {
    const response = await request(app).get('/');
    expect(response.text).toBe('Hello from the EBANX API');
});