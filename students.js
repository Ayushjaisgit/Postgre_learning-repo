const { Router } = require('express')
const studentcontroller = require('./student/controller')
const router = Router()


router.get('/get', studentcontroller.getstudents)

module.exports = router