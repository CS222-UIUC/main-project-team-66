const { getItemID } = require('../Controllers/GetItems');
const ItemModel = require('../db/item');

jest.mock('../db/item');

describe('getItemID function', () => {
    let req, res;

    beforeEach(() => {
        req = {
            params: {},
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should return an item successfully', async () => {
        const mockItem = {
            _id: '63a8b4f1c8e4f3a6e45b78c1',
            title: 'Fairy Lights',
            description: 'Decorative lights for your home.',
            price: 10,
            category: 'Home',
            images: [
                {
                    contentType: 'image/jpeg',
                    imageData: Buffer.from('mockBase64Image'),
                },
            ],
            toObject: jest.fn().mockReturnThis(),
        };

        req.params.id = mockItem._id;

        ItemModel.findById.mockResolvedValue(mockItem);

        await getItemID(req, res);

        expect(ItemModel.findById).toHaveBeenCalledWith(mockItem._id);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Item fetched successfully',
            success: true,
            itemt: {
                ...mockItem,
                images: [
                    `data:image/jpeg;base64,${mockItem.images[0].imageData.toString('base64')}`,
                ],
            },
        });
    });

    test('should return 400 for invalid ID format', async () => {
        req.params.id = 'invalid-id';

        const mockError = new Error('Invalid ID format');
        mockError.kind = 'ObjectId';

        ItemModel.findById.mockRejectedValue(mockError);

        await getItemID(req, res);

        expect(ItemModel.findById).toHaveBeenCalledWith(req.params.id);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Invalid item ID format',
            success: false,
        });
    });

    test('should return 500 for internal server error', async () => {
        req.params.id = '63a8b4f1c8e4f3a6e45b78c3';

        const mockError = new Error('Database connection failed');

        ItemModel.findById.mockRejectedValue(mockError);

        await getItemID(req, res);

        expect(ItemModel.findById).toHaveBeenCalledWith(req.params.id);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Internal Server Error',
            success: false,
            error: mockError,
        });
    });
});