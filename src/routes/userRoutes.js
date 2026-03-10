const express = require('express');
const router = express.Router();
const { getUsers, createUser, deleteUser, getUserById, updateUser, VerifyuserOTP, LoginUser, getuserList } = require('../controllers/userController');

router.get('/', getUsers);
router.post('/', createUser);
router.post('/login', LoginUser);
router.delete('/:id', deleteUser);
router.put('/:id', updateUser);
router.post('/verify', VerifyuserOTP);
router.get('/display', getuserList);
 

module.exports = router;