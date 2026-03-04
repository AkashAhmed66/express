const express = require('express');
const router = express.Router();
const permissionController = require('../controllers/permissionController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const { createPermissionSchema } = require('../validators/permissionValidator');
const { validate } = require('../middleware/validateMiddleware');

router.post('/', validate(createPermissionSchema), protect, authorizeRoles('admin'), permissionController.createPermission);
router.get('/', protect, authorizeRoles('admin'), permissionController.getPermissions);
router.delete('/:id', protect, authorizeRoles('admin'), permissionController.deletePermission);

module.exports = router;