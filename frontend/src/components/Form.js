import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Form = ({ formType }) => {
  const [name, setName] = useState(localStorage.getItem('name') || '');
  const [countryCode, setCountryCode] = useState(localStorage.getItem('countryCode') || '');
  const [phoneNumber, setPhoneNumber] = useState(localStorage.getItem('phoneNumber') || '');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/forms/countries')
      .then(response => setCountries(response.data))
      .catch(error => console.error('Error fetching country codes:', error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = { formType, name, countryCode, phoneNumber };

    try {
      await axios.post('http://localhost:5000/api/forms/submit', formData);
      alert('Form submitted successfully!');

      localStorage.setItem('name', name);
      localStorage.setItem('countryCode', countryCode);
      localStorage.setItem('phoneNumber', phoneNumber);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form.');
    }
  };

  return (
    <div>
      <h2>{formType}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            pattern="^[A-Za-z]+$"
          />
        </div>
        <div>
          <label>Country Code:</label>
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            required
          >
            <option value="">Select a country</option>
            {countries.map((country) => (
              <option key={country.id} value={country.countryCode}>
                {country.countryName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            pattern="^[0-9]+$"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
