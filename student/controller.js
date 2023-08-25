const pool = require('../db') 

const getcustomerList = (req, res) =>{
pool.query("SELECT * FROM customer", (error , results) =>{
    if (error) throw error
    res.status(200).json(results.rows)
})
pool.end()
}

const getRiderList = (req, res) =>{
pool.query("SELECT * FROM ride_info ", (error , results) =>{
    if (error) throw error
    res.status(200).json(results.rows)
})
pool.end()
}

const getNearbyCabs = async (req, res) =>{
    let productId = req.query.location;
    console.log(productId)

    let response =  await pool.query("SELECT * FROM ride_info WHERE location = $1 AND status = 'true'", [productId]);
    if(!response){
        res.status(400).send("Something Went Wrong");
    }
    res.status(200).send(response.rows);
}

const getFareAndLocationData = async (req, res) =>{
    let travelfrom = req.query.travelFrom;
    let travelto = req.query.travelTo;

    let response =  await pool.query("SELECT * FROM fare_location_list WHERE travelfrom = $1 AND travelto = $2", [travelfrom, travelto]);
    if(!response){
        res.status(400).send("Something Went Wrong");
    }
    res.status(200).send(response.rows);
}

const riderUpdateStatus = async (req, res) =>{
    let updateStatus = req.query.statusToUpdate;
    let riderId = req.query.rider_id;

    let response =  await pool.query("UPDATE ride_info SET status = $1 WHERE id = $2", [updateStatus,riderId]);
    if(!response){
        res.status(400).send("Something Went Wrong");
    }
    res.status(200).send(response.rows);
}

const bookCabsToLocation = async (req, res) =>{
    let customerId = req.query.cus;
    let riderId = req.query.rid;
    let booking_details = req.query.bd;

    let response =  await pool.query("INSERT INTO bookings_creds (cust_id , rider_id, booking_details) VALUES ($1, $2, $3)", [customerId, riderId, booking_details]);

    if(!response){
        res.status(400).send("Something Went Wrong");
    }

    let bookingResponse =  await pool.query("SELECT customer.*, ride_info.*, fare_location_list.travelfrom,fare_location_list.travelto,fare_location_list.onewayfare, bookings_creds.cust_id, bookings_creds.rider_id, bookings_creds.booking_details FROM bookings_creds LEFT JOIN customer ON bookings_creds.cust_id = customer.id LEFT JOIN ride_info ON bookings_creds.rider_id = ride_info.id LEFT JOIN fare_location_list ON bookings_creds.booking_details = fare_location_list.id WHERE cust_id = $1 ORDER BY bookings_creds.id DESC LIMIT 1", [customerId]);

    res.status(200).send(bookingResponse.rows);
}

module.exports = {
    getcustomerList,
    getNearbyCabs,
    getRiderList,
    bookCabsToLocation,
    getFareAndLocationData,
    riderUpdateStatus

}