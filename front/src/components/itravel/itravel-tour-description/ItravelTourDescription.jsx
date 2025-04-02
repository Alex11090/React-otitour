import React, { useRef, useState, useEffect } from "react"; // Импортируем React и необходимые хуки
import axios from "axios"; // Импортируем axios для запросов к API
import { useParams } from "react-router-dom"; // Хук для получения параметров из URL
import { Swiper, SwiperSlide } from "swiper/react"; // Импортируем компоненты Swiper для карусели
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules"; // Модули Swiper для управления навигацией, пагинацией, скроллом и доступностью
import Buttonmodal from "../../feedback-form/button-modal/Buttonmodal"; // Импортируем компонент для отображения кнопки/modal
import "swiper/css"; // Стили для Swiper
import "swiper/css/navigation"; // Стили для навигации Swiper
import "swiper/css/pagination"; // Стили для пагинации Swiper
import "swiper/css/scrollbar"; // Стили для скроллбара Swiper
import "./ItravelTourDescription.css"; // Подключаем стили для компонента

const ItravelTourDiscription = () => {
  window.scrollTo(0, 0); // Прокручиваем страницу в верх, когда компонент загружается
  const [discript, setDiscript] = useState([]); // Хук состояния для описания тура
  const [datestour, setDatestour] = useState([]); // Хук состояния для дат туров
  const { title } = useParams(); // Получаем параметр title из URL

  // Используем useEffect для загрузки данных о туре с API
  useEffect(() => {
    axios
      .post(`http://localhost:5500/api/tours/get-itemitravel/${title}`) // Делаем запрос на сервер для получения данных о туре по title
      .then((res) => {
        if (res.status === 200) {
          setDiscript(res.data); // Если запрос успешен, сохраняем данные в состояние
        }
      });
  }, [title]); // Хук запускается при изменении параметра title в URL

  const accordionRef = useRef(null); // Создаём ссылку на элемент для аккордеона

  // Второй useEffect для обработки данных, когда описание (discript) загружено
  useEffect(() => {
    if (discript?.id) {
      const btnDel = document.querySelector(".button_wrap"); // Ищем кнопку удаления
      if (btnDel) btnDel.style.display = "none"; // Скрываем кнопку удаления, если она есть

      if (discript.tourDates) {
        // Если есть данные о датах туров
        const dataArray = discript.tourDates
          .split(/\n\s*\n/) // Разбиваем данные по блокам
          .map((date) =>
            date.split(/\n/).map((line) => line.trim()).filter(Boolean) // Для каждого блока разделяем по строкам и очищаем от пустых строк
          );

        const processedData = dataArray.reduce((accumulator, dateBlock) => {
          let currentBlock = []; // Массив для текущего блока данных

          for (let i = 0; i < dateBlock.length; i++) {
            const line = dateBlock[i]; // Каждая строка в блоке

            if (line.includes("Залишилось 0 місць") || line.includes("Детальніше")) {
              continue; // Пропускаем строки с ненужной информацией
            }

            // Регулярное выражение для парсинга дат и цен
            const match = line.match(/^(\d{2}\.\d{2} - \d{2}\.\d{2})(від .+|online.+)$/);
            if (match) {
              const [_, dates, price] = match; // Извлекаем даты и цену
              let finalPrice = price.toLowerCase().includes("online")
                ? "online пошук на головній"
                : price; // Заменяем текст для online
              currentBlock.push(dates, finalPrice); // Добавляем в текущий блок
            } else {
              currentBlock.push(line); // Добавляем строку без изменений
            }
          }

          if (currentBlock.length > 0) {
            accumulator.push(currentBlock); // Добавляем обработанный блок в итоговый массив
          }

          return accumulator; // Возвращаем итоговый массив
        }, []);

        setDatestour(processedData); // Обновляем состояние с данными о датах туров
      }

      // Работаем с вкладками, чтобы переключать между ними
      document.querySelectorAll(".cmsmasters_tabs").forEach((tabContainer) => {
        const tabs = tabContainer.querySelectorAll(".cmsmasters_tabs_list_item");
        const tabContents = tabContainer.querySelectorAll(".cmsmasters_tab");

        tabs.forEach((tab) => {
          tab.addEventListener("click", function (event) {
            event.preventDefault(); // Отключаем стандартное поведение ссылки

            tabs.forEach((t) => t.classList.remove("current_tab")); // Убираем активный класс у всех вкладок
            tabContents.forEach((content) => (content.style.display = "none")); // Скрываем все вкладки

            this.classList.add("current_tab"); // Добавляем активный класс текущей вкладке

            const tabId = this.id.replace("cmsmasters_tabs_list_item_", "cmsmasters_tab_");
            const targetTab = tabContainer.querySelector(`#${tabId}`);
            if (targetTab) targetTab.style.display = "block"; // Показываем содержимое активной вкладки
          });
        });
      });

      // Обрабатываем изменение валют
      document.querySelectorAll(".infoItem").forEach((element) => {
        if (
          element.textContent.includes(
            "Необхідно буде внести передоплату у розмірі 10% протягом 2 днів(я)"
          )
        ) {
          element.innerHTML = element.innerHTML.replace("10%", "не менше 50%"); // Заменяем текст в контенте
          element.innerHTML = element.innerHTML.replace("протягом 2 днів(я)", ""); // Убираем старую информацию
        }
      });

      // Работа с аккордеоном
      const toggleWraps = accordionRef.current.querySelectorAll(".cmsmasters_toggle_wrap");

      toggleWraps.forEach((toggleWrap) => {
        const toggleTitle = toggleWrap.querySelector(".cmsmasters_toggle_title");
        const toggleContent = toggleWrap.querySelector(".cmsmasters_toggle");

        toggleTitle.addEventListener("click", () => {
          toggleWrap.classList.toggle("active"); // Переключаем активное состояние аккордеона
          toggleContent.style.display = toggleWrap.classList.contains("active")
            ? "block" // Показываем контент, если он активен
            : "none"; // Скрываем, если не активен
        });
      });

      // Обработчики для переключения валют
      const btnUA = document.querySelector(".carrencyUA");
      const btnEUR = document.querySelector(".carrencyEUR");

      const handleCurrencyChange = (currency) => {
        const curEUR = document.querySelectorAll(".international-currency");
        const curUA = document.querySelectorAll(".national-currency");

        const carrencyUA = document.querySelector(".carrencyUA");
        const carrencyEUR = document.querySelector(".carrencyEUR");

        if (curEUR && curUA) {
          curEUR.forEach((elem) => {
            elem.style.display = currency === "EUR" ? "block" : "none"; // Показываем или скрываем валюту в EUR
          });

          curUA.forEach((elem) => {
            elem.style.display = currency === "UA" ? "block" : "none"; // Показываем или скрываем валюту в UAH
          });

          carrencyUA.classList.toggle("active", currency === "UA"); // Устанавливаем активную валюту
          carrencyEUR.classList.toggle("active", currency === "EUR");
        }
      };

      btnEUR.addEventListener("click", () => handleCurrencyChange("EUR")); // При клике на EUR меняем валюту
      btnUA.addEventListener("click", () => handleCurrencyChange("UA")); // При клике на UAH меняем валюту

      // Очистка обработчиков при размонтировании компонента
      return () => {
        document.querySelectorAll(".cmsmasters_tabs_list_item").forEach((tab) => {
          tab.removeEventListener("click", () => { });
        });

        toggleWraps.forEach((toggleWrap) => {
          const toggleTitle = toggleWrap.querySelector(".cmsmasters_toggle_title");
          toggleTitle.removeEventListener("click", () => { });
        });

        btnEUR.removeEventListener("click", () => handleCurrencyChange("EUR"));
        btnUA.removeEventListener("click", () => handleCurrencyChange("UA"));
      };
    }
  }, [discript]); // Эффект будет перезапускаться при изменении discript

  return (
    <div className="container">
      <div className="titleTourDescr">{discript.title}</div> {/* Заголовок тура */}
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]} // Модули Swiper
        navigation // Включаем навигацию
        spaceBetween={3} // Расстояние между слайдами
        slidesPerView={5} // Количество слайдов на экране
        breakpoints={{
          1024: { slidesPerView: 5, spaceBetween: 3 },
          768: { slidesPerView: 3, spaceBetween: 2 },
          480: { slidesPerView: 2, spaceBetween: 1 },
          320: { slidesPerView: 1, spaceBetween: 1 },
        }} // Настройки для разных разрешений экрана
      >
        {datestour.map((date, index) => (
          <SwiperSlide key={index} className="swiper_slide">
            {date.map((item, innerIndex) => (
              <div key={innerIndex}>
                {innerIndex === 2 && (
                  <div style={{ fontWeight: "bold", color: "red" }} className="national-currency">
                    {item.trim()} {/* Если это цена в UAH */}
                  </div>
                )}
                {innerIndex === 3 && (
                  <div className="international-currency">{item.trim()}</div> /* Если это цена в EUR */
                )}
                {innerIndex !== 2 && innerIndex !== 3 && <div>{item.trim()}</div>} {/* Для остальных данных */}
              </div>
            ))}
          </SwiperSlide>
        ))}
      </Swiper>
      <hr />

      <div className="currency-toggle">
        <div className="carrencyUA active">UAH</div> / {/* Переключатели валют */}
        <div className="carrencyEUR">EUR</div>
      </div>

      <div className="cmsmasters_toggles" ref={accordionRef} dangerouslySetInnerHTML={{ __html: discript.infoAccord }}></div> {/* Аккордеоны */}
      <div className="points" dangerouslySetInnerHTML={{ __html: discript.tourPoints }}></div> {/* Дополнительные точки */}
      <div className="cmsmasters_tabs" dangerouslySetInnerHTML={{ __html: discript.discrTuor }}></div> {/* Вкладки */}
      <Buttonmodal /> {/* Кнопка для модального окна */}
    </div>
  );
};

export default ItravelTourDiscription;
