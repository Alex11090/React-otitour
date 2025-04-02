const puppeteer = require("puppeteer");
const ToursList = require('./Models/AdriaticNoNightTourList');
const Tour = require("./Models/AdriaticNoNightTourDescription");
const axios = require("axios");

module.exports = async () => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();

    await Tour.deleteMany();
    await ToursList.deleteMany();
    let id = 1;

    async function scrapePage(url) {
        console.log(`Navigating to ${url}`);
        await page.goto(url);

        // Переключаем валюту на UAH
        const currencyText = await page.evaluate(() => {
            const btn = document.querySelector('.selected_currency');
            return btn ? btn.textContent.trim() : null;
        });

        if (currencyText.includes('EUR')) {
            await page.evaluate(() => {
                document.querySelector('#currencies > div > button:nth-child(3)').click();
            });
        } else if (currencyText.includes('UAH')) {
            console.log('Валюта уже UAH');
        } else {
            console.error('Не удалось определить активную валюту');
        }

        await page.waitForTimeout(2000); // Подождать 2 секунды для отображения изменений

        await page.waitForSelector(".tour_list_content");
        console.log("Page loaded");

        const toursItems = await page.evaluate(() => {
            const tours = [];
            document.querySelectorAll(".tour_item_sm").forEach(element => {
                const title = element.querySelector(".tour_name").textContent.trim();
                const blackCentr = element.querySelector('.tour_descr_sm').innerHTML;
                const dateBlock = element.querySelector('.block_date_sm').innerHTML;
                const priceBlock = element.querySelector('.block_price_sm').innerHTML;
                const link = element.querySelector(".tour_name a").getAttribute("href");
                const visible = element.querySelector('.visible-xs').innerHTML;

                if (blackCentr.includes("Гарантовані виїзди")) {
                    tours.push({ title, blackCentr, dateBlock, priceBlock, link, visible });
                }
            });
            return tours;
        });

        console.log(`Loaded ${toursItems.length} tours`);
        console.log("Deleting existing tour data");

        for (const tour of toursItems) {
            console.log(`Saving tour: ${tour.title}`);
            try {
                const existingTour = await ToursList.findOne({ title: tour.title });
                if (!existingTour) {
                    let newTour = new ToursList({
                        id: id++,
                        blackCentr: tour.blackCentr,
                        dateBlock: tour.dateBlock,
                        priceBlock: tour.priceBlock,
                        title: tour.title,
                        visible: tour.visible,
                        date: new Date()
                    });
                    await newTour.save();
                    console.log("New tour added");
                } else {
                    console.log(`Tour "${tour.title}" already exists, skipping...`);
                }
            } catch (error) {
                console.error(`Error saving tour: ${error.message}`);
            }
        }

        for (const tourItem of toursItems) {
            try {
                await page.goto(tourItem.link);
                const title = await page.evaluate(() => document.querySelector("#tour_name").textContent.trim());
                const tourProgram = await page.evaluate(() => document.querySelector("#program").innerHTML);
                const aboutTour = await page.evaluate(() => document.querySelector('#about_tour').innerHTML);
                const calendarTour = await page.evaluate(() => document.querySelector("#tour_my_calendar").innerHTML);

                const existingTour = await Tour.findOne({ title });
                if (!existingTour) {
                    const newTour = new Tour({
                        id: tourItem.id,
                        title,
                        tourProgram,
                        aboutTour,
                        calendarTour,
                        date: new Date()
                    });
                    await newTour.save();
                    console.log(`New description created: ${title}`);
                } else {
                    console.log(`Tour "${title}" already exists, skipping...`);
                }
            } catch (error) {
                console.error(`Error fetching tour description: ${error.message}`);
            }
        }
    }

    const totalPages = 67;
    const baseUrl = "https://adriatic-travel.com.ua/tury-bez-nichnykh-pereizdiv?page=";

    for (let i = 1; i <= totalPages; i++) {
        const url = baseUrl + i;
        await scrapePage(url);
    }

    await browser.close();
};
