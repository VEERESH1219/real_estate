const express = require('express');
const router = express.Router();
const Plot = require('../models/Plot');

router.get('/land/:landId', async (req, res) => {
  try {
    const plots = await Plot.find({ landId: req.params.landId }).sort({ plotNumber: 1 });
    res.json(plots);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const plot = await Plot.findById(req.params.id);
    if (!plot) {
      return res.status(404).json({ message: 'Plot not found' });
    }
    res.json(plot);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const plot = new Plot(req.body);
  try {
    const newPlot = await plot.save();
    res.status(201).json(newPlot);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const plot = await Plot.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(plot);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Plot.findByIdAndDelete(req.params.id);
    res.json({ message: 'Plot deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
