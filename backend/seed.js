const sequelize = require('./database');
const Country = require('./models/country');

const populateCountries = async () => {
  try {
    await sequelize.sync();
    await Country.bulkCreate([
      { countryCode: 'US', countryName: 'United States' },
      { countryCode: 'CA', countryName: 'Canada' },
      { countryCode: 'GB', countryName: 'United Kingdom' },
    ]);
    console.log('Countries seeded successfully.');
  } catch (error) {
    console.error('Error seeding countries:', error);
  } finally {
    await sequelize.close();
  }
};

populateCountries();
