
const ToursList = require('../Models/TangoToursList');
const Tour = require('../Models/TangoTourDiscription');
const VidvTours = require('../Models/VidvidayTourList');
const ItravelTours = require('../Models/ItravelTiurList');
const ItravelToursDescription = require('../Models/ItravelTourDiscription');
const AdriaticTours = require('../Models/AdriaticTourList');
const AdriaticToursDescription = require('../Models/AdriaticTourDescription');
const AdriaticNoNightTours = require('../Models/AdriaticNoNightTourList');
const AdriaticNoNightToursDescription = require('../Models/AdriaticNoNightTourDescription');
const AdriaticNYearList = require('../Models/AdriaticNYearList');
const AdriaticNYearToursDescription = require('../Models/AdriaticNYearDescription');
// module.exports.CreateStore = async (req, res) => {
//     store.forEach(async (tour) => {
//         let newTour = new ToursList(tour)
//         await newTour.save()
//     })
//     res.status(200).json('Created')
// }



//  оператор tangoTravel ------------------------
module.exports.GetListTours = async (req, res) => {
    let toursList = await ToursList.find()
    res.status(200).json(toursList)

};

module.exports.GetOneTour = async (req, res) => {
    if (req.params.title) {
        let findItem = await Tour.findOne({
            title: req.params.title
        })
        console.log(req.params.title);
        console.log(findItem);
        if (findItem) {
            res.status(200).json(findItem)
        } else {
            res.status(404).json(`Not found item with title ${req.body.title}`)
        }
    } else {
        res.status(500).json("Request dont have title on body")
    }

};

// оператор Adriatic--------------------------
module.exports.AdriaticGetListTours = async (req, res) => {
    let toursList = await AdriaticTours.find()
    res.status(200).json(toursList)

};

module.exports.GetOneTourAdriatic = async (req, res) => {
    if (req.params.title) {
        let findItem = await AdriaticToursDescription.findOne({
            title: req.params.title
        })
        console.log(req.params.title);
        if (findItem) {
            res.status(200).json(findItem)
        } else {
            res.status(404).json(`Not found item with title ${req.body.title}`)
        }
    } else {
        res.status(500).json("Request dont have id on body")
    }
};

// оператор Adriatic------без нічних переїздів--------------------
module.exports.AdriaticGetListNoNightTours = async (req, res) => {
    let toursList = await AdriaticNoNightTours.find()
    res.status(200).json(toursList)

};

module.exports.GetOneTourAdriaticNoNight = async (req, res) => {
    if (req.params.title) {
        let findItem = await AdriaticNoNightToursDescription.findOne({
            title: req.params.title
        })
        console.log(req.params.title);
        if (findItem) {
            res.status(200).json(findItem)
        } else {
            res.status(404).json(`Not found item with title ${req.body.title}`)
        }
    } else {
        res.status(500).json("Request dont have id on body")
    }
};

// оператор Adriatic------новий рік в Європі--------------------
module.exports.AdriaticGetListNewYearTours = async (req, res) => {
    let toursList = await AdriaticNYearList.find()
    res.status(200).json(toursList)

};

module.exports.GetOneTourAdriaticNewYear = async (req, res) => {
    if (req.params.title) {
        let findItem = await AdriaticNYearToursDescription.findOne({
            title: req.params.title
        })
        console.log(req.params.title);
        if (findItem) {
            res.status(200).json(findItem)
        } else {
            res.status(404).json(`Not found item with title ${req.body.title}`)
        }
    } else {
        res.status(500).json("Request dont have id on body")
    }
};


//  оператор ItTravel ------------------------
module.exports.ItravelGetListTours = async (req, res) => {
    let itraveltoursList = await ItravelTours.find()
    res.status(200).json(itraveltoursList)

};

module.exports.GetOneTourItravel = async (req, res) => {
    if (req.params.id) {
        let findItem = await ItravelToursDescription.findOne({
            id: req.params.id
        })
        if (findItem) {
            res.status(200).json(findItem)
        } else {
            res.status(404).json(`Not found item with id ${req.body.id}`)
        }
    } else {
        res.status(500).json("Request dont have id on body")
    }
};


//  оператор vidvidaj ------------------------
module.exports.VidvGetListTours = async (req, res) => {
    let vidvtoursList = await VidvTours.find()
    res.status(200).json(vidvtoursList)

};




// module.exports.GetPageTours = async (req, res) => {
//     // page 3 limit 20  39  59
//     firstItem = (req.query.page * req.query.limit) - req.query.limit - 1
//     firstItem = (firstItem < 0) ? 0 : firstItem
//     let toursList = await ToursList.find()
//         .skip(firstItem)
//         .limit(req.query.limit)
//     if (tourList) {
//         res.status(200).json(toursList)
//     } else {
//         res.status(404).json('Not Found')
//     }
// }

// module.exports.SearchTours = async (req, res) => {
//     let findList = await ToursList.find()
//     let resultsArr = []
//     if (findList) {
//         findList.forEach(tour => {
//             if (tour.title.toLowerCase().indexOf(req.query.search.toLowerCase()) != -1) {
//                 resultsArr.push(tour)
//             }

//         })
//         res.status(200).json(resultsArr)
//     } else {
//         res.status(404).json('Not Found')
//     }
// }