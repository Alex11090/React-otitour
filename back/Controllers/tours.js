
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

// module.exports.ItravelGetListTours = async (req, res) => {
//     let itraveltoursList = await ItravelTours.find();

//     // Функция для извлечения текста внутри любых кавычек
//     const extractQuotedText = (title) => {
//         const match = title.match(/["“”«»„‚‘’](.+?)["“”«»„‚‘’]/);
//         return match ? match[1] : title; // Если нашли кавычки — берём текст внутри, иначе оставляем весь title
//     };

//     // Извлекаем текст в кавычках из каждого названия
//     const extractedTitles = itraveltoursList.map(tour => extractQuotedText(tour.title));

//     console.log('Извлеченные названия туров:', extractedTitles);

//     res.status(200).json(itraveltoursList);
// };



// module.exports.GetOneTourItravel = async (req, res) => {
//     if (req.params.title) {
//         let findItem = await ItravelToursDescription.findOne({
//             title: req.params.title
//         })
//         if (findItem) {
//             res.status(200).json(findItem)
//         } else {
//             res.status(404).json(`Not found item with id ${req.body.title}`)
//         }
//     } else {
//         res.status(500).json("Request dont have id on body")
//     }
// };

// ---------робочий але повільний----------------
// const normalizeWords = (text) => text
//     .toLowerCase()
//     .replace(/[^a-zа-яёіїєґ0-9]+/gi, " ") // Оставляем только буквы и цифры
//     .trim();

// module.exports.GetOneTourItravel = async (req, res) => {
//     if (!req.params.title) {
//         return res.status(500).json("Request doesn't have title in params");
//     }

//     // Функция для извлечения текста внутри любых кавычек
//     const extractQuotedText = (title) => {
//         const match = title.match(/["“”«»„‚‘’](.+?)["“”«»„‚‘’]/);
//         return match ? match[1] : title;
//     };

//     const searchTitle = normalizeWords(extractQuotedText(req.params.title));
//     const searchWords = searchTitle.split(" ");
//     console.log(`Ищем тур с названием (по словам): ${searchTitle}`);

//     let tours = await ItravelToursDescription.find().lean();

//     // Фильтруем туры по количеству совпавших слов
//     let findItem = tours.find(tour => {
//         const tourTitle = normalizeWords(tour.title);
//         const tourWords = tourTitle.split(" ");

//         // Считаем, сколько слов совпадает
//         const matchCount = searchWords.filter(word => tourWords.includes(word)).length;

//         // Должно совпадать не менее 70% слов
//         return matchCount / searchWords.length >= 0.95;
//     });

//     if (findItem) {
//         res.status(200).json(findItem);
//     } else {
//         console.log(`Тур с названием "${searchTitle}" не найден`);
//         res.status(404).json(`Not found item with title ${searchTitle}`);
//     }
// };


// -------------робочий швидкий без індекса, не всі тури відображає----------
// const normalizeWords = (text) => text
//     .toLowerCase()
//     .replace(/[^a-zа-яёіїєґ0-9]+/gi, " ") // Оставляем только буквы и цифры
//     .trim();

// module.exports.GetOneTourItravel = async (req, res) => {
//     if (!req.params.title) {
//         return res.status(500).json("Request doesn't have title in params");
//     }

//     // Функция для извлечения текста внутри любых кавычек
//     const extractQuotedText = (title) => {
//         const match = title.match(/["“”«»„‚‘’](.+?)["“”«»„‚‘’]/);
//         return match ? match[1] : title;
//     };

//     const searchTitle = normalizeWords(extractQuotedText(req.params.title));
//     const searchWords = searchTitle.split(" ");
//     console.log(`Ищем тур с названием (по словам): ${searchTitle}`);

//     try {
//         // Используем регулярные выражения для фильтрации туров на уровне базы данных
//         const findItem = await ItravelToursDescription.find({
//             title: { $regex: `.*${searchWords.join(".*")}.*`, $options: "i" } // Регистронезависимый поиск с использованием всех слов
//         }).lean();

//         if (findItem.length > 0) {
//             // Фильтруем результаты на уровне JavaScript, если нужно (можно убрать, если этого достаточно)
//             const matchItem = findItem.find(tour => {
//                 const tourTitle = normalizeWords(tour.title);
//                 const tourWords = tourTitle.split(" ");
//                 const matchCount = searchWords.filter(word => tourWords.includes(word)).length;
//                 return matchCount / searchWords.length >= 0.85; // Если совпало не менее 70% слов
//             });

//             if (matchItem) {
//                 res.status(200).json(matchItem);
//             } else {
//                 console.log(`Тур с названием "${searchTitle}" не найден`);
//                 res.status(404).json(`Not found item with title ${searchTitle}`);
//             }
//         } else {
//             console.log(`Тур с названием "${searchTitle}" не найден`);
//             res.status(404).json(`Not found item with title ${searchTitle}`);
//         }
//     } catch (error) {
//         console.error("Ошибка поиска:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };

const normalizeWords = (text) => text
    .toLowerCase()
    .replace(/[^a-zа-яёіїєґ0-9\s]+/gi, " ") // Оставляем только буквы и цифры
    .replace(/\s+/g, ' ') // Убираем множественные пробелы
    .trim();

module.exports.GetOneTourItravel = async (req, res) => {
    if (!req.params.title) {
        return res.status(500).json("Request doesn't have title in params");
    }

    const extractQuotedText = (title) => {
        const match = title.match(/["“”«»„‚‘’](.+?)["“”«»„‚‘’]/);
        return match ? match[1] : title;
    };

    const searchTitle = normalizeWords(extractQuotedText(req.params.title));
    console.log(`Ищем тур с названием (по словам): ${searchTitle}`);

    try {
        // Используем текстовый поиск в MongoDB
        const findItem = await ItravelToursDescription.find({
            $text: { $search: searchTitle }
        }).lean();

        if (findItem.length > 0) {
            // Дополнительная фильтрация на основе процентного совпадения
            const searchWords = searchTitle.split(" ");

            const bestMatch = findItem.reduce((best, tour) => {
                const tourTitle = normalizeWords(tour.title);
                const tourWords = tourTitle.split(" ");
                const matchCount = searchWords.filter(word => tourWords.includes(word)).length;

                const matchPercentage = matchCount / searchWords.length;

                // Если совпадений больше, чем у текущего best, обновляем best
                if (matchPercentage > best.matchPercentage) {
                    return { matchPercentage, tour };
                }

                return best;
            }, { matchPercentage: 0, tour: null });

            if (bestMatch.tour && bestMatch.matchPercentage >= 0.66) {
                res.status(200).json(bestMatch.tour);
            } else {
                console.log(`Тур с названием "${searchTitle}" не найден или совпадение недостаточно высокое`);
                res.status(404).json(`Not found item with title ${searchTitle}`);
            }
        } else {
            console.log(`Тур с названием "${searchTitle}" не найден`);
            res.status(404).json(`Not found item with title ${searchTitle}`);
        }
    } catch (error) {
        console.error("Ошибка поиска:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};



// -------------------------------------------------------------------------


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