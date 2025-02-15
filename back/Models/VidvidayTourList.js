const mongoose = require('mongoose')
const Schema = mongoose.Schema

const VidvTours = new Schema({
    id: {
        type: String,
    },
    img: {
        type: String,
    },
    title: {
        type: String
    },
    timeTour: {
        type: String
    },
    timeNights: {
        type: String
    },
    freePlaces: {
        type: String
    },
    prise: {
        type: Number
    },
    date: {
        type: Date
    }
})

module.exports = mongoose.model('VidvTours', VidvTours)