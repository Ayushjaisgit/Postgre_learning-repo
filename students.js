const { Router } = require('express')
const studentcontroller = require('./student/controller')
const router = Router()

// all routes 

// Get All the customers List
router.get('/cust/list', studentcontroller.getcustomerList)

// Get Riders List
router.get('/riders/nearby', studentcontroller.getRiderList)

// Get riders around you
router.get('/nearby/cab-list', studentcontroller.getNearbyCabs)

// Get details about your trips
router.get('/fare/details', studentcontroller.getFareAndLocationData)

//Rider Active Status Update 
router.patch('/fare/details', studentcontroller.riderUpdateStatus)

// to book a cab 
router.post('/book/cab/', studentcontroller.bookCabsToLocation)

module.exports = router