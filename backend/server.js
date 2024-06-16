const express = require('express');
const sequelize = require('./database');
const bodyParser = require('body-parser');
const cors = require('cors');
const formRoutes = require('./routes/forms');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/forms', formRoutes);
app.use(express.static(path.join(__dirname)));

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
