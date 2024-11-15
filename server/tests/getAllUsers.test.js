const { getAllUsers } = require('../Controllers/UserController');
const UserModel = require('../db/user');

jest.mock('../db/user');

describe('getAllUsers function', () => {
    let req, res;

    beforeEach(() => {
        req = { query: {}, user: { _id: 'currentUserId' } }; 
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn()
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should return all users except the current user without search query', async () => {
        const mockUsers = [
            { _id: 'user1', name: 'User 1', email: 'user1@example.com' },
            { _id: 'user2', name: 'User 2', email: 'user2@example.com' }
        ];

        UserModel.find = jest.fn().mockReturnValue({
            find: jest.fn().mockResolvedValue(mockUsers)
        });

        await getAllUsers(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(mockUsers);
    });

    test('should return users that match the search query', async () => {
        const mockUsers = [
            { _id: 'user1', name: 'User 1', email: 'user1@example.com' },
            { _id: 'user2', name: 'Test User', email: 'test@example.com' }
        ];

        req.query.search = 'Test';

        UserModel.find = jest.fn().mockReturnValue({
            find: jest.fn().mockResolvedValue(mockUsers)
        });

        await getAllUsers(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(mockUsers);
    });

    test('should return an empty array if no users match the search', async () => {
        req.query.search = 'NonExistent';
        
        UserModel.find = jest.fn().mockReturnValue({
            find: jest.fn().mockResolvedValue([]) 
        });

        await getAllUsers(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith([]);
    });

    test('should handle errors and return a 500 status code', async () => {
        UserModel.find = jest.fn().mockReturnValue({
            find: jest.fn().mockRejectedValue(new Error('Database error'))
        });

        await getAllUsers(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Failed to retrieve users', error: expect.any(Error) });
    });
});
