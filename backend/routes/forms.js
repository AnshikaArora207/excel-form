const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Country = require('../models/country');
const XLSX = require('xlsx');
const path = require('path');

router.get('/countries', async (req, res) => {
  try {
    const countries = await Country.findAll();
    res.json(countries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/submit', async (req, res) => {
  const { formType, name, countryCode, phoneNumber } = req.body;

  try {
    const newUser = await User.create({
      formType,
      name,
      countryCode,
      phoneNumber,
    });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/refresh', async (req, res) => {
  try {
    const users = await User.findAll();
    const data = users.map(user => ({
      FormType: user.formType,
      Name: user.name,
      CountryCode: user.countryCode,
      PhoneNumber: user.phoneNumber,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');

    const filePath = path.join(__dirname, '..', 'users.xlsx');
    XLSX.writeFile(workbook, filePath);

    res.json({ message: 'Excel sheet updated successfully', filePath });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
