const router = require('express').Router()

router.use(require('./controllers/data'))
router.use(require('./controllers/auth/auth'))
router.use(require('./controllers/assistant'))
module.exports = router