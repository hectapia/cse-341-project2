const express = require('express');
const router = express.Router();

const departmentsController = require('../controllers/departments');

router.get('/',departmentsController.getAll);

router.get('/:id',departmentsController.getSingle);

module.exports = router;