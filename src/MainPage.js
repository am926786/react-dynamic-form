import React from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => {
  return (
    <div>
      <h1>Welcome to the Dynamic Forms</h1>
      <button>
        <Link to="/level1">Level 1 Form</Link>
      </button>
      <button>
        <Link to="/level2">Level 2 Form</Link>
      </button>
      <button>
        <Link to="/level3">Level 3 Form</Link>
      </button>
    </div>
  );
};

export default MainPage;
