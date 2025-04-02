
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const ToursList = require('./Models/TangoToursList');
const Tour = require("./Models/TangoTourDiscription");
const { default: axios } = require("axios");

module.exports = async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  const tourDiscr = [];
  const toursItems = [];

  async function scrapePage(url) {
    console.log(`Navigating to ${url}`);
    await page.goto(url);
    await page.waitForSelector(".inner");
    console.log("Page loaded");


    // async function loadAllTours() {
    //   let nextPageButton;
    //   const loadMoreButtonSelector = '.load-more-items';

    //   do {
    //     // Ищем кнопку "Загрузить еще"
    //     nextPageButton = await page.$(loadMoreButtonSelector);

    //     if (nextPageButton) {
    //       // Проверяем, можно ли кликнуть по кнопке
    //       const isClickable = await nextPageButton.evaluate(element => {
    //         const { width, height } = element.getBoundingClientRect();
    //         return width > 0 && height > 0;
    //       });

    //       if (isClickable) {
    //         // Если кнопка кликабельна, кликаем по ней
    //         await nextPageButton.click();
    //       } else {
    //         // Если кнопка не кликабельна, выводим сообщение и завершаем цикл
    //         console.log("Элемент не кликабельный. Подождем еще.");
    //         break;
    //       }
    //     } else {
    //       // Если кнопку не найдено, выводим сообщение и завершаем цикл
    //       console.log("Кнопка не найдена. Все туры загружены.");
    //       break;
    //     }
    //   } while (nextPageButton);

    //   console.log('Все туры загружены.');
    // }


    // // Вызываем функцию для загрузки туров
    // await loadAllTours();

    async function loadAllTours() {
      let nextPageButton;
      const loadMoreButtonSelector = '.load-more-items';

      while (true) {
        try {
          // Ожидаем появления кнопки (если не появится за 5 сек, считаем, что её нет)
          await page.waitForSelector(loadMoreButtonSelector, { timeout: 5000 });

          // Ищем кнопку
          nextPageButton = await page.$(loadMoreButtonSelector);

          if (!nextPageButton) {
            console.log("Кнопка не найдена. Все туры загружены.");
            break;
          }

          // Проверяем, видима ли кнопка в окне просмотра
          const isVisible = await nextPageButton.evaluate(el => {
            const { width, height } = el.getBoundingClientRect();
            return width > 0 && height > 0;
          });

          if (!isVisible) {
            console.log("Кнопка есть, но не видима. Завершаем загрузку.");
            break;
          }

          // Прокручиваем страницу к кнопке (чтобы избежать ошибки клика)
          await nextPageButton.evaluate(el => el.scrollIntoView({ behavior: 'smooth', block: 'center' }));
          await page.waitForTimeout(500); // Даем время на прокрутку

          // Проверяем, доступна ли кнопка для клика
          const isClickable = await nextPageButton.isIntersectingViewport();
          if (!isClickable) {
            console.log("Кнопка не в области видимости. Ждем...");
            await page.waitForTimeout(1000);
            continue;
          }

          // Кликаем по кнопке
          await nextPageButton.click();
          console.log("Клик по кнопке выполнен. Загружаем еще туры...");

          // Ждем немного перед следующим поиском кнопки
          await page.waitForTimeout(2000);
        } catch (error) {
          console.log("Ошибка при загрузке туров:", error.message);
          break;
        }
      }

      console.log("Все туры загружены.");
    }

    // Вызываем функцию
    await loadAllTours();



    const html = await page.content();
    const $ = cheerio.load(html);



    $(".item--normal").each((i, element) => {
      const img = $(element).find(".item--normal .image img").attr("src");
      const link = $(element).find(".item--normal .image a").attr("href");
      // Удаляем символ # из заголовка
      const title = $(element).find(".title-group__title").text().replace('#', '').trim();

      // const title = $(element).find(".title-group__title").text();
      const timeTour = $(element)
        .find('.item--normal .label-group .label-group')
        .text();
      const freePlaces = $(element)
        .find('.traffic-lights-spot-block .traffic-lights-spot')
        .text();
      const price = $(element).find(".tour-information__bot .primary-cell__leading").text();

      toursItems.push({
        id: i + 1,
        img,
        link,
        title,
        timeTour,
        freePlaces,
        price,
      });
    });
    console.log(`Loaded ${toursItems.length} tours`);

    // Ваш код для сохранения данных о турах

    console.log("Deleting existing tour data");
    await ToursList.deleteMany();

    for (const tour of toursItems) {
      console.log(`Saving tour: ${tour.title}`);
      let newTour = new ToursList({
        id: tour.id,
        img: tour.img,
        title: tour.title,
        timeTour: tour.timeTour,
        freePlaces: tour.freePlaces,
        price: tour.price,
        date: new Date()
      });

      await newTour.save()
        .then(() => console.log("New tour added"))
        .catch(error => console.error(`Error saving tour: ${error.message}`));
    }

    // Ваш код для извлечения и сохранения описаний туров
    // ...
    let id = 1;
    for (const tourItem of toursItems) {
      const getHTML = async (url) => {
        const { data } = await axios.get(url);
        return cheerio.load(data);
      };
      const selector = await getHTML(tourItem.link);

      selector(".tour-detailed").each((i, element) => {
        // Удаляем символ # из заголовка
        const title = selector(element).find(".container-title h1").text().replace('#', '').trim();
        // const title = selector(element).find(".container-title h1").text();
        const dayList = [];
        selector('.datepicker-calendar-wrapper').each((index, element) => {
          const date = selector(element).attr('data-days');
          dayList.push(date);
        });
        console.log(dayList);
        // const dayList = selector(element).find(".eventCalendar-dayWithEvents a").text();
        const tourPoints = selector(element).find(".tour-points").html();
        const discrTour = selector(element).find(".tour-program-tabs").html();
        const discrTable = [];
        selector('.information-container').each((index, element) => {
          discrTable.push(selector(element).html());
        });

        tourDiscr.push({
          id: id,
          title,
          dayList,
          tourPoints,
          discrTour,
          discrTable,
        });
      });

      id++;
    }

    await Tour.deleteMany();
    for (const tour of tourDiscr) {
      console.log(tour);
      let newTour = new Tour({
        id: tour.id,
        title: tour.title,
        dayList: tour.dayList,
        tourPoints: tour.tourPoints,
        discrTuor: tour.discrTour,
        discrTable: tour.discrTable,
        date: new Date()
      });

      await newTour.save()
        .then(() => console.log(`New description created: ${tour.titleTour}`));
    }



    await browser.close();
  }

  await scrapePage("https://tangotravel.com.ua/tury-v-yevropu/");
};

