import React from "react";
import axios from "axios";
import { motion } from "framer-motion";
import AdriaticListTouristCss from "./AdriaticNoNightListTourCard.module.scss";
import AdriaticNoNightTourCard from "../adriatic-no-night-tour-card/AdriaticNoNightTourCard.jsx";
import ScrollToTopButton from "../../scroll-to-top-button/ScrollToTopButton.jsx";
import search from "../../../images/search.png";
import { useState, useEffect } from "react";

function AdriaticNoNightListTouristCards() {
  const [list, setList] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [toursPerPage] = useState(50); // Количество туров на странице
  const [onlineUsers, setOnlineUsers] = useState(0); // Хранит количество пользователей онлайн
  useEffect(() => {
    axios
      .get(`https://turyukr.com/api/tours/adriaticnonightget-list`)
      .then((res) => {
        if (res.status === 200) {
          setList(res.data);
        }
      });
    // ------------користувачі онлайн-------------------------
    // const socket = new WebSocket("ws://localhost:5500"); // Укажите ваш WebSocket-сервер
    const socket = new WebSocket("wss://turyukr.com/socket"); // Если сервер на продакшн-сервере

    // Обновляем состояние при получении данных
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.onlineUsers !== undefined) {
        setOnlineUsers(data.onlineUsers);
      }
    };

    // Закрываем соединение при размонтировании компонента
    return () => socket.close();
  }, []);
  //  ---------------------- pagination ---------------------------------------

  // ------------------------------------------------------
  // пошук туру по сайту
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const serchTur = list.filter((tour) => {
    return tour.title.toLowerCase().includes(value.toLowerCase());
  });
  const itemClick = (event) => {
    setValue(event.target.textContent);
    setIsOpen(!isOpen);
  };

  const inputClick = () => {
    setIsOpen(true);
  };

  const icoCreate = serchTur.map((tour, index) => {
    const shouldAnimate = index < 6; // Анимируем только первые 6
    console.log(tour.timeTour);
    return (
      <motion.div
        className="card"
        key={tour.id}
        // style={shouldAnimate ? { position: "relative", zIndex: 1 } : {}} // Добавь z-index и позиционирование
        initial={shouldAnimate ? { opacity: 0, y: 50 } : {}} // Анимация только для первых 10
        animate={shouldAnimate ? { opacity: 1, y: 0 } : {}} // Остальные без анимации
        transition={shouldAnimate ? { delay: index * 0.3 } : {}} // Задержка анимации для первых 10
      >
        <AdriaticNoNightTourCard
          key={tour.id}
          id={tour.id}
          title={tour.title}
          blackCentr={tour.blackCentr}
          priceBlock={tour.priceBlock}
          visible={tour.visible}
          dateBlock={tour.dateBlock}
        />
      </motion.div>
    );
  });

  return (
    <div className={AdriaticListTouristCss.container}>
      <div className={AdriaticListTouristCss.online}>online: {onlineUsers}</div>
      <h2 className={AdriaticListTouristCss.title}>
        Автобусні тури Європою без нічних переїздів
      </h2>
      <div className="wrapper">
        <form className="search_form">
          <img src={search} className="search_img" alt="search" />
          <input
            type="text"
            value={value}
            placeholder="пошук"
            className="search_input"
            onChange={(event) => setValue(event.target.value)}
            onClick={inputClick}
          />
          <ul className="autocomplete">
            {value && isOpen
              ? serchTur.map((tour, id) => {
                  return (
                    <li
                      key={tour.id + 1}
                      className="autocomplete_item"
                      onClick={itemClick}
                    >
                      {tour.title}
                    </li>
                  );
                })
              : null}
          </ul>
        </form>
      </div>
      <div className={AdriaticListTouristCss.tours}>{icoCreate}</div>
      {/* <div className={AdriaticListTouristCss.pagination}>
        <ul className={AdriaticListTouristCss.pagination_list}>
          {currentPage > 1 && (
            <li className="pagination-item">
              <button onClick={() => paginate(currentPage - 1)}>Назад</button>
            </li>
          )}
          {renderPageNumbers()}
          {currentPage < totalPages && (
            <li className="pagination-item">
              <button onClick={() => paginate(currentPage + 4)}>Далі</button>
            </li>
          )}
        </ul>
      </div> */}
      <ScrollToTopButton />
    </div>
  );
}

export default AdriaticNoNightListTouristCards;
