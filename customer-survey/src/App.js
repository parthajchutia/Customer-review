import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomeScreen from "./components/WelcomeScreen";
import SurveyQuestion from "./components/SurveyQuestion";
import ThankYouScreen from "./components/ThankYouScreen";
import Nav from "./components/Nav";
import RatingCard from "./components/RatingCard";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [screen, setScreen] = useState("welcome");
  const [responses, setResponses] = useState({});
  const [sessionId, setSessionId] = useState(
    localStorage.getItem("sessionId") || uuidv4()
  );

  useEffect(() => {
    localStorage.setItem("sessionId", sessionId);
  }, [sessionId]);

  const startSurvey = () => setScreen("survey");
  const completeSurvey = () => setScreen("thankYou");

  return (
    <BrowserRouter>
      <Nav />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-900">
        <Routes>
          <Route path="/" element={<WelcomeScreen onStart={startSurvey} />} />
          <Route
            path="/survey"
            element={
              <SurveyQuestion
                onComplete={completeSurvey}
                responses={responses}
                setResponses={setResponses}
                sessionId={sessionId}
              />
            }
          />
          <Route path="/thank-you" element={<ThankYouScreen />} />
          {/* Route for ratings with sessionId and questionId */}          
          <Route path="/ratings" element={<RatingCard />} />
          
          {/* Route with sessionId and questionId as URL parameters (optional) */}
          <Route path="/ratings" element={<RatingCard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
