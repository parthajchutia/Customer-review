const express = require('express');
const router = express.Router();
const { createSurveyResponse, getSurveyRatings } = require('../controller/surveyController');

router.post('/', createSurveyResponse);
router.get('/ratings', getSurveyRatings);


module.exports = router;
