const ToursList = require("./Models/VidvidayTourList");
// const Tour = require("./Models/TourDiscription");
const { default: axios } = require("axios");

module.exports = async () => {
    const toursItems = [];

    const tourDiscr = [];
    const apiUrl = "https://vidviday.ua/api/v1/tours/";
    const apiKey = "328dc807c1c2eaf44903dcae2cb5cfce";
    try {
        const response = await axios.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
            params: {
                per_page: 450
            }
        });

        if (response.status === 200) {
            const responseData = response.data.data;

            console.log(responseData);
            responseData.forEach(async function (element) {
                const { id, main_image, title, duration, nights, freePlaces, price } = element;
                toursItems.push({
                    id,
                    main_image,
                    title,
                    duration,
                    nights,
                    freePlaces,
                    price,
                });
            });
        }
    } catch (error) {
        console.error("Error:", error);
    }

    // await Tour.deleteMany();
    // for (const tour of tourDiscr) {
    //   console.log(tour);
    //   let newTour = new Tour({
    //     id: tour.id,
    //     titleTour: tour.titleTour,
    //     discrTuor: tour.discrTour,
    //     date: new Date(),
    //   });

    //   await newTour
    //     .save()
    //     .then(() => console.log(`New description created: ${tour.titleTour}`));
    // }

    await ToursList.deleteMany();
    for (const tour of toursItems) {
        // console.log(tour);
        let newTour = new ToursList({
            id: tour.id,
            img: tour.main_image,
            title: tour.title.uk,
            timeTour: tour.duration,
            timeNights: tour.nights,
            freePlaces: tour.freePlaces,
            prise: tour.price,
            // ? parseInt(tour.prise.replace(/[^a-zA-Z0-9 ]/g, "").trim())
            // : 0,
            date: new Date(),
        });

        await newTour.save().then(() => console.log("New tour added"));
    }
    // console.log("sss" + toursItems);
};
