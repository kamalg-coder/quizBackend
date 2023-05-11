const express = require('express');
const { LeaderModal } = require('../model/leaderboard.model');
const { authenticate } = require('../middleware/Authentication.middleware');
const leaderRouter = express.Router();


leaderRouter.post('/leaderboard', authenticate , async (req, res) => {
    try {
        const quiz = new LeaderModal(req.body);
        await quiz.save();
        res.status(201).send(quiz);
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while creating the quiz.' });
    }
});


leaderRouter.get('/leaderboard', async (req, res) => {
    try {
        const leader = await LeaderModal.find();
        res.status(200).send(leader);
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while retrieving the quizzes.' });
    }
});

module.exports={leaderRouter}