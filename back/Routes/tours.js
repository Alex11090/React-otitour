const express = require('express')
const Router = express.Router()
const controllers = require('../Controllers/tours')

// Router.get('/test', (req, res) => {
//     res.status(200).json({
//         message: "Test"
//     })
// })
// Router.get('/create-store',controllers.CreateStore )
Router.get('/get-list', controllers.GetListTours);
Router.get('/vidvget-list', controllers.VidvGetListTours);
Router.get('/itravelget-list', controllers.ItravelGetListTours);
Router.get('/adriaticget-list', controllers.AdriaticGetListTours);
Router.get('/adriaticnonightget-list', controllers.AdriaticGetListNoNightTours);
Router.get('/adriaticnewyearget-list', controllers.AdriaticGetListNewYearTours);
Router.post('/get-adriaticnewyear/:title', controllers.GetOneTourAdriaticNewYear);
Router.post('/get-itemadriaticnonight/:title', controllers.GetOneTourAdriaticNoNight);
Router.post('/get-itemadriatic/:title', controllers.GetOneTourAdriatic);
Router.post('/get-itemitravel/:id', controllers.GetOneTourItravel);
Router.post('/get-item/:title', controllers.GetOneTour);
// Router.get('/get-page', controllers.GetPageTours)

// Router.get('/search', controllers.SearchTours)
//Router.get('/filter-price', controllers.FilterPriceList)

module.exports = Router