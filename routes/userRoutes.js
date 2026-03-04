const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const { validate } = require('../middleware/validateMiddleware');
const { createUserSchema } = require('../validators/userValidator');

router.post('/', validate(createUserSchema), protect, userController.createUser);
router.get('/', protect, userController.getUsers);
router.get('/:id', protect, userController.getUser);
router.put('/:id', validate(createUserSchema), protect, userController.updateUser);
router.delete('/:id', protect, userController.deleteUser);

router.put('/assign-role', protect, authorizeRoles('admin'), userController.assignRole);

module.exports = router;