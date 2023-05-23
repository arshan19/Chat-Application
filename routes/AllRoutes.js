const express = require('express');
const userRoutes = require('./userRoutes');
const chatRoutes = require('./chatRoutes');

const router = express.Router();

router.use('/', userRoutes);
router.use('/', chatRoutes);

module.exports = router;
