const {getUserItems } = require('../Controllers/UserItems');
const ItemModel = require('../db/item');

jest.mock('../db/item');

describe('getUserItems function', () => {
    let req, res;

    beforeEach(() => {
        req = {user: { email: 'user@gmail.com' }}; 
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should return all items posted by the specific user successfully', async () => {
        const mockItems = [
            { title: 'User Item 1', description: 'User Description 1', price: 100, category: 'Electronics', images: [], seller: 'user@gmail.com', createdAt: new Date(), toObject: jest.fn().mockReturnThis() },
            { title: 'User Item 2', description: 'User Description 2', price: 200, category: 'Clothing', images: [], seller: 'user@gmail.com', createdAt: new Date(), toObject: jest.fn().mockReturnThis() }
        ];
        
        
        ItemModel.find = jest.fn().mockReturnValue({
            sort: jest.fn().mockReturnValue(mockItems)
        });

        await getUserItems(req, res);

        expect(ItemModel.find).toHaveBeenCalledWith({ seller: 'user@gmail.com' }, 'title description price category images seller createdAt');
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            message: "All items posted by the user fetched successfully",
            success: true,
            items: expect.arrayContaining(mockItems.map(item => expect.objectContaining(item)))
        });
    });

    test('should return an empty array if the user has no items', async () => {
        ItemModel.find.mockReturnValue({
            sort: jest.fn().mockReturnValue([])
        });
    

        await getUserItems(req, res);

        expect(ItemModel.find).toHaveBeenCalledWith({ seller: 'user@gmail.com' }, 'title description price category images seller createdAt');
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            message: "All items posted by the user fetched successfully",
            success: true,
            items: []
        });
    });

    test('should handle errors and return a 500 status code', async () => {
        const errorMessage = "Internal Server Error";
        ItemModel.find.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        await getUserItems(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: "Internal Server Error",
            success: false,
            error: expect.any(Error)
        });
    });
});
