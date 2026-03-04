const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');
const { authorizePermissions } = require('../middleware/permissionMiddleware');
const { validate } = require('../middleware/validateMiddleware');
const { createUserSchema } = require('../validators/userValidator');
const PERMISSIONS = require('../constants/permissions');

router.post('/', 
    validate(createUserSchema), 
    protect, 
    authorizePermissions(PERMISSIONS.CREATE_USER), 
    userController.createUser);

router.get('/', 
    protect, 
    authorizePermissions(PERMISSIONS.VIEW_USER), 
    userController.getUsers);

router.get('/:id', 
    protect, 
    authorizePermissions(PERMISSIONS.VIEW_USER), 
    userController.getUser);

router.put('/:id', 
    validate(createUserSchema), 
    protect, 
    authorizePermissions(PERMISSIONS.UPDATE_USER), 
    userController.updateUser);
    
router.delete('/:id', 
    protect, 
    authorizePermissions(PERMISSIONS.DELETE_USER), 
    userController.deleteUser);

router.put('/assign-role', 
    protect, 
    authorizePermissions(PERMISSIONS.ASSIGN_ROLE), 
    userController.assignRole);

module.exports = router;