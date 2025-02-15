import React from "react";
import axios from "axios";
import ItravelToursCard from "../itravel-tour-card/ItravelTourCard.jsx";
import ItravelListTouristCardCss from "./ItravelListTouristCards.module.scss";
import ScrollToTopButton from "../../scroll-to-top-button/ScrollToTopButton.jsx";
import search from "../../../images/search.png";
import { useState, useEffect } from "react";

function ItravelListTouristCards() {
  const [list, setList] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState(0); // Хранит количество пользователей онлайн
  useEffect(() => {
    axios.get(`https://turyukr.com/api/tours/itravelget-list`).then((res) => {
      if (res.status === 200) {
        setList(res.data);
      }
    });
    // // ------------користувачі онлайн-------------------------
    // const socket = new WebSocket("ws://localhost:5500"); // Укажите ваш WebSocket-сервер
    const socket = new WebSocket("wss://turyukr.com/socket"); // Если сервер на продакшн-сервере

    // Обновляем состояние при получении данных
    socket.onmessage = (event) => {
      // Когда сервер отправляет сообщение, вызывается эта функция.
      const data = JSON.parse(event.data);
      // Сообщение от сервера приходит в виде строки, поэтому мы преобразуем его в объект с помощью JSON.parse.
      if (data.onlineUsers !== undefined) {
        // Проверяем, есть ли в полученных данных информация о количестве пользователей.
        setOnlineUsers(data.onlineUsers);
        // Обновляем состояние (например, в React-компоненте), чтобы показать количество активных пользователей.
      }
    };

    // Закрываем соединение при размонтировании компонента
    return () => socket.close();
  }, []);

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

  const icoCreate = serchTur.map((tour) => {
    return (
      <ItravelToursCard
        key={tour.id}
        id={tour.id}
        src={tour.img}
        title={tour.title}
        price={tour.price}
        tourDescriptions={tour.tourDescriptions}
        dates={tour.dates}
      />
    );
  });

  return (
    <div className={ItravelListTouristCardCss.container}>
      <div className={ItravelListTouristCardCss.online}>
        online: {onlineUsers}
      </div>
      <h2 className={ItravelListTouristCardCss.title}>
        Автобусні тури Європою
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
                  <li className="autocomplete_item" onClick={itemClick}>
                    {tour.title}
                  </li>
                );
              })
              : null}
          </ul>
        </form>
      </div>
      <div className={ItravelListTouristCardCss.tours}>{icoCreate}</div>

      <ScrollToTopButton />
    </div>
  );
}

export default ItravelListTouristCards;
