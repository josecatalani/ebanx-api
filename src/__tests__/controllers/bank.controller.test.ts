import request from 'supertest';
import app from '../../app';

test('reproducing entire Ipkiss Tester', async () => {
    const postResetResponse = await request(app).post('/reset');
    expect(postResetResponse.status).toBe(200);
    expect(postResetResponse.body).toBe("OK");

    const getBalanceForNonExistingAccountResponse = await request(app).get('/balance?account_id=1234');
    expect(getBalanceForNonExistingAccountResponse.status).toBe(404);
    expect(getBalanceForNonExistingAccountResponse.body).toBe(0);

    const createAccountWithInitialBalanceResponse = await request(app).post('/event').send({ "type": "deposit", "destination": "100", "amount": 10 });
    expect(createAccountWithInitialBalanceResponse.status).toBe(201);
    expect(createAccountWithInitialBalanceResponse.body).toStrictEqual({ "destination": { "id": "100", "balance": 10 } });

    const depositIntoExistingAccountResponse = await request(app).post('/event').send({ "type": "deposit", "destination": "100", "amount": 10 });
    expect(depositIntoExistingAccountResponse.status).toBe(201);
    expect(depositIntoExistingAccountResponse.body).toStrictEqual({ "destination": { "id": "100", "balance": 20 } });

    const getBalanceForExistingAccountResponse = await request(app).get('/balance?account_id=100');
    expect(getBalanceForExistingAccountResponse.status).toBe(200);
    expect(getBalanceForExistingAccountResponse.body).toBe(20);

    const withdrawFromNonExistingAccountResponse = await request(app).post('/event').send({ "type": "withdraw", "origin": "200", "amount": 10 });
    expect(withdrawFromNonExistingAccountResponse.status).toBe(404);
    expect(withdrawFromNonExistingAccountResponse.body).toBe(0);

    const withdrawFromExistingAccountResponse = await request(app).post('/event').send({ "type": "withdraw", "origin": "100", "amount": 5 });
    expect(withdrawFromExistingAccountResponse.status).toBe(201);
    expect(withdrawFromExistingAccountResponse.body).toStrictEqual({ "origin": { "id": "100", "balance": 15 } });

    const transferFromExistingAccountResponse = await request(app).post('/event').send({ "type": "transfer", "origin": "100", "amount": 15, "destination": "300" });
    expect(transferFromExistingAccountResponse.status).toBe(201);
    expect(transferFromExistingAccountResponse.body).toStrictEqual({ "origin": { "id": "100", "balance": 0 }, "destination": { "id": "300", "balance": 15 } });

    const transferFromNonExistingAccountResponse = await request(app).post('/event').send({ "type": "transfer", "origin": "200", "amount": 15, "destination": "300" });
    expect(transferFromNonExistingAccountResponse.status).toBe(404);
    expect(transferFromNonExistingAccountResponse.body).toBe(0);
});
