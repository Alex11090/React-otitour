const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TangoTours = new Schema({
    id: {
        type: Number
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
    freePlaces: {
        type: String
    },
    price: {
        type: Number
    },
    date: {
        type: Date
    }

})

module.exports = mongoose.model('TangoTours', TangoTours)