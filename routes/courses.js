const express = require('express');
const router = express.Router();

const coursesController = require('../controllers/courses');
const validation = require('../middleware/validate');

router.get('/', coursesController.getAll);

router.get('/:id', coursesController.getSingle);

router.post('/', validation.saveCourse, coursesController.createCourse);

router.put('/:id', validation.saveCourse, coursesController.updateCourse)

router.delete('/:id', coursesController.deleteCourse);

module.exports = router;