const mongoose = require('mongoose');
const Shema = mongoose.Schema;

const AdriaticTours = new Shema({
    id: {
        type: Number
    },
    title: {
        type: String
    },
    blackCentr: {
        type: String
    },
    dateBlock: {
        type: String
    },
    priceBlock: {
        type: String
    },
    visible: {
        type: String
    },
    date: {
        type: Date
    }
})

module.exports = mongoose.model('adriaticlList', AdriaticTours)