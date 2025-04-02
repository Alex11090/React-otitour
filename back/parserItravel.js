// ========================діючий=============================
// const puppeteer = require("puppeteer");
// const cheerio = require("cheerio");
// const ItravelToursList = require('./Models/ItravelTiurList');
// const ItravelTourDescription = require("./Models/ItravelTourDiscription");
// const { default: axios } = require("axios");

// module.exports = async () => {
//     const browser = await puppeteer.launch({ headless: "new", args: ['--no-sandbox'] });// Используем новый безголовый режим
//     const page = await browser.newPage();
//     const tourDiscr = [];
//     const toursItems = [];

//     async function scrapePage(url) {
//         console.log(`Navigating to ${url}`);
//         await page.goto(url);
//         await page.waitForSelector(".search-results");
//         console.log("Page loaded");

//         const html = await page.content();
//         const $ = cheerio.load(html);

//         $(".search-result-tour").each((i, element) => {
//             const img = $(element).find(".search-result-tour .tour_photo img").attr("src");
//             const link = "https://www.i-travel.com.ua" + $(element).find(".search-result-tour .tour_info a").attr("href");

//             if (!img || !link) {
//                 console.log(`Skipping tour ${i + 1} due to missing data`);
//                 return;
//             }

//             const title = $(element).find(".tour_info .tour-name").text();
//             const tourDescriptions = $(element).find(".tour-description").map((index, innerElement) => $(innerElement).html()).get().join('');
//             const price = $(element).find(".tour_info .tour-price").text();
//             const dates = $(element).next().find(".swiper-slide").text();

//             if (!dates) {
//                 console.log(`Skipping tour ${i + 1} due to missing dates`);
//                 return;
//             }

//             toursItems.push({
//                 id: i + 1,
//                 img,
//                 link,
//                 title,
//                 tourDescriptions,
//                 dates,
//                 price,
//             });
//             console.log(link);
//         });

//         console.log(`Loaded ${toursItems.length} tours`);

//         console.log("Deleting existing tour data");
//         await ItravelToursList.deleteMany();

//         for (const tour of toursItems) {
//             console.log(`Saving tour: ${tour.title}`);
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
//                 .then(() => console.log("New tour added"))
//                 .catch(error => console.error(`Error saving tour: ${error.message}`));
//         }

//         let id = 1;
//         for (const tourItem of toursItems) {
//             const link = tourItem.link;
//             const getHTML = async (url) => {
//                 try {
//                     const { data } = await axios.get(url);
//                     return cheerio.load(data);
//                 } catch (error) {
//                     console.error(`Error fetching HTML for tour ${link}: ${error.message}`);
//                     return cheerio.load(""); // Return empty cheerio object to avoid further errors
//                 }
//             };

//             const selector = await getHTML(link);
//             const title = selector(".headline_content").find(".headline_text h1").text();
//             selector(".portfolio").each((i, element) => {
//                 const infoAccord = selector(element).find(".cmsmasters_toggles").html();
//                 const tourDates = selector(element).find(".swiper-slide").text();

//                 selector(element).find(".cmsmasters_project_content").each((i, element) => {
//                     const tourPoints = selector(element).find(".cmsmasters_row_outer .cmsmasters_notice").html();
//                     const discrTour = selector(element).find(".cmsmasters_tabs").html();

//                     tourDiscr.push({
//                         id: id,
//                         title,
//                         infoAccord,
//                         tourDates,
//                         tourPoints,
//                         discrTour,
//                     });
//                     // console.log(tourPoints);
//                     console.log(title);
//                 });
//             });
//             id++;
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
//                 discrTuor: tour.discrTour,
//                 date: new Date()
//             });

//             await newTour.save()
//                 .then(() => console.log(`New description created: ${tour.tourPoints}`))
//                 .catch(error => console.error(`Error saving tour description: ${error.message}`));
//         }

//         await browser.close();
//     }

//     await scrapePage("https://www.i-travel.com.ua/podbor-tura/?guaranteed=1&datefrom=&dateto=");
// };



// ---------------------------- проходить пагінацію----------------------------------------------------------
// Подключаем необходимые модули
const puppeteer = require("puppeteer"); // Для работы с браузером через Puppeteer
const cheerio = require("cheerio"); // Для парсинга HTML
const ItravelToursList = require('./Models/ItravelTiurList'); // Модель для сохранения туров в базу
const ItravelTourDescription = require("./Models/ItravelTourDiscription"); // Модель для описаний туров
const { default: axios } = require("axios"); // Для отправки HTTP-запросов и получения HTML с описаниями туров

