const express = require('express');
const router = express.Router();
const { getUsers, createUser, deleteUser, getUserById, updateUser, VerifyuserOTP, LoginUser, getuserList } = require('../controllers/userController');
const { protect, requireRoles } = require('../middlewares/auth');

router.post('/', createUser);
router.post('/login', LoginUser);
router.post('/verify', VerifyuserOTP);
router.get('/', protect, requireRoles('admin'), getUsers);
router.get('/display', protect, requireRoles('admin'), getuserList);
router.delete('/:id', protect, requireRoles('admin'), deleteUser);
router.put('/:id', protect, requireRoles('admin'), updateUser);
 

module.exports = router;
