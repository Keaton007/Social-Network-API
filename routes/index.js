const router = require('express').Router();
router.use('/users', require('./userRoutes'));
router.use('/thoughts', require('./thoughtRoutes'));
module.exports = router;
