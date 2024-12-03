const { filterItems } = require('../Controllers/GetItems');
const ItemModel = require('../db/item');

jest.mock('../db/item'); 

describe('filterItems function', () => {
    let req, res;

    beforeEach(() => {
        req = { query: {} }; 
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(), 
        };
    });

    afterEach(() => {
        jest.clearAllMocks(); 
    });

    test('should return filtered items based on search and category', async () => {
        const mockItems = [
            {
                title: 'Item 1',
                description: 'Description 1',
                price: 100,
                category: 'Electronics',
                images: [],
                seller: 'abc@gmail.com',
                createdAt: new Date(),
                toObject: jest.fn().mockReturnThis(),
            },
        ];

        ItemModel.find.mockReturnValue({
            sort: jest.fn().mockResolvedValue(mockItems),
        });

        req.query = { search: 'Item', category: 'Electronics' };

        await filterItems(req, res);

        expect(ItemModel.find).toHaveBeenCalledWith(
            expect.objectContaining({
                category: 'Electronics',
                $or: expect.any(Array),
            }),
            '_id title description price category images seller createdAt'
        );

        expect(res.json).toHaveBeenCalledWith({
            message: 'Filtered items fetched successfully',
            success: true,
            items: expect.arrayContaining(
                mockItems.map((item) =>
                    expect.objectContaining({
                        title: item.title,
                        description: item.description,
                        price: item.price,
                        category: item.category,
                        images: expect.any(Array),
                        seller: item.seller,
                    })
                )
            ),
        });
    });

    test('should return filtered items based on price range', async () => {
        const mockItems = [
            {
                title: 'Item 1',
                description: 'Description 1',
                price: 150,
                category: 'Electronics',
                images: [],
                seller: 'abc@gmail.com',
                createdAt: new Date(),
                toObject: jest.fn().mockReturnThis(),
            },
        ];

        ItemModel.find.mockReturnValue({
            sort: jest.fn().mockResolvedValue(mockItems),
        });

        req.query = { minPrice: '100', maxPrice: '200' };

        await filterItems(req, res);

        expect(ItemModel.find).toHaveBeenCalledWith(
            expect.objectContaining({
                price: { $gte: 100, $lte: 200 },
            }),
            '_id title description price category images seller createdAt'
        );

        expect(res.json).toHaveBeenCalledWith({
            message: 'Filtered items fetched successfully',
            success: true,
            items: expect.arrayContaining(
                mockItems.map((item) =>
                    expect.objectContaining({
                        title: item.title,
                        description: item.description,
                        price: item.price,
                        category: item.category,
                        images: expect.any(Array),
                        seller: item.seller,
                    })
                )
            ),
        });
    });

    test('should return an empty array if no items match the filter', async () => {
        ItemModel.find.mockReturnValue({
            sort: jest.fn().mockResolvedValue([]),
        });

        req.query = { search: 'Nonexistent' };

        await filterItems(req, res);

        expect(ItemModel.find).toHaveBeenCalledWith(
            expect.objectContaining({
                $or: expect.any(Array),
            }),
            '_id title description price category images seller createdAt'
        );

        expect(res.json).toHaveBeenCalledWith({
            message: 'Filtered items fetched successfully',
            success: true,
            items: [],
        });
    });

});
