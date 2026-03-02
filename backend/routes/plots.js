const express = require('express');
const router = express.Router();
const Plot = require('../models/Plot');

router.get('/land/:landId', async (req, res) => {
  try {
    const plots = await Plot.findAll({ 
      where: { landId: req.params.landId },
      order: [['plotNumber', 'ASC']]
    });
    res.json(plots);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const plot = await Plot.findByPk(req.params.id);
    if (!plot) {
      return res.status(404).json({ message: 'Plot not found' });
    }
    res.json(plot);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const plot = await Plot.create(req.body);
    res.status(201).json(plot);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const plot = await Plot.findByPk(req.params.id);
    if (!plot) {
      return res.status(404).json({ message: 'Plot not found' });
    }
    await plot.update(req.body);
    res.json(plot);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const plot = await Plot.findByPk(req.params.id);
    if (!plot) {
      return res.status(404).json({ message: 'Plot not found' });
    }
    await plot.destroy();
    res.json({ message: 'Plot deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
