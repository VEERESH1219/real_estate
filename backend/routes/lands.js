const express = require('express');
const router = express.Router();
const Land = require('../models/Land');

router.get('/', async (req, res) => {
  try {
    const lands = await Land.findAll({ order: [['createdAt', 'DESC']] });
    res.json(lands);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const land = await Land.findByPk(req.params.id);
    if (!land) {
      return res.status(404).json({ message: 'Land not found' });
    }
    res.json(land);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const land = await Land.create(req.body);
    res.status(201).json(land);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const land = await Land.findByPk(req.params.id);
    if (!land) {
      return res.status(404).json({ message: 'Land not found' });
    }
    await land.update(req.body);
    res.json(land);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const land = await Land.findByPk(req.params.id);
    if (!land) {
      return res.status(404).json({ message: 'Land not found' });
    }
    await land.destroy();
    res.json({ message: 'Land deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
