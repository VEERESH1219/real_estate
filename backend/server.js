require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');
const cors = require('cors');

const landsRouter = require('./routes/lands');
const plotsRouter = require('./routes/plots');
const plot3dRouter = require('./routes/plot3d');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/lands', landsRouter);
app.use('/api/plots', plotsRouter);
app.use('/api', plot3dRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Real Estate API is running' });
});

const PORT = process.env.PORT || 5000;

sequelize.sync({ force: false })
  .then(() => {
    console.log('Connected to SQLite');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error('SQLite connection error:', err));

module.exports = app;
