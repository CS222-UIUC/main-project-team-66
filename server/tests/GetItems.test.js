const {getItems} = require('../Controllers/GetItems');
const ItemModel = require('../db/item');

jest.mock('../db/item');

describe('getItems function', () => {
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

    test('should return the most recent 5 items successfully', async () => {
        const mockItems = [
            { title: 'Item 1', description: 'Description 1', price: 100, category: 'Electronics', images: [], seller: 'abc@gmail.com', createdAt: new Date(), toObject: jest.fn().mockReturnThis() },
            { title: 'Item 2', description: 'Description 2', price: 200, category: 'Clothing', images: [], seller: 'def@gmail.com', createdAt: new Date(), toObject: jest.fn().mockReturnThis() },
            { title: 'Item 3', description: 'Description 3', price: 300, category: 'Books', images: [], seller: 'ghi@gmail.com', createdAt: new Date(), toObject: jest.fn().mockReturnThis() },
            { title: 'Item 4', description: 'Description 4', price: 400, category: 'Home', images: [], seller: 'klm@gmail.com', createdAt: new Date(), toObject: jest.fn().mockReturnThis() },
            { title: 'Item 5', description: 'Description 5', price: 500, category: 'Sports', images: [], seller: 'xyz@gmail.com', createdAt: new Date(), toObject: jest.fn().mockReturnThis() }
        ];
        
        
        ItemModel.find = jest.fn().mockReturnValue({
            sort: jest.fn().mockReturnValue({
                limit: jest.fn().mockResolvedValue(mockItems)
            })
        });

        await getItems(req, res);

        expect(res.json).toHaveBeenCalledWith({
            message: "Most recent 8 items fetched successfully",
            success: true,
            items: expect.arrayContaining(mockItems.map(item => expect.objectContaining(item)))
        });
    });

    test('should return an empty array if there are no items', async () => {
        ItemModel.find.mockReturnValue({
            sort: jest.fn().mockReturnValue({
                limit: jest.fn().mockResolvedValue([]) 
            })
        });
    

        await getItems(req, res);

        expect(res.json).toHaveBeenCalledWith({
            message: "Most recent 8 items fetched successfully",
            success: true,
            items: []
        });
    });

});
