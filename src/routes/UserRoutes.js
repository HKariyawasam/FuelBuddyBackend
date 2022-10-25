const express = require('express');

const router = express.Router();

let userController = require('../controllers/UserController')
/** 
    *routes to access the user details

    *author Hasani Kariyawasam

    *router.post('/register', userController.register) -registers a user and return a 
    
    *router.post('/login', userController.login) -logins a user and return user object

    *router.get('/', userController.getAllUsers) - return all the users

    *router.get('/profiles/:email', userController.getUserProfile) - retrieves one user details 
    *pathparam email

    *router.get('/:email', userController.getOwnerStations) -reurns all the station ids of a staion owner
    *pathparam email

    *router.put('/:email', userController.updateUser) - update a user details
    *pathparam email

    *router.put('/:email/:pwd', userController.updateUserPassword) - update forgotten password
    *pathparam email,password

    router.delete('/:email', userController.deleteUser) - deletes a user
    *pathparam email


*/

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/', userController.getAllUsers);
router.get('/profiles/:email', userController.getUserProfile);
router.get('/:email', userController.getOwnerStations);
router.put('/:email', userController.updateUser);
router.put('/:email/:pwd', userController.updateUserPassword);
router.delete('/:email', userController.deleteUser);



module.exports = router;