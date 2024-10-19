const {signupValidation, loginValidation} = require("../Middleware/AuthValidation.js");
const UserModel = require('../db/user');
const request = require('supertest');
const app = require('../app.js')
const bcrypt = require('bcryptjs');


jest.mock('../db/user');


test('signup - should return 400 if validation fails', () => {
    const req = { body: { name: 'Test', email: 'test-email', password: '123' } };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };
    const next = jest.fn();

    signupValidation(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
});

test('signup - success', () => {
    const req = { body: { name: 'Testing', email: 'test@gmail.com', password: '12345' } };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };
    const next = jest.fn();

    signupValidation(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
});

test('login - should return 400 if validation fails', () => {
    const req = { body: { email: 'test-email', password: '123' } };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };
    const next = jest.fn();

    loginValidation(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
});

test('login - success', () => {
    const req = { body: { email: 'test@gmail.com', password: '12345' } };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };
    const next = jest.fn();

    loginValidation(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
});


test('should return 409 if user already exists', async () => {
    UserModel.findOne.mockResolvedValue({ email: 'test@gmail.com' });

    const response = await request(app)
        .post('/auth/signup')
        .send({
            name: 'Test',
            email: 'test@gmail.com',
            password: '12345'
        });

    expect(response.status).toBe(409);
    expect(response.body).toEqual({
        message: "User already exists",
        success: false
    });
});

test('should return 409 if the user already exists (signup)', async () => {
    UserModel.findOne.mockResolvedValue(true); 

    const response = await request(app)
        .post('/auth/signup')
        .send({
            name: 'Test',
            email: 'test@gmail.com',
            password: '12345',
        });

    expect(response.status).toBe(409);
    expect(response.body).toEqual({
        message: "User already exists",
        success: false,
    });
});

test('should login successfully with valid credentials', async () => {
    UserModel.findOne.mockResolvedValue({
        email: 'test@gmail.com',
        password: await bcrypt.hash('1234', 10), // Mock a hashed password
    });

    const response = await request(app)
        .post('/auth/login')
        .send({
            email: 'test@gmail.com',
            password: '1234',
        });

    expect(response.status).toBe(200);
});


test('should return 401 for invalid login credentials', async () => {
    UserModel.findOne.mockResolvedValue(null);

    const response = await request(app)
        .post('/auth/login')
        .send({
            email: 'test@gmail.com',
            password: '1234',
        });

    expect(response.status).toBe(403);
    expect(UserModel.findOne).toHaveBeenCalledWith({ email: 'test@gmail.com' });
});










