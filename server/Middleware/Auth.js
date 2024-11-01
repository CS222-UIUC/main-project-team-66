const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req,res,next) => {
    const authHeader = req.headers['authorization'];
    console.log('Authorization Header', authHeader);

    if (!authHeader) {
        return res.status(401)
            .json({message: "Unauthorized. Please login in."});
    }

    const token = authHeader.split(' ')[1];
    console.log('Extracred token', token);


    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log('req user', req.user);
        next();
    } catch (error) {
        console.log('JWT Verfication Error', error)
        return res.status(401)
            .json({message: "Unauthorized. Invalid token."});
    }
}

module.exports = ensureAuthenticated;