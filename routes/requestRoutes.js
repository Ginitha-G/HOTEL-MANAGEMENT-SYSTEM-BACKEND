const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all requests
router.get('/requests', (req, res) => {
  const query = 'SELECT * FROM requests';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Create a new request
router.post('/requests', (req, res) => {
  const { roomNumber, guestName, phoneNumber, serviceType } = req.body;
  const query = 'INSERT INTO requests (roomNumber, guestName, phoneNumber, serviceType) VALUES (?, ?, ?, ?)';
  db.query(query, [roomNumber, guestName, phoneNumber, serviceType], (err, result) => {
    if (err) throw err;
    res.status(201).json({ message: 'Request created', id: result.insertId });
  });
});

// Update request status
router.put('/requests/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const query = 'UPDATE requests SET status = ? WHERE id = ?';
  db.query(query, [status, id], (err) => {
    if (err) throw err;
    res.json({ message: 'Status updated' });
  });
});

module.exports = router;
