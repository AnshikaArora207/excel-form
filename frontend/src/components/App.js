import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FormA from './FormA';
import FormB from './FormB';
import axios from 'axios';
import '../App.css';

const App = () => {
  const [excelLink, setExcelLink] = useState('');

  const handleRefresh = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/forms/refresh');
      alert('Excel sheet updated successfully!');
      setExcelLink(`http://localhost:5000/${response.data.filePath.split('..')[1]}`);
    } catch (error) {
      console.error('Error refreshing Excel sheet:', error);
      alert('Failed to refresh Excel sheet.');
    }
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/form-a">Form A</Link>
            </li>
            <li>
              <Link to="/form-b">Form B</Link>
            </li>
            <li>
              <button onClick={handleRefresh}>Refresh Excel</button>
            </li>
            {/* {excelLink && (
              <li>
                <a href={excelLink} download="users.xlsx">Download Excel</a>
              </li>
            )} */}
          </ul>
        </nav>
        <Routes>
          <Route path="/form-a" element={<FormA />} />
          <Route path="/form-b" element={<FormB />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
