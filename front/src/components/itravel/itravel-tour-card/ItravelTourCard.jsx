import { Link } from "react-router-dom";

import { Fragment, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import React from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import itavelToursCardCss from "./ItravelTourCard.module.scss";
function ItravelToursCard(props) {
  const [datesall, setDatesAll] = useState([]);
  useEffect(() => {
    if (props.dates) {
      const lines = props.dates.split("\n").map(line => line.trim()).filter(Boolean);
      const dataArray = [];
      let currentBlock = [];

      for (const line of lines) {
        if (line.includes("Залишилось 0 місць")) {
          continue; // Пропускаем блоки без мест
        }

        // Обновленное регулярное выражение для поиска даты и цены, с проверкой на online-пошук
        const match = line.match(/^(\d{2}\.\d{2} - \d{2}\.\d{2})(від .+|online.+)$/);
        if (match) {
          const [_, dates, price] = match;
          let finalPrice = price;

          // Проверка на "online-пошук"
          if (finalPrice.toLowerCase().includes("online")) {
            finalPrice = "online пошук на головній"; // Заменяем на цену "від 0 €" или по вашему желанию
          }

          currentBlock.push(dates, finalPrice); // Разделяем дату и цену
        } else {
          currentBlock.push(line);
        }

        if (currentBlock.length === 3) {
          dataArray.push([...currentBlock]);
          currentBlock = [];
        }
      }

      setDatesAll(dataArray);
    }
  }, [props.dates]);


  // console.log(datesall);


  return (
    <div className={itavelToursCardCss.container}>
      <Link
        to={`/itravel/description_tour/tours/${props.id}`}
        className={itavelToursCardCss.link}
      >
        <div className={itavelToursCardCss.searchResultTour}>
          <img
            className={itavelToursCardCss.tour_photo}
            src={props.src}
            alt='Автобусний тур "Стамбульський експрес" з Одеси'
          />
          <div className={itavelToursCardCss.tour_info}>
            <h2 className={itavelToursCardCss.title}>{props.title}</h2>
            <div className={itavelToursCardCss.tour_info}>
              <div className={itavelToursCardCss.tour_price}>{props.price}</div>
              <div
                className={itavelToursCardCss.tour_description}
                dangerouslySetInnerHTML={{ __html: props.tourDescriptions }}
              ></div>
            </div>
          </div>
        </div>
      </Link>

      <Swiper
        className={itavelToursCardCss.swiperlistTour}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        // direction="horizontal"
        navigation
        spaceBetween={3}
        slidesPerView={5}
        // slideClass="swiper_slide_cast"

        // pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
        // speed={500}
        // initialSlide={0}
        // noSwiping={true}
        // noSwipingClass="swiper-no-swiping"
        breakpoints={{
          1024: { slidesPerView: 5, spaceBetween: 3 },
          768: { slidesPerView: 3, spaceBetween: 2 },
          480: { slidesPerView: 2, spaceBetween: 1 },
          320: { slidesPerView: 1, spaceBetween: 1 },
        }}
      // onSwiper={(swiper) => console.log(swiper)}
      // onSlideChange={() => console.log("slide change")}
      >
        {datesall.map((date, index) => (
          <SwiperSlide key={index} className={itavelToursCardCss.swiper_slide}>
            <div>{date[0]}</div> {/* "Залишилось X місць" */}
            <div>{date[1]}</div> {/* Даты */}
            <div className={itavelToursCardCss.price}>{date[2]}</div> {/* Цена */}
          </SwiperSlide>
        ))}
      </Swiper>
      <hr />
    </div>
  );
}

export default ItravelToursCard;
