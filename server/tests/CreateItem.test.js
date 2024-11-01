const { createItem } = require('../Controllers/ItemCreate');
const ItemModel = require('../db/item');

jest.mock('../db/item');

describe('createItem', () => {
    let req, res;

    beforeEach(() => {
        req = {
            headers: {
                authorization: 'Bearer mockToken' 
            },
            body: {
                title: 'Test Item',
                description: 'A test item description',
                price: 100,
                category: 'Test Category',
                images: []
            },
            user: {
                email: 'testuser@example.com'
            }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should create a new item and return a success response', async () => {
        ItemModel.mockImplementation(() => {
            return {
                save: jest.fn().mockResolvedValue({
                    title: 'Test Item',
                    description: 'A test item description',
                    price: 100,
                    category: 'Test Category',
                    images: [],
                    seller: 'testuser@example.com'
                })
            };
        });

        await createItem(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            message: "Item created successfully",
            success: true,
            // item: {
            //     title: 'Test Item',
            //     description: 'A test item description',
            //     price: 100,
            //     category: 'Test Category',
            //     images: [],
            //     seller: 'testuser@example.com'
            // }
        });
    });

    test('should handle errors and return a 500 response', async () => {
        ItemModel.mockImplementation(() => ({
            save: jest.fn().mockRejectedValue(new Error("Database error"))
        }));

        await createItem(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: "Internal Server Error",
            success: false,
            error: expect.any(Error)
        });
    });
});