module.exports = async () => {
    // Запуск браузера с использованием Puppeteer
    const browser = await puppeteer.launch({ headless: "new", args: ['--no-sandbox'] }); // Запускаем браузер без графического интерфейса
    const page = await browser.newPage(); // Создаем новую страницу для работы с браузером
    // Массивы для хранения данных
    const toursItems = []; // Массив для самих туров
    const tourDiscr = []; // Массив для описаний туров


    let globalID = 1;  // Глобальный ID для туров (инициализируем с 1)

    // Функция для парсинга данных с одной страницы
    async function scrapePage(url) {


        console.log(`Navigating to ${url}`); // Выводим URL, по которому идем
        await page.goto(url); // Переходим на указанную страницу
        await page.waitForSelector(".search-results"); // Ожидаем, пока появится элемент, содержащий результаты поиска
        console.log("Page loaded"); // Страница загружена

        // Получаем HTML контент страницы
        const html = await page.content();
        const $ = cheerio.load(html); // Используем cheerio для парсинга HTML

        // Проходим по каждому туру на странице
        $(".search-result-tour").each((i, element) => {
            // Извлекаем данные о туре
            const img = $(element).find(".search-result-tour .tour_photo img").attr("src"); // Изображение тура
            const link = "https://www.i-travel.com.ua" + $(element).find(".search-result-tour .tour_info a").attr("href"); // Ссылка на подробности тура

            // Если нет картинки или ссылки, пропускаем тур
            if (!img || !link) {
                console.log(`Skipping tour ${i + 1} due to missing data`);
                return;
            }

            const title = $(element).find(".tour_info .tour-name").text(); // Название тура
            const tourDescriptions = $(element).find(".tour-description").map((index, innerElement) => $(innerElement).html()).get().join(''); // Описание тура
            const price = $(element).find(".tour_info .tour-price").text(); // Цена тура
            const dates = $(element).next().find(".swiper-slide").text(); // Даты тура

            // Если нет даты, пропускаем тур
            if (!dates) {
                console.log(`Skipping tour ${title} due to missing dates`);
                return;
            }

            // Добавляем тур в массив туров
            toursItems.push({
                id: globalID++,  // Используем глобальный ID и увеличиваем его
                img,
                link,
                title,
                tourDescriptions,
                dates,
                price,
            });
            console.log(link); // Выводим ссылку на тур
        });

        console.log(`Loaded ${toursItems.length} tours`); // Выводим количество загруженных туров

        console.log("Deleting existing tour data");
        await ItravelToursList.deleteMany(); // Удаляем старые данные из базы перед добавлением новых

        // Сохраняем все найденные туры в базу данных
        for (const tour of toursItems) {
            console.log(`Saving tour: ${tour.title}`); // Выводим название сохраняемого тура
            let newTour = new ItravelToursList({
                id: tour.id,
                img: tour.img,
                title: tour.title,
                tourDescriptions: tour.tourDescriptions,
                dates: tour.dates,
                price: tour.price,
                date: new Date() // Указываем текущую дату для записи
            });

            // Сохраняем в базу данных и выводим сообщение о результате
            await newTour.save()
                .then(() => console.log("New tour added"))
                .catch(error => console.error(`Error saving tour: ${error.message}`)); // Обработка ошибок при сохранении
        }
        tourDiscr.length = 0; // Очистка массива перед новым парсингом
        let globalIDD = 1;
        // Парсим подробную информацию о каждом туре
        for (const tourItem of toursItems) {
            const link = tourItem.link; // Ссылка на подробности тура
            const getHTML = async (url) => {
                try {
                    const { data } = await axios.get(url); // Получаем HTML с подробностями тура
                    return cheerio.load(data); // Возвращаем парсер cheerio
                } catch (error) {
                    console.error(`Error fetching HTML for tour ${link}: ${error.message}`);
                    return cheerio.load(""); // Если ошибка, возвращаем пустой объект
                }
            };

            // Загружаем HTML с подробностями тура
            const selector = await getHTML(link);
            const title = selector(".headline_content").find(".headline_text h1").text(); // Название тура на странице с подробностями
            selector(".portfolio").each((i, element) => {
                // Извлекаем дополнительные данные о туре
                // const infoAccord = selector(element).find(".cmsmasters_toggles").html(); // Аккордеон с информацией
                const infoAccord = selector(element).find(".cmsmasters_row_inner").html(); // Аккордеон с информацией
                const tourDates = selector(element).find(".swiper-slide").text(); // Даты тура

                selector(element).find(".cmsmasters_project_content").each((i, element) => {
                    const tourPoints = selector(element).find(".cmsmasters_row_outer .cmsmasters_notice").html(); // Точки маршрута
                    const discrTour = selector(element).find(".cmsmasters_tabs").html(); // Подробное описание тура

                    // Добавляем описание тура в массив
                    tourDiscr.push({
                        id: globalIDD++,  // Используем глобальный ID и увеличиваем его
                        title,
                        infoAccord,
                        tourDates,
                        tourPoints,
                        discrTour,
                    });
                    console.log(title); // Выводим название тура
                });
            });
        }

        // Удаляем старые данные описаний туров
        await ItravelTourDescription.deleteMany();
        for (const tour of tourDiscr) {
            console.log(tour); // Выводим описание сохраняемого тура
            let newTour = new ItravelTourDescription({
                id: tour.id,
                title: tour.title,
                infoAccord: tour.infoAccord,
                tourDates: tour.tourDates,
                tourPoints: tour.tourPoints,
                discrTuor: tour.discrTour,
                date: new Date() // Указываем текущую дату для записи
            });

            // Сохраняем описание тура в базу данных
            await newTour.save()
                .then(() => console.log(`New description created: ${tour.tourPoints}`)) // Успех
                .catch(error => console.error(`Error saving tour description: ${error.message}`)); // Ошибка при сохранении
        }
    }

    // Пагинация: обходим 7 страниц с турами
    for (let pageNum = 1; pageNum <= 7; pageNum++) {
        const url = `https://www.i-travel.com.ua/podbor-tura/page/${pageNum}/?guaranteed=1&datefrom&dateto#038;datefrom&dateto`; // Формируем URL страницы с турами
        console.log(`Processing page ${pageNum}`); // Выводим номер текущей страницы
        await scrapePage(url); // Вызываем функцию для парсинга страницы
    }

    await browser.close(); // Закрываем браузер после завершения парсинга
};


