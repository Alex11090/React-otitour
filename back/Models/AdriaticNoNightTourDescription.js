const mongoose = require("mongoose")
const Schema = mongoose.Schema

const AdriaticNoNightTourDescription = new Schema({
    id: {
        type: Number
    },
    // titleTour: {
    //     type: String,
    // },
    tourProgram: {
        type: String
    },
    aboutTour: {
        type: String
    },
    title: {
        type: String
    },
    calendarTour: {
        type: String
    },

    date: {
        type: Date
    }

})

module.exports = mongoose.model("AdriaticNoNightTour-discription", AdriaticNoNightTourDescription)