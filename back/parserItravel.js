// ========================діючий=============================
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const ItravelToursList = require('./Models/ItravelTiurList');
const ItravelTourDescription = require("./Models/ItravelTourDiscription");
const { default: axios } = require("axios");

module.exports = async () => {
    const browser = await puppeteer.launch({ headless: "new", args: ['--no-sandbox'] });// Используем новый безголовый режим
    const page = await browser.newPage();
    const tourDiscr = [];
    const toursItems = [];

    async function scrapePage(url) {
        console.log(`Navigating to ${url}`);
        await page.goto(url);
        await page.waitForSelector(".search-results");
        console.log("Page loaded");

        const html = await page.content();
        const $ = cheerio.load(html);

        $(".search-result-tour").each((i, element) => {
            const img = $(element).find(".search-result-tour .tour_photo img").attr("src");
            const link = "https://www.i-travel.com.ua" + $(element).find(".search-result-tour .tour_info a").attr("href");

            if (!img || !link) {
                console.log(`Skipping tour ${i + 1} due to missing data`);
                return;
            }

            const title = $(element).find(".tour_info .tour-name").text();
            const tourDescriptions = $(element).find(".tour-description").map((index, innerElement) => $(innerElement).html()).get().join('');
            const price = $(element).find(".tour_info .tour-price").text();
            const dates = $(element).next().find(".swiper-slide").text();

            if (!dates) {
                console.log(`Skipping tour ${i + 1} due to missing dates`);
                return;
            }

            toursItems.push({
                id: i + 1,
                img,
                link,
                title,
                tourDescriptions,
                dates,
                price,
            });
            console.log(link);
        });

        console.log(`Loaded ${toursItems.length} tours`);

        console.log("Deleting existing tour data");
        await ItravelToursList.deleteMany();

        for (const tour of toursItems) {
            console.log(`Saving tour: ${tour.title}`);
            let newTour = new ItravelToursList({
                id: tour.id,
                img: tour.img,
                title: tour.title,
                tourDescriptions: tour.tourDescriptions,
                dates: tour.dates,
                price: tour.price,
                date: new Date()
            });

            await newTour.save()
                .then(() => console.log("New tour added"))
                .catch(error => console.error(`Error saving tour: ${error.message}`));
        }

        let id = 1;
        for (const tourItem of toursItems) {
            const link = tourItem.link;
            const getHTML = async (url) => {
                try {
                    const { data } = await axios.get(url);
                    return cheerio.load(data);
                } catch (error) {
                    console.error(`Error fetching HTML for tour ${link}: ${error.message}`);
                    return cheerio.load(""); // Return empty cheerio object to avoid further errors
                }
            };

            const selector = await getHTML(link);
            const title = selector(".headline_content").find(".headline_text h1").text();
            selector(".portfolio").each((i, element) => {
                const infoAccord = selector(element).find(".cmsmasters_toggles").html();
                const tourDates = selector(element).find(".swiper-slide").text();

                selector(element).find(".cmsmasters_project_content").each((i, element) => {
                    const tourPoints = selector(element).find(".cmsmasters_row_outer .cmsmasters_notice").html();
                    const discrTour = selector(element).find(".cmsmasters_tabs").html();

                    tourDiscr.push({
                        id: id,
                        title,
                        infoAccord,
                        tourDates,
                        tourPoints,
                        discrTour,
                    });
                    // console.log(tourPoints);
                    console.log(title);
                });
            });
            id++;
        }

        await ItravelTourDescription.deleteMany();
        for (const tour of tourDiscr) {
            console.log(tour);
            let newTour = new ItravelTourDescription({
                id: tour.id,
                title: tour.title,
                infoAccord: tour.infoAccord,
                tourDates: tour.tourDates,
                tourPoints: tour.tourPoints,
                discrTuor: tour.discrTour,
                date: new Date()
            });

            await newTour.save()
                .then(() => console.log(`New description created: ${tour.tourPoints}`))
                .catch(error => console.error(`Error saving tour description: ${error.message}`));
        }

        await browser.close();
    }

    await scrapePage("https://www.i-travel.com.ua/podbor-tura/?guaranteed=1&datefrom=&dateto=");
};

// ============================Только puppeteer=======================================

// const puppeteer = require("puppeteer");
// const ItravelToursList = require('./Models/ItravelTiurList');
// const ItravelTourDescription = require("./Models/ItravelTourDiscription");

