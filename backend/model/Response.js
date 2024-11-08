
const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  sessionId: { type: String, required: true },
  questionId: { type: String, required: true },
  answer: { type: mongoose.Schema.Types.Mixed, required: true },
  status: { type: String, default: 'IN_PROGRESS' }
});

const Survey = mongoose.model('Survey', responseSchema);
module.exports = Survey;