// ================= Только Пупитер без Черио ====================

// const puppeteer = require("puppeteer");
// const ToursList = require('./Models/TangoToursList');
// const Tour = require("./Models/TangoTourDiscription");

// module.exports = async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   const toursItems = [];

//   async function scrapePage(url) {
//     console.log(`Navigating to ${url}`);
//     await page.goto(url);
//     await page.waitForSelector(".inner");
//     console.log("Page loaded");

//     async function loadAllTours() {
//       let nextPageButton;
//       const loadMoreButtonSelector = '.load-more-items';

//       do {
//         // Ищем кнопку "Загрузить еще"
//         nextPageButton = await page.$(loadMoreButtonSelector);

//         if (nextPageButton) {
//           // Проверяем, можно ли кликнуть по кнопке
//           const isClickable = await nextPageButton.evaluate(element => {
//             const { width, height } = element.getBoundingClientRect();
//             return width > 0 && height > 0;
//           });

//           if (isClickable) {
//             // Если кнопка кликабельна, кликаем по ней
//             await nextPageButton.click();
//           } else {
//             // Если кнопка не кликабельна, выводим сообщение и завершаем цикл
//             console.log("Элемент не кликабельный. Подождем еще.");
//             break;
//           }
//         } else {
//           // Если кнопку не найдено, выводим сообщение и завершаем цикл
//           console.log("Кнопка не найдена. Все туры загружены.");
//           break;
//         }
//       } while (nextPageButton);

//       console.log('Все туры загружены.');
//     }

//     // Вызываем функцию для загрузки туров
//     await loadAllTours();

//     const tours = await page.evaluate(() => {
//       const items = [];
//       const tourElements = document.querySelectorAll(".item--normal");

//       tourElements.forEach((element, i) => {
//         const img = element.querySelector(".item--normal .image img").getAttribute("src");
//         const link = element.querySelector(".item--normal .image a").getAttribute("href");
//         const title = element.querySelector(".title-group__title").textContent;
//         const timeTour = element.querySelector('.item--normal .label-group .label-group').textContent;
//         const freePlaces = element.querySelector('.traffic-lights-spot-block .traffic-lights-spot').textContent;
//         const price = element.querySelector(".tour-information__bot .primary-cell__leading").textContent;

//         items.push({
//           id: i + 1,
//           img,
//           link,
//           title,
//           timeTour,
//           freePlaces,
//           price,
//         });
//       });

//       return items;
//     });

//     toursItems.push(...tours);
//     console.log(`Loaded ${toursItems.length} tours`);

