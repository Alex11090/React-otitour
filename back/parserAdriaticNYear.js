const puppeteer = require("puppeteer"); // Импортируем библиотеку Puppeteer для управления браузером.
const ToursList = require("./Models/AdriaticNYearList"); // Импортируем модель для сохранения списка туров.
const Tour = require("./Models/AdriaticNYearDescription"); // Импортируем модель для сохранения описания тура.

module.exports = async () => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] }); // Запускаем браузер в фоновом режиме.
    const page = await browser.newPage(); // Открываем новую вкладку в браузере.

    // Удаляем все существующие записи в базе данных, чтобы загрузить обновленные данные.
    await Tour.deleteMany();
    await ToursList.deleteMany();
    let id = 1; // Инициализируем идентификатор для новых туров.

    // Функция для парсинга отдельной страницы.
    async function scrapePage(url) {
        console.log(`Navigating to ${url}`); // Логируем текущий URL.
        await page.goto(url); // Переходим на указанную страницу.
        await page.screenshot({ path: 'screenshot.png', fullPage: true }); // Делаем скриншот всей страницы для отладки.

        // Переключаем валюту на UAH, если она установлена в EUR.
        const currencyText = await page.evaluate(() => {
            const btn = document.querySelector('.selected_currency'); // Находим элемент, указывающий текущую валюту.
            return btn ? btn.textContent.trim() : null; // Возвращаем текст валюты или null, если элемент не найден.
        });

        // Проверяем текущую валюту и переключаем ее на UAH, если необходимо.
        if (currencyText && currencyText.includes('EUR')) {
            await page.evaluate(() => {
                document.querySelector('#currencies > div > button:nth-child(2)').click(); // Кликаем для переключения на UAH.
            });
        } else if (currencyText && currencyText.includes('UAH')) {
            console.log('Валюта уже UAH'); // Если валюта уже UAH, ничего не делаем.
        } else {
            console.error('Не удалось определить активную валюту'); // Логируем ошибку, если не удалось определить валюту.
        }

        await page.waitForTimeout(2000); // Ждем 2 секунды, чтобы изменения вступили в силу.

        await page.waitForSelector(".tour_list_content"); // Ждем загрузки основного контента страницы.
        console.log("Page loaded"); // Логируем успешную загрузку страницы.

        // Парсим данные с текущей страницы: список туров.
        const toursItems = await page.evaluate(() => {
            const tours = [];
            document.querySelectorAll(".tour_item_sm").forEach(element => {
                const title = element.querySelector(".tour_name").textContent.trim(); // Название тура.
                const blackCentr = element.querySelector('.tour_descr_sm').innerHTML; // Описание тура.
                const dateBlock = element.querySelector('.block_date_sm').innerHTML; // Даты тура.
                const priceBlock = element.querySelector('.block_price_sm').innerHTML; // Стоимость тура.
                const link = element.querySelector(".tour_name a").getAttribute("href"); // Ссылка на страницу тура.
                const visible = element.querySelector('.visible-xs').innerHTML; // Дополнительная информация.

                // Сохраняем тур, если он относится к категории "Гарантовані виїзди".
                if (blackCentr.includes("Гарантовані виїзди")) {
                    tours.push({ title, blackCentr, dateBlock, priceBlock, link, visible }); // Добавляем тур в список.
                }
            });
            return tours; // Возвращаем массив туров.
        });

        console.log(`Loaded ${toursItems.length} tours`); // Логируем количество загруженных туров.

        // Сохраняем список туров в базу данных.
        for (const tour of toursItems) {
            console.log(`Saving tour: ${tour.title}`); // Логируем сохранение каждого тура.
            try {
                const existingTour = await ToursList.findOne({ title: tour.title }); // Проверяем, существует ли тур в базе.
                if (!existingTour) {
                    let newTour = new ToursList({
                        id: id++, // Уникальный идентификатор для тура.
                        blackCentr: tour.blackCentr,
                        dateBlock: tour.dateBlock,
                        priceBlock: tour.priceBlock,
                        title: tour.title,
                        visible: tour.visible,
                        date: new Date() // Текущая дата.
                    });
                    await newTour.save(); // Сохраняем новый тур в базу.
                    console.log("New tour added"); // Логируем успешное добавление тура.
                } else {
                    console.log(`Tour "${tour.title}" already exists, skipping...`); // Пропускаем тур, если он уже есть в базе.
                }
            } catch (error) {
                console.error(`Error saving tour: ${error.message}`); // Логируем ошибку, если не удалось сохранить тур.
            }
        }

        // Для каждого тура загружаем подробную информацию со страницы тура.
        for (const tourItem of toursItems) {
            try {
                await page.goto(tourItem.link); // Переходим на страницу с описанием тура.
                const title = await page.evaluate(() => document.querySelector("#tour_name").textContent.trim()); // Название тура.
                const tourProgram = await page.evaluate(() => document.querySelector("#program").innerHTML); // Программа тура.
                const aboutTour = await page.evaluate(() => document.querySelector('#about_tour').innerHTML); // Описание тура.
                const calendarTour = await page.evaluate(() => document.querySelector("#tour_my_calendar").innerHTML); // Календарь тура.

                const existingTour = await Tour.findOne({ title }); // Проверяем, существует ли описание тура в базе.
                if (!existingTour) {
                    const newTour = new Tour({
                        id: tourItem.id,
                        title,
                        tourProgram,
                        aboutTour,
                        calendarTour,
                        date: new Date() // Текущая дата.
                    });
                    await newTour.save(); // Сохраняем новое описание тура в базу.
                    console.log(`New description created: ${title}`); // Логируем успешное добавление описания.
                } else {
                    console.log(`Tour "${title}" already exists, skipping...`); // Пропускаем описание, если оно уже есть в базе.
                }
            } catch (error) {
                console.error(`Error fetching tour description: ${error.message}`); // Логируем ошибку, если не удалось загрузить описание тура.
            }
        }
    }

    // Функция для получения общего количества страниц.
    async function getTotalPages() {
        await page.goto(baseUrl + 1); // Переходим на первую страницу.
        const totalPages = await page.evaluate(() => {
            const paginationLinks = Array.from(document.querySelectorAll('.pagination a')); // Ищем все ссылки пагинации.
            return paginationLinks.length ? parseInt(paginationLinks[paginationLinks.length - 1].textContent.trim()) : 1; // Возвращаем последнюю цифру пагинации.
        });
        return totalPages; // Возвращаем количество страниц.
    }

    const baseUrl = "https://adriatic-travel.com.ua/tury-na-novyi-rik?page="; // Базовый URL для страниц.
    const totalPages = await getTotalPages(); // Получаем фактическое количество страниц для парсинга.
    console.log(`Total pages to scrape: ${totalPages}`); // Логируем количество страниц.

    // Цикл по всем страницам для их парсинга.
    for (let i = 1; i <= totalPages; i++) {
        const url = baseUrl + i; // Формируем URL для текущей страницы.
        await scrapePage(url); // Парсим текущую страницу.
    }

    await browser.close(); // Закрываем браузер после завершения парсинга.
};
