const request = require('supertest');
const app = require('../app');

const URL_BASE = '/api/v1/users';
let TOKEN;
let userId;

beforeAll(async () => {
    const user = {
        email: 'josuan.rodriguez@mail.com',
        password: 'josuan1234',
    };

    const response = await request(app)
        .post(`${URL_BASE}/login`)
        .send(user);

    TOKEN = response.body.token;
});

test('GET /users should return status code 200 and body must have length === 1', async () => {
    const response = await request(app)
        .get(URL_BASE)
        .set('Authorization', `Bearer ${TOKEN}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveLength(1);
});

test('POST /users should return status code 201 and create a new user', async () => {
    const user = {
        firstName: "Cristyann",
        lastName: "Valera",
        email: "cristyan.valera@mail.com",
        password: "cristyan1234",
        phone: "12345697895",
    };

    const response = await request(app)
        .post(URL_BASE)
        .send(user);

    userId = response.body.id;

    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
    expect(response.body.email).toBe(user.email);
});

test('PUT /users/:id should return status code 200 and update the user info', async () => {
    const newUser = {
        firstName: "Cristyan",
        lastName: "Valera",
        phone: "584121630650",
    };

    const response = await request(app)
        .put(`${URL_BASE}/${userId}`)
        .send(newUser)
        .set('Authorization', `Bearer ${TOKEN}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.firstName).toBe(newUser.firstName);
    expect(response.body.lastName).toBe(newUser.lastName);
    expect(response.body.phone).toBe(newUser.phone);
});

test('POST /users/login should return status code 200 and log in the user by its email and password', async () => {
    const user = {
        email: "cristyan.valera@mail.com",
        password: "cristyan1234",
    };

    const response = await request(app)
        .post(`${URL_BASE}/login`)
        .send(user);
    
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.user.email).toBe(user.email);
    expect(response.body.token).toBeDefined();
});

test('POST /users/login with wrong password should return status code 401', async () => {
    const user = {
        email: "cristyan.valera@mail.com",
        password: "::invalid_password::",
    };

    const response = await request(app)
        .post(`${URL_BASE}/login`)
        .send(user);

    expect(response.status).toBe(401);
});

test('POST /users/login with wrong email should return status code 401', async () => {
    const user = {
        email: "::wrongmail::@mail.com",
        password: "cristyan1234",
    };

    const response = await request(app)
        .post(`${URL_BASE}/login`)
        .send(user);

    expect(response.status).toBe(401);
});

test('DELETE /users/:id should return status code 204', async () => {
    const response = await request(app)
        .delete(`${URL_BASE}/${userId}`)
        .set('Authorization', `Bearer ${TOKEN}`);

    expect(response.status).toBe(204);
});