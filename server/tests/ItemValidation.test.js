const { itemValidation } = require('../Middleware/ItemValidation');

describe('ItemValidation Middleware', () => {
    let req, res, next;

    beforeEach(() => {
        req = { body: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
    });

    test('should call next for valid data', () => {
        req.body = {
            title: 'Valid Item Title',
            description: 'This is a valid description with more than 10 characters.',
            price: 100,
            category: 'Electronics',
            images: ['image1.jpg', 'image2.jpg']
        };

        itemValidation(req, res, next);

        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });

    test('should return 400 for missing required fields (title)', () => {
        req.body = {
            description: 'Valid description with more than 10 characters.',
            price: 100,
            category: 'Electronics'
        };

        itemValidation(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: "Bad Request",
            error: expect.any(Array)
        });
        expect(next).not.toHaveBeenCalled();
    });

    test('should return 400 for short title', () => {
        req.body = {
            title: 'Hi',
            description: 'A valid description with more than 10 characters.',
            price: 100,
            category: 'Electronics'
        };

        itemValidation(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: "Bad Request",
            error: expect.any(Array)
        });
        expect(next).not.toHaveBeenCalled();
    });

    test('should return 400 for short description', () => {
        req.body = {
            title: 'Valid Item Title',
            description: 'Short',
            price: 100,
            category: 'Electronics'
        };

        itemValidation(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: "Bad Request",
            error: expect.any(Array)
        });
        expect(next).not.toHaveBeenCalled();
    });

    test('should return 400 for non-positive price', () => {
        req.body = {
            title: 'Valid Item Title',
            description: 'A valid description with more than 10 characters.',
            price: -10,
            category: 'Electronics'
        };

        itemValidation(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: "Bad Request",
            error: expect.any(Array)
        });
        expect(next).not.toHaveBeenCalled();
    });

    test('should return 400 for missing category', () => {
        req.body = {
            title: 'Valid Item Title',
            description: 'A valid description with more than 10 characters.',
            price: 100
        };

        itemValidation(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: "Bad Request",
            error: expect.any(Array)
        });
        expect(next).not.toHaveBeenCalled();
    });
});
