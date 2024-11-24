const {itemValidation} = require('../Middleware/ItemValidation');
const {createItem} = require('../Controllers/ItemCreate');
const {getItems} = require('../Controllers/GetItems');
const {getUserItems } = require('../Controllers/UserItems');
const Auth = require('../Middleware/Auth');

const router = require('express').Router();

// const storage = multer.memoryStorage();
// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 5 * 1024 * 1024 }, 
//     fileFilter: (req, file, cb) => {
//         const allowedTypes = /jpeg|jpg|png|gif/;
//         const isValidType = allowedTypes.test(file.mimetype);
//         if (isValidType) {
//             cb(null, true);
//         } else {
//             cb(new Error('Only JPEG, PNG, and GIF images are allowed.'));
//         }
//     }
// }).array('images', 5);

router.post('/create', Auth, createItem);
router.get('/getitems', getItems);
router.get('/getuseritems', Auth, getUserItems);
module.exports = router;
