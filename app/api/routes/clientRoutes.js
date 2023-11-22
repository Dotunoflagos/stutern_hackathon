const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController.js');
const {authenticateToken} = require('../middleware/authMiddleware.js');

// Route for client creation
router.post('/ceateClient', authenticateToken, clientController.create);

// Route for update
// router.put('/updateClient', authenticateToken, clientController.update);

// Route for delete
router.delete('/deleteClient/:clientId', authenticateToken, clientController.delete);

// Route to get all client
router.get('/allClient', authenticateToken, clientController.getAll);

// Route to search client
router.post('/searchClient', authenticateToken, clientController.search);

module.exports = router;
