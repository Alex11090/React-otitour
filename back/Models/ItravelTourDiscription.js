const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ItravelTourDescription = new Schema({
    id: {
        type: Number
    },
    title: {
        type: String,
    },
    infoAccord: {
        type: String
    },
    tourDates: {
        type: String
    },
    dayList: {
        type: [String],
    },
    tourPoints: {
        type: String
    },
    discrTuor: {
        type: String
    },
    discrTable: [{
        type: String
    }],
    date: {
        type: Date
    }

})

module.exports = mongoose.model("ItravelTour-discription", ItravelTourDescription)