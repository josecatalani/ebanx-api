import request from 'supertest';
import app from '../../app';

test('GET "/": should be accessible', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
});

test('GET "/": should return "Hello from the EBANX API" text', async () => {
    const response = await request(app).get('/');
    expect(response.text).toBe('Hello from the EBANX API');
});

test('POST "/reset": should return statusCode:200 message:OK', async () => {
    const response = await request(app).post('/reset');
    expect(response.status).toBe(200);
    expect(response.body).toBe('OK');
});