const { Router } = require('express')
const studentcontroller = require('./student/controller')
const router = Router()


router.get('/cust/list', studentcontroller.getstudents)

router.get('/riders/nearby', studentcontroller.getRiderList)

router.get('/nearby/cab-list', studentcontroller.getNearbyCabs)

router.get('/fare/details', studentcontroller.getFareAndLocationData)

router.post('/book/cab/', studentcontroller.bookCabsToLocation)

module.exports = router