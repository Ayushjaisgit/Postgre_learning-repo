const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const pg = require('pg');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// PostgreSQL configuration
const pool = new pg.Pool({
  user: 'your_user',
  host: 'localhost',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
});

// WebSocket connection handling
io.on('connection', socket => {
  console.log('A user connected:', socket.id);

  socket.on('updateLocation', data => {
    const { latitude, longitude } = data;
    const userId = socket.id;

    // Store/update location in PostgreSQL
    pool.query(
      'INSERT INTO user_locations (user_id, latitude, longitude) VALUES ($1, $2, $3) ' +
      'ON CONFLICT (user_id) DO UPDATE SET latitude = EXCLUDED.latitude, longitude = EXCLUDED.longitude',
      [userId, latitude, longitude],
      (error, results) => {
        if (error) {
          console.error('Error inserting/updating location:', error);
        }
      }
    );
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
    // Delete user location from PostgreSQL
    pool.query('DELETE FROM user_locations WHERE user_id = $1', [socket.id]);
  });
});

app.get('/nearby-drivers', (req, res) => {
    // User's geolocation data (should be received from client)
    const userLatitude = parseFloat(req.query.lat);
    const userLongitude = parseFloat(req.query.lng);
  
    // Calculate distances and filter nearby drivers
    const nearbyDrivers = drivers.filter(driver => {
      const distance = calculateDistance(
        userLatitude,
        userLongitude,
        driver.latitude,
        driver.longitude
      );
      return distance <= 1; // 1 km range
    });
  
    res.json({ nearbyDrivers });
  });
  
  // Function to calculate distance between two points using Haversine formula
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  }
    
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }



server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
