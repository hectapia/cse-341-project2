const express = require('express');
const router = express.Router();

const departmentsController = require('../controllers/departments');
const validation = require('../middleware/validate');

router.get('/', departmentsController.getAll);

router.get('/:id', departmentsController.getSingle);

router.post('/', validation.saveDepartment, departmentsController.createDepartment);

router.put('/:id', validation.saveDepartment, departmentsController.updateDepartment)

router.delete('/:id', departmentsController.deleteDepartment);

module.exports = router;