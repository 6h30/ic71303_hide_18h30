const request = require('supertest');
const { app, startServer } = require('../index');

let server;

beforeAll(async () => {
    server = await startServer(3001); // Khởi động server trên port khác
});

afterAll((done) => {
    server.close(done); // Đóng server sau khi test hoàn tất
});

describe('POST /api/user/login', () => {
    it('should login successfully with valid credentials', async () => {
        console.log('Testing login with valid credentials');
        const response = await request(app)
            .post('/api/user/login')
            .send({
                email: 'hello@omdstudio.art', 
                password: 'admin123', 
            });
        
        console.log('Response status:', response.status);
        expect(response.status).toBe(200); 
    });

    it('should return 401 for invalid credentials', async () => {
        console.log('Testing login with invalid credentials');
        const response = await request(app)
            .post('/api/user/login')
            .send({
                email: 'invalid@example.com',
                password: 'wrong_password',
            });
        
        console.log('Response status:', response.status);
        expect(response.status).toBe(401); 
    });
});

