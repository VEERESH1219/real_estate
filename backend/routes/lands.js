const express = require('express');
const router = express.Router();
const Land = require('../models/Land');

router.get('/', async (req, res) => {
  try {
    const lands = await Land.find().sort({ createdAt: -1 });
    res.json(lands);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const land = await Land.findById(req.params.id);
    if (!land) {
      return res.status(404).json({ message: 'Land not found' });
    }
    res.json(land);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const land = new Land(req.body);
  try {
    const newLand = await land.save();
    res.status(201).json(newLand);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const land = await Land.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(land);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Land.findByIdAndDelete(req.params.id);
    res.json({ message: 'Land deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
