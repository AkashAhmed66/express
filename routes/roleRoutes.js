const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const { createRoleSchema } = require('../validators/roleValidator');
const { validate } = require('../middleware/validateMiddleware');

router.post('/', validate(createRoleSchema), protect, authorizeRoles('admin'), roleController.createRole);
router.get('/', protect, authorizeRoles('admin'), roleController.getRoles);
router.put('/:id', validate(createRoleSchema), protect, authorizeRoles('admin'), roleController.updateRolePermissions);
router.delete('/:id', protect, authorizeRoles('admin'), roleController.deleteRole);

module.exports = router;