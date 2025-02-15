import React, { useState, useEffect } from "react";
import axios from "axios";
import search from "../../../images/search.png";
import VidvidayListTouristCardCss from "./VidvidayListTouristCards.module.scss";
import ScrollToTopButton from "../../scroll-to-top-button/ScrollToTopButton";
import TourCard from "../vidv-tour-card/VidvTourCard";
const VidvidayListTouristCards = () => {
  const [list, setList] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState(0); // Хранит количество пользователей онлайн
  useEffect(() => {
    axios.get(`https://turyukr.com/api/tours/vidvget-list`).then((res) => {
      if (res.status === 200) {
        // res.data = sortArrByID(res.data);
        console.log(res.data);
        setList(res.data);
        // setList(sortArrByID(res.data));
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
  // const sortArrByID = (arr) => {
  //   let temp;
  //   arr = arr.map((el) => {
  //     el.id = parseInt(el.id);
  //     return el;
  //   });
  //   for (let i = 0; i < arr.length; i++) {
  //     for (let j = 0; j < arr.length - i - 1; j++) {
  //       if (arr[j].id > arr[j + 1].id) {
  //         temp = arr[j];
  //         arr[j] = arr[j + 1];
  //         arr[j + 1] = temp;
  //       }
  //     }
  //   }
  //   return arr;
  // };
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

  let tourCard = serchTur.map((tour, id) => {
    return (
      <TourCard
        key={id}
        id={tour.id}
        timeTour={tour.timeTour}
        timeNights={tour.timeNights}
        src={tour.img}
        title={tour.title}
        prise={tour.prise}
      />
    );
  });
  return (
    <>
      <div>
        <div className={VidvidayListTouristCardCss.online}>
          online: {onlineUsers}
        </div>
        <h2 className={VidvidayListTouristCardCss.title}>Тури Україною</h2>
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

        <div className={VidvidayListTouristCardCss.tours}>{tourCard}</div>
        <ScrollToTopButton />
      </div>
    </>
  );
};

export default VidvidayListTouristCards;
