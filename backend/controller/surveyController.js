const Survey = require('../model/Response'); 

const createSurveyResponse = async (req, res) => {
    try {
        const { sessionId, questions } = req.body;

        
        if (!sessionId || !Array.isArray(questions)) {
            return res.status(400).json({ error: 'Invalid request body' });
        }

        // Process each question and answer individually to ensure proper storage
        const responses = questions.map((q) => ({
            sessionId,
            questionId: q.questionId,
            answer: q.answer,
            status: 'IN_PROGRESS'
        }));

        // Save responses to the database
        const savedResponses = await Survey.insertMany(responses);

        res.status(201).json({ message: 'Survey responses saved successfully', survey: savedResponses });
    } catch (error) {
        console.error('Error saving survey responses:', error);
        res.status(500).json({ error: 'Failed to save survey responses' });
    }
};


const getSurveyRatings = async (req, res) => {
    try {
        // Fetch all survey responses without filtering by sessionId or questionId
        const surveyResponses = await Survey.find();

        if (surveyResponses.length === 0) {
            return res.status(404).json({ error: 'No survey responses found' });
        }

        // Map results to only include questionId and answer
        const formattedResponses = surveyResponses.map(response => ({
            questionId: response.questionId,
            answer: response.answer,
        }));

        res.status(200).json({
            message: 'Survey responses retrieved successfully',
            survey: formattedResponses
        });
    } catch (error) {
        console.error('Error fetching survey responses:', error);
        res.status(500).json({ error: 'Failed to fetch survey responses' });
    }
};



module.exports = { createSurveyResponse, getSurveyRatings};
