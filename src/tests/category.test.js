const request = require('supertest');
const app = require('../app');

const URL_BASE = '/api/v1/categories';
let TOKEN;
let categoryId;

beforeAll(async () => {
    const user = {
        email: 'josuan.rodriguez@mail.com',
        password: 'josuan1234',
    };

    const response = await request(app)
        .post('/api/v1/users/login')
        .send(user);
    
    TOKEN = response.body.token;
});

test('GET "/categories" should return status code 200', async () => {
    const response = await request(app)
        .get(URL_BASE);
    
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
});

test('POST "/categories" should return status code 201 and create a new category', async () => {
    const category = {
        name: 'White Line',
    };

    const response = await request(app)
        .post(URL_BASE)
        .send(category)
        .set('Authorization', `Bearer ${TOKEN}`);
    
    categoryId = response.body.id;

    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
    expect(response.body.name).toBe(category.name);
});

test('DELETE "/categories/:id" should return status code 204', async () => {
    const response = await request(app)
        .delete(`${URL_BASE}/${categoryId}`)
        .set('Authorization', `Bearer ${TOKEN}`);

    expect(response.status).toBe(204);
});