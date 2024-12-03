const { getAllItems } = require('../Controllers/GetItems');
const ItemModel = require('../db/item');

jest.mock('../db/item');

describe('getAllItems function', () => {
    let req, res;

    beforeEach(() => {
        req = {}; 
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should return all items successfully', async () => {
        const mockItems = [
            { title: 'Item 1', description: 'Description 1', price: 100, category: 'Electronics', images: [], seller: 'abc@gmail.com', createdAt: new Date(), toObject: jest.fn().mockReturnThis() },
            { title: 'Item 2', description: 'Description 2', price: 200, category: 'Clothing', images: [], seller: 'def@gmail.com', createdAt: new Date(), toObject: jest.fn().mockReturnThis() },
        ];

        ItemModel.find.mockReturnValue({
            sort: jest.fn().mockResolvedValue(mockItems),
        });

        await getAllItems(req, res);

        expect(ItemModel.find).toHaveBeenCalledWith({}, '_id title description price category images seller createdAt');
        expect(res.json).toHaveBeenCalledWith({
            message: "all items successfully",
            success: true,
            items: expect.arrayContaining(mockItems.map(item => expect.objectContaining(item)))
        });
    });

    test('should return an empty array if no items are found', async () => {
        ItemModel.find.mockReturnValue({
            sort: jest.fn().mockResolvedValue([]),
        });

        await getAllItems(req, res);

        expect(ItemModel.find).toHaveBeenCalledWith({}, '_id title description price category images seller createdAt');
        expect(res.json).toHaveBeenCalledWith({
            message: "all items successfully",
            success: true,
            items: []
        });
    });
});
