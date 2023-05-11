const mongoose = require('mongoose')

const leaderSchema = mongoose.Schema({
    email: String,
    score: String,
},
    {
        versionKey: false
    }
)

const LeaderModal = mongoose.model('leader', leaderSchema)

module.exports = { LeaderModal }