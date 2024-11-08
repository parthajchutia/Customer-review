import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ThankYouScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate('/'), 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md">
      <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
      <p>We appreciate your feedback. Redirecting to the welcome screen...</p>
    </div>
  );
};

export default ThankYouScreen;
