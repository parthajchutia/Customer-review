// RatingCard.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const RatingCard = () => {
  const { sessionId, questionId } = useParams();
  const [responses, setResponses] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        let response;
        if (sessionId && questionId) {
          response = await axios.get(`http://localhost:5000/api/surveys/ratings`);
        } else {
          response = await axios.get(`http://localhost:5000/api/surveys/ratings`);
        }

        if (response.data && response.data.survey) {
          setResponses(Array.isArray(response.data.survey) ? response.data.survey : [response.data.survey]);
        } else {
          setError("No survey responses found.");
        }
      } catch (err) {
        console.error("Error fetching ratings:", err);
        setError("Failed to load ratings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, [sessionId, questionId]);

  const getBackgroundColor = (index) => {
    const colors = ["bg-red-200", "bg-green-200", "bg-blue-200", "bg-yellow-200", "bg-purple-200"];
    return colors[index % colors.length];
  };

  const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  const responseChunks = chunkArray(responses, 5);

  return (
    <div className="flex flex-wrap gap-4">
      <h3 className="w-full text-xl font-semibold mb-4">Survey Ratings</h3>
      {responseChunks.map((chunk, chunkIndex) => (
        <div
          key={chunkIndex}
          className={`w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 rounded-lg shadow-md ${getBackgroundColor(chunkIndex)}`}
        >
          {chunk.map((response, index) => (
            <div key={index} className="border-b border-gray-300 py-2 last:border-none">
              <p>Session ID: {response.sessionId || "N/A"}</p>
              <p>Question ID: {response.questionId || "N/A"}</p>
              <p>Your Rating: {response.answer}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default RatingCard;
