const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');
const { protect } = require('../middleware/authMiddleware');
const { authorizePermissions } = require('../middleware/permissionMiddleware');
const { createRoleSchema } = require('../validators/roleValidator');
const { validate } = require('../middleware/validateMiddleware');
const PERMISSIONS = require('../constants/permissions');

router.post('/', 
    validate(createRoleSchema), 
    protect, 
    authorizePermissions(PERMISSIONS.CREATE_ROLE), 
    roleController.createRole);
    
router.get('/', 
    protect, 
    authorizePermissions(PERMISSIONS.VIEW_ROLE), 
    roleController.getRoles);

router.put('/:id', 
    validate(createRoleSchema), 
    protect, 
    authorizePermissions(PERMISSIONS.UPDATE_ROLE), 
    roleController.updateRolePermissions);

router.delete('/:id', 
    protect, 
    authorizePermissions(PERMISSIONS.DELETE_ROLE), 
    roleController.deleteRole);

module.exports = router;