//     for (const tour of toursItems) {
//       console.log(`Saving tour: ${tour.title}`);
//       let newTour = new ToursList({
//         id: tour.id,
//         img: tour.img,
//         title: tour.title,
//         timeTour: tour.timeTour,
//         freePlaces: tour.freePlaces,
//         price: tour.price,
//         date: new Date()
//       });

//       await newTour.save()
//         .then(() => console.log("New tour added"))
//         .catch(error => console.error(`Error saving tour: ${error.message}`));
//     }

//     await browser.close();
//   }

//   await scrapePage("https://tangotravel.com.ua/tury-v-yevropu/");
// };



// -----------------------------------------------------


// const puppeteer = require("puppeteer");
// const cheerio = require("cheerio");
// const ToursList = require('./Models/TangoToursList');
// const Tour = require("./Models/TangoTourDiscription");
// const { default: axios } = require("axios");

// module.exports = async () => {
//   const browser = await puppeteer.launch({ headless: "new" });
//   const page = await browser.newPage();
//   const tourDiscr = [];
//   const toursItems = [];

//   async function scrapePage(url) {
//     console.log(`Navigating to ${url}`);
//     await page.goto(url);
//     await page.waitForSelector(".inner");
//     console.log("Page loaded");

//     async function loadAllTours() {
//       let nextPageButton;
//       const loadMoreButtonSelector = '.load-more-items';

//       do {
//         nextPageButton = await page.$(loadMoreButtonSelector);

//         if (nextPageButton) {
//           const isClickable = await nextPageButton.evaluate(element => {
//             const { width, height } = element.getBoundingClientRect();
//             return width > 0 && height > 0 && !element.disabled;
//           });

//           if (isClickable) {
//             await nextPageButton.click();
//             await page.waitForTimeout(2000);
//           } else {
//             console.log("Элемент не кликабельный. Подождем еще.");
//             break;
//           }
//         } else {
//           console.log("Кнопка не найдена. Все туры загружены.");
//           break;
//         }
//       } while (nextPageButton);

//       console.log('Все туры загружены.');
//     }

//     await loadAllTours();

//     const html = await page.content();
//     const $ = cheerio.load(html);

//     $(".item--normal").each((i, element) => {
//       const img = $(element).find(".item--normal .image img").attr("src");
//       const link = $(element).find(".item--normal .image a").attr("href");
//       const title = $(element).find(".title-group__title").text().replace('#', '').trim();
//       const timeTour = $(element).find('.item--normal .label-group .label-group').text();
//       const freePlaces = $(element).find('.traffic-lights-spot-block .traffic-lights-spot').text();
//       const price = $(element).find(".tour-information__bot .primary-cell__leading").text();

//       toursItems.push({
//         id: i + 1,
//         img,
//         link,
//         title,
//         timeTour,
//         freePlaces,
//         price,
//       });
//     });
//     console.log(`Loaded ${toursItems.length} tours`);

//     console.log("Deleting existing tour data");
//     await ToursList.deleteMany();

//     for (const tour of toursItems) {
//       console.log(`Saving tour: ${tour.title}`);
//       let newTour = new ToursList({
//         id: tour.id,
//         img: tour.img,
//         title: tour.title,
//         timeTour: tour.timeTour,
//         freePlaces: tour.freePlaces,
//         price: tour.price,
//         date: new Date()
//       });

//       await newTour.save()
//         .then(() => console.log("New tour added"))
//         .catch(error => console.error(`Error saving tour: ${error.message}`));
//     }

//     await Tour.deleteMany();
//     for (const tourItem of toursItems) {
//       try {
//         const { data } = await axios.get(tourItem.link);
//         const selector = cheerio.load(data);

//         const title = selector(".container-title h1").text().replace('#', '').trim();
//         const dayList = [];
//         selector('.datepicker-calendar-wrapper').each((index, element) => {
//           const date = selector(element).attr('data-days');
//           dayList.push(date);
//         });
//         const tourPoints = selector(".tour-points").html();
//         const discrTour = selector(".tour-program-tabs").html();
//         const discrTable = [];
//         selector('.information-container').each((index, element) => {
//           discrTable.push(selector(element).html());
//         });

//         let newTour = new Tour({
//           title,
//           dayList,
//           tourPoints,
//           discrTuor: discrTour,
//           discrTable: discrTable,
//           date: new Date()
//         });

//         await newTour.save()
//           .then(() => console.log(`New description created: ${title}`));
//       } catch (error) {
//         console.error(`Error fetching description for tour: ${tourItem.title}, ${error.message}`);
//       }
//     }

//     await browser.close();
//   }

//   await scrapePage("https://tangotravel.com.ua/tury-v-yevropu/");
// };













