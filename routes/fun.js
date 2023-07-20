const express = require('express');
const router = express.Router();

const funController = require('../controllers/fun_controller');

router.get('/moreFun', funController.moreFun);

module.exports = router;