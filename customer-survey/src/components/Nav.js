import React from 'react';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/ratings'); 
  };

  return (
    <nav className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 p-6 shadow-lg flex justify-between items-center">
      <h1 className="text-white text-4xl font-bold tracking-wide">
        Customer Ratings
      </h1>
      <button
        onClick={handleRedirect}
        className="bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-100 transition duration-200"
      >
        View All Ratings
      </button>
    </nav>
  );
};

export default Nav;
