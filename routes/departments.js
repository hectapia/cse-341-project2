const express = require('express');
const router = express.Router();

const departmentsController = require('../controllers/departments');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', departmentsController.getAll);

router.get('/:id', departmentsController.getSingle);

router.post('/', isAuthenticated, validation.saveDepartment, departmentsController.createDepartment);

router.put('/:id', isAuthenticated, validation.saveDepartment, departmentsController.updateDepartment)

router.delete('/:id', isAuthenticated, departmentsController.deleteDepartment);

module.exports = router;