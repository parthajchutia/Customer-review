import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomeScreen = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    // Navigate to the survey page
    navigate('/survey');
  };

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Survey</h1>
      <button
        onClick={handleStart}
        className="bg-blue-500 text-white px-6 py-2 rounded mt-4"
      >
        Start
      </button>
    </div>
  );
};

export default WelcomeScreen;
