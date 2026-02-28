const express = require('express');
const router = express.Router();
const Plot3D = require('../models/Plot3D');

router.get('/plot/:plotId', async (req, res) => {
  try {
    const plot3d = await Plot3D.findOne({ plotId: req.params.plotId });
    if (!plot3d) {
      return res.status(404).json({ message: '3D model not found' });
    }
    res.json(plot3d);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const plot3d = new Plot3D(req.body);
  try {
    const newPlot3d = await plot3d.save();
    res.status(201).json(newPlot3d);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const plot3d = await Plot3D.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(plot3d);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
