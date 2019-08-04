const router = require('express').Router()

router.use(require('./controllers/data'))
router.use(require('./controllers/auth/auth'))

module.exports = router