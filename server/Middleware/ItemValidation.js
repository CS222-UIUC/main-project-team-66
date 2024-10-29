const Joi = require('joi');

const itemValidation = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().min(3).max(100).required(),
        description: Joi.string().min(10).required(),
        price: Joi.number().min(0).required(),
        category: Joi.string().required(),
        images: Joi.array().items(Joi.string()).optional(), 
    });
    
    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: "Bad Request", error: error.details });
    }
    next();
};

module.exports = {itemValidation};
