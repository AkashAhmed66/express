const express = require('express');
const router = express.Router();
const permissionController = require('../controllers/permissionController');
const { protect } = require('../middleware/authMiddleware');
const { authorizePermissions } = require('../middleware/permissionMiddleware');
const { createPermissionSchema } = require('../validators/permissionValidator');
const { validate } = require('../middleware/validateMiddleware');
const PERMISSIONS = require('../constants/permissions');

router.post('/', 
    validate(createPermissionSchema), 
    protect, 
    authorizePermissions(PERMISSIONS.CREATE_PERMISSION), 
    permissionController.createPermission);

router.get('/', 
    protect, 
    authorizePermissions(PERMISSIONS.VIEW_PERMISSION), 
    permissionController.getPermissions);

router.delete('/:id',
    protect, 
    authorizePermissions(PERMISSIONS.DELETE_PERMISSION), 
    permissionController.deletePermission);

module.exports = router;