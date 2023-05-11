const express = require('express');
const { QuizModal } = require('../model/quiz.model');
const { authenticate } = require('../middleware/Authentication.middleware');
const quizRouter = express.Router();


quizRouter.post('/quizes', authenticate,async (req, res) => {
  try {
    const quiz = new QuizModal(req.body);
    await quiz.save();
    res.status(201).send(quiz);
  } catch (error) {
    res.status(500).send({ error: 'An error occurred while creating the quiz.' });
  }
});


quizRouter.get('/quizes', async (req, res) => {
  try {
    const quizzes = await QuizModal.find();
    res.status(200).send(quizzes);
  } catch (error) {
    res.status(500).send({ error: 'An error occurred while retrieving the quizzes.' });
  }
});

quizRouter.get('/quizes/:id', async (req, res) => {
  try {
    const quiz = await QuizModal.findById(req.params.id);
    if (!quiz) {
      return res.status(404).send({ error: 'Quiz not found.' });
    }
    res.status(200).send(quiz);
  } catch (error) {
    res.status(500).send({ error: 'An error occurred while retrieving the quiz.' });
  }
});

quizRouter.put('/quizes/:id',authenticate, async (req, res) => {
  try {
    const quiz = await QuizModal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!quiz) {
      return res.status(404).send({ error: 'Quiz not found.' });
    }
    res.status(200).send(quiz);
  } catch (error) {
    res.status(500).send({ error: 'An error occurred while updating the quiz.' });
  }
});


quizRouter.delete('/quizes/:id', authenticate,async (req, res) => {
  try {
    const quiz = await QuizModal.findByIdAndDelete(req.params.id);
    if (!quiz) {
      return res.status(404).send({ error: 'Quiz not found.' });
    }
    res.status(200).send({ message: 'Quiz deleted successfully.' });
  } catch (error) {
    res.status(500).send({ error: 'An error occurred while deleting the quiz.' });
  }
});

module.exports = {quizRouter};