const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Hello World');
});

router.use('/students', require('./students'));
router.use('/departments', require('./departments'));
router.use('/courses', require('./courses'));

module.exports = router;