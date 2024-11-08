import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const questions = [
  { id: 'q1', text: 'How satisfied are you with our products?', type: 'rating', max: 5 },
  { id: 'q2', text: 'How fair are the prices compared to similar retailers?', type: 'rating', max: 5 },
  { id: 'q3', text: 'How satisfied are you with the value for money?', type: 'rating', max: 5 },
  { id: 'q4', text: 'How likely are you to recommend us?', type: 'rating', max: 10 },
  { id: 'q5', text: 'What could we do to improve our service?', type: 'text' },
];

const SurveyQuestion = ({ onComplete, sessionId }) => {
  const [index, setIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const navigate = useNavigate();

  const currentQuestion = questions[index];

  // Submit answers when survey completes
  const handleAnswerSubmit = async () => {
    const questions = Object.keys(responses).map((questionId) => ({
      questionId,
      answer: responses[questionId],
    }));

    try {
      const response = await axios.post('http://localhost:5000/api/surveys', {
        sessionId,
        questions,
      });

      if (response.status === 201) {
        onComplete();
        navigate('/thank-you');
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
      alert('Error submitting answer. Please try again later.');
    }
  };

  const handleNext = () => {
    if (index < questions.length - 1) {
      setIndex(index + 1);
    } else {
      handleAnswerSubmit();
    }
  };

  const handlePrevious = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const handleSkip = () => {
    if (index < questions.length - 1) {
      setIndex(index + 1);
    } else {
      handleAnswerSubmit();
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md border-2 border-blue-200">
      <div className="mb-4 text-gray-800 font-semibold">
        Question {index + 1}/{questions.length}: {currentQuestion.text}
      </div>

      {currentQuestion.type === 'rating' ? (
        <div className="flex flex-col items-center mb-4">
          <div className="flex items-center mb-2">
            {Array.from({ length: currentQuestion.max }, (_, i) => (
              <button
                key={i}
                onClick={() => setResponses((prev) => ({ ...prev, [currentQuestion.id]: i + 1 }))}
                className={`w-8 h-8 rounded-full transition-transform transform duration-200 cursor-pointer m-1 ${
                  i + 1 <= responses[currentQuestion.id] ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                } hover:scale-110`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <p className="mt-2 text-gray-700 text-lg">
            Your rating: <span className="font-bold text-blue-600">{responses[currentQuestion.id]}</span>
          </p>
        </div>
      ) : (
        <textarea
          value={responses[currentQuestion.id] || ''}
          onChange={(e) => setResponses((prev) => ({ ...prev, [currentQuestion.id]: e.target.value }))}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      )}

      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevious}
          className="bg-gray-300 text-gray-600 px-4 py-2 rounded-md transition duration-200 hover:bg-gray-400"
          disabled={index === 0}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="bg-blue-500 text-white px-4 py-2 rounded-md transition duration-200 hover:bg-blue-600"
        >
          {index === questions.length - 1 ? 'Submit' : 'Next'}
        </button>
        <button
          onClick={handleSkip}
          className="bg-gray-300 text-gray-600 px-4 py-2 rounded-md transition duration-200 hover:bg-gray-400"
          disabled={index === questions.length - 1}
        >
          Skip
        </button>
      </div>
    </div>
  );
};

export default SurveyQuestion;
