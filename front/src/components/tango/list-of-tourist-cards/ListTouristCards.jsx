// import React from "react";
// import axios from "axios";
// import ToursCard from "../tour-card/ToursCard";
// import ListTouristCardCss from "./ListTouristCards.module.scss";
// import ScrollToTopButton from "../../scroll-to-top-button/ScrollToTopButton.jsx";
// import search from "../../../images/search.png";
// import { useState, useEffect } from "react";

// function ListTouristCards() {
//   const [list, setList] = useState([]);

//   useEffect(() => {
//     axios.get(`http://localhost:5500/api/tours/get-list`).then((res) => {
//       if (res.status === 200) {
//         setList(res.data);
//       }
//     });
//   }, []);

//   // пошук туру по сайту
//   const [value, setValue] = useState("");
//   const [isOpen, setIsOpen] = useState(true);
//   const serchTur = list.filter((tour) => {
//     return tour.title.toLowerCase().includes(value.toLowerCase());
//   });
//   const itemClick = (event) => {
//     setValue(event.target.textContent);
//     setIsOpen(!isOpen);
//   };

//   const inputClick = () => {
//     setIsOpen(true);
//   };

//   const icoCreate = serchTur.map((tour) => {
//     console.log(tour.timeTour);
//     return (
//       <ToursCard
//         key={tour.id}
//         id={tour.id}
//         timeTour={tour.timeTour}
//         src={tour.img}
//         title={tour.title}
//         price={tour.price}
//       />
//     );
//   });

//   return (
//     <div>
//       <h2 className={ListTouristCardCss.title}>Автобусні тури Європою</h2>
//       <div className="wrapper">
//         <form className="search_form">
//           <img src={search} className="search_img" alt="search" />
//           <input
//             type="text"
//             value={value}
//             placeholder="пошук"
//             className="search_input"
//             onChange={(event) => setValue(event.target.value)}
//             onClick={inputClick}
//           />
//           <ul className="autocomplete">
//             {value && isOpen
//               ? serchTur.map((tour, id) => {
//                   return (
//                     <li className="autocomplete_item" onClick={itemClick}>
//                       {tour.title}
//                     </li>
//                   );
//                 })
//               : null}
//           </ul>
//         </form>
//       </div>
//       <div className={ListTouristCardCss.tours}>{icoCreate}</div>
//       <ScrollToTopButton />
//     </div>
//   );
// }

// export default ListTouristCards;
// --------------------------------з анімацією картинок---------------------------------------------
import React from "react";
import axios from "axios";
import { motion } from "framer-motion"; // Импортируем framer-motion для анимации
import ToursCard from "../tour-card/ToursCard";
import ListTouristCardCss from "./ListTouristCards.module.scss";
import ScrollToTopButton from "../../scroll-to-top-button/ScrollToTopButton.jsx";
import search from "../../../images/search.png";
import { useState, useEffect } from "react";

function ListTouristCards() {
  const [list, setList] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState(0); // Хранит количество пользователей онлайн
  // Загрузка данных с сервера при монтировании компонента
  useEffect(() => {
    axios.get(`https://turyukr.com/api/tours/get-list`).then((res) => {
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

  // Пошук туру по сайту
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const serchTur = list.filter((tour) => {
    return tour.title.toLowerCase().includes(value.toLowerCase());
  });

  // Обработчики кликов для поиска
  const itemClick = (event) => {
    setValue(event.target.textContent);
    setIsOpen(!isOpen);
  };

  const inputClick = () => {
    setIsOpen(true);
  };

  // Маппинг туров с анимацией
  const icoCreate = serchTur.map((tour, index) => {
    const shouldAnimate = index < 6;
    return (
      <motion.div
        key={tour.id}
        initial={shouldAnimate ? { opacity: 0, y: 50 } : {}} // Анимация только для первых 10
        animate={shouldAnimate ? { opacity: 1, y: 0 } : {}} // Остальные без анимации
        transition={shouldAnimate ? { delay: index * 0.3 } : {}} // Задержка анимации для первых 10
      >
        <ToursCard
          id={tour.id}
          timeTour={tour.timeTour}
          src={tour.img}
          title={tour.title}
          price={tour.price}
        />
      </motion.div>
    );
  });

  return (
    <div>
      <div className={ListTouristCardCss.online}>online: {onlineUsers}</div>
      <h2 className={ListTouristCardCss.title}>Автобусні тури Європою</h2>
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
                      className="autocomplete_item"
                      onClick={itemClick}
                      key={id}
                    >
                      {tour.title}
                    </li>
                  );
                })
              : null}
          </ul>
        </form>
      </div>
      <div className={ListTouristCardCss.tours}>
        {/* {icoCreate.length > 0 ? icoCreate : <p>Нічого не знайдено</p>}{" "} */}
        {icoCreate}
      </div>
      <ScrollToTopButton />
    </div>
  );
}

export default ListTouristCards;