// module.exports = async () => {
//     const browser = await puppeteer.launch({ headless: "new", args: ['--no-sandbox'] }); // Используем новый безголовый режим
//     const page = await browser.newPage();
//     const tourDiscr = [];
//     const toursItems = [];

//     async function scrapePage(url) {
//         console.log(`Переход на ${url}`);
//         await page.goto(url);
//         await page.waitForSelector(".search-results");
//         console.log("Страница загружена");

//         const tours = await page.evaluate(() => {
//             return Array.from(document.querySelectorAll(".search-result-tour")).map((element, i) => {
//                 const img = element.querySelector(".tour_photo img")?.src;
//                 const link = "https://www.i-travel.com.ua" + element.querySelector(".tour_info a")?.href;
//                 if (!img || !link) return null;

//                 const title = element.querySelector(".tour_info .tour-name")?.textContent.trim();
//                 const tourDescriptions = Array.from(element.querySelectorAll(".tour-description"))
//                     .map(innerElement => innerElement.innerHTML)
//                     .join('');
//                 const price = element.querySelector(".tour_info .tour-price")?.textContent.trim();
//                 const dates = element.nextElementSibling.querySelector(".swiper-slide")?.textContent.trim();
//                 if (!dates) return null;

//                 return {
//                     id: i + 1,
//                     img,
//                     link,
//                     title,
//                     tourDescriptions,
//                     dates,
//                     price,
//                 };
//             }).filter(tour => tour !== null);
//         });

//         console.log(`Загружено ${tours.length} туров`);

//         console.log("Удаление существующих данных о турах");
//         await ItravelToursList.deleteMany();

//         for (const tour of tours) {
//             console.log(`Сохранение тура: ${tour.title}`);
//             let newTour = new ItravelToursList({
//                 id: tour.id,
//                 img: tour.img,
//                 title: tour.title,
//                 tourDescriptions: tour.tourDescriptions,
//                 dates: tour.dates,
//                 price: tour.price,
//                 date: new Date()
//             });

//             await newTour.save()
//                 .then(() => console.log("Добавлен новый тур"))
//                 .catch(error => console.error(`Ошибка при сохранении тура: ${error.message}`));
//         }

//         for (const tourItem of tours) {
//             await page.goto(tourItem.link);
//             const title = await page.evaluate(() => document.querySelector(".headline_text h1")?.textContent.trim());
//             const portfolios = await page.evaluate(() => {
//                 return Array.from(document.querySelectorAll(".portfolio")).map(portfolio => {
//                     const infoAccord = portfolio.querySelector(".cmsmasters_toggles")?.innerHTML;
//                     const tourDates = portfolio.querySelector(".swiper-slide")?.textContent.trim();

//                     return Array.from(portfolio.querySelectorAll(".cmsmasters_project_content")).map(innerElement => {
//                         const tourPoints = innerElement.querySelector(".cmsmasters_row_outer .cmsmasters_notice")?.innerHTML;
//                         const discrTour = innerElement.querySelector(".cmsmasters_tabs")?.innerHTML;

//                         return {
//                             infoAccord,
//                             tourDates,
//                             tourPoints,
//                             discrTour,
//                         };
//                     });
//                 }).flat();
//             });

//             for (const portfolio of portfolios) {
//                 tourDiscr.push({
//                     id: tourItem.id,
//                     title,
//                     ...portfolio,
//                 });
//             }
//         }

//         await ItravelTourDescription.deleteMany();
//         for (const tour of tourDiscr) {
//             console.log(tour);
//             let newTour = new ItravelTourDescription({
//                 id: tour.id,
//                 title: tour.title,
//                 infoAccord: tour.infoAccord,
//                 tourDates: tour.tourDates,
//                 tourPoints: tour.tourPoints,
//                 discrTour: tour.discrTour,
//                 date: new Date()
//             });

//             await newTour.save()
//                 .then(() => console.log(`Создано новое описание: ${tour.tourPoints}`))
//                 .catch(error => console.error(`Ошибка при сохранении описания тура: ${error.message}`));
//         }

//         await browser.close();
//     }

//     await scrapePage("https://www.i-travel.com.ua/podbor-tura/?guaranteed=1&datefrom=&dateto=");
// };


