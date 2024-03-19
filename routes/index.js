const router = require('express').Router();
router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    res.send('Hello World');
});

router.use('/students', require('./students'));
router.use('/departments', require('./departments'));
router.use('/courses', require('./courses'));

module.exports = router;