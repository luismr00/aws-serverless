const express = require('express');
const router = express.Router();
const userService = require('./userService');
// const authMiddleware = require('../middleware/authMiddleware');

// router.use(authMiddleware);

router.get('/getuser', userService.getUsers);
router.post('/createuser', userService.createUser);
router.put('/:id', userService.updateUser);
router.delete('/:id', userService.deleteUser);

module.exports = router;
