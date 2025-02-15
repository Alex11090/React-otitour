const mongoose = require("mongoose")
const Schema = mongoose.Schema

const TangoTourDiscr = new Schema({
    id: {
        type: Number
    },
    title: {
        type: String,
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

module.exports = mongoose.model("TangoTour-discription", TangoTourDiscr)