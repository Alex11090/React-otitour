const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ItravelTours = new Schema({
    id: {
        type: Number
    },
    img: {
        type: String,
    },
    title: {
        type: String
    },
    tourDescriptions: [{
        type: String
    }],
    dates: {
        type: String
    },
    // timeTour: {
    //     type: String
    // },
    // freePlaces: {
    //     type: String
    // },
    price: {
        type: String
    },
    date: {
        type: Date
    }

})

module.exports = mongoose.model('itravelList', ItravelTours)