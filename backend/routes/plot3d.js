const express = require('express');
const router = express.Router();
const Plot3D = require('../models/Plot3D');

router.get('/plot/:plotId', async (req, res) => {
  try {
    const plot3d = await Plot3D.findOne({ where: { plotId: req.params.plotId } });
    if (!plot3d) {
      return res.status(404).json({ message: '3D model not found' });
    }
    res.json(plot3d);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const plot3d = await Plot3D.create(req.body);
    res.status(201).json(plot3d);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const plot3d = await Plot3D.findByPk(req.params.id);
    if (!plot3d) {
      return res.status(404).json({ message: '3D model not found' });
    }
    await plot3d.update(req.body);
    res.json(plot3d);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
