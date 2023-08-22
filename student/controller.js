const pool = require('../db') 

const getstudents = (req, res) =>{
pool.query("SELECT * FROM students", (error , results) =>{
    if (error) throw error
    res.status(200).json(results.rows)
})
pool.end()
}

module.exports = {
    getstudents

}