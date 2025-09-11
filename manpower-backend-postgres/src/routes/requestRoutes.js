const express = require('express');
const router = express.Router();
const { createRequest } = require('../controllers/requestController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/', authMiddleware, createRequest);

module.exports = router;
