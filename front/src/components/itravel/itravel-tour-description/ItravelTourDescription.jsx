import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import Buttonmodal from "../../feedback-form/button-modal/Buttonmodal";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./ItravelTourDescription.css";

const ItravelTourDiscription = () => {
  window.scrollTo(0, 0);
  const [discript, setDiscript] = useState([]);
  const [datestour, setDatestour] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    // Удаляем кавычки из заголовка
    // const cleanedTitle = title.replace(/[^а-яїєґі]/gi, "");
    axios
      .post(`https://turyukr.com/api/tours/get-itemitravel/${id}`)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setDiscript(res.data);
        }
      });
  }, [id]);

  const accordionRef = useRef(null);

  useEffect(() => {
    if (discript?.id) {
      const btnDel = document.querySelector(".button_wrap");
      if (btnDel) {
        btnDel.style.display = "none";
      }

      if (discript.tourDates) {
        const dataArray = discript.tourDates
          .split(/\n\s*\n/)
          .map((date) => date.split(/\n/).map(line => line.trim()).filter(Boolean));

        console.log('After splitting and trimming:', dataArray); // Проверим промежуточный результат

        const processedData = dataArray.reduce((accumulator, dateBlock) => {
          let currentBlock = [];

          for (let i = 0; i < dateBlock.length; i++) {
            const line = dateBlock[i];
            console.log('Processing line:', line); // Логируем каждую строку

            if (line.includes("Залишилось 0 місць") || line.includes("Детальніше")) {
              continue; // Пропускаем строки, которые не нужны
            }

            // const match = line.match(/^(\d{2}\.\d{2} - \d{2}\.\d{2})(від .+|від .+ грн\.)$/);
            const match = line.match(/^(\d{2}\.\d{2} - \d{2}\.\d{2})(від .+|online.+)$/);
            if (match) {
              const [_, dates, price] = match;
              console.log('Match found:', dates, price); // Логируем совпадения
              let finalPrice = price;
              // Проверка на "online-пошук"
              if (finalPrice.toLowerCase().includes("online")) {
                finalPrice = "online пошук на головній"; // Заменяем на цену "від 0 €" или по вашему желанию
              }
              // if (finalPrice.includes("грн")) {
              //   finalPrice = finalPrice.replace("від", "від 349 €"); // Заменяем "грн" на евро
              // }

              currentBlock.push(dates, finalPrice); // Добавляем найденные данные в блок
            } else {
              currentBlock.push(line); // Если нет совпадений, просто добавляем строку
            }
          }

          // Добавляем обработанный блок в итоговый массив
          if (currentBlock.length > 0) {
            accumulator.push(currentBlock);
          }

          return accumulator;
        }, []);

        console.log('Processed data:', processedData); // Логируем результат

        setDatestour(processedData);
      }

      console.log(datestour);


      const tabs = document.querySelectorAll(".cmsmasters_tabs_list_item");
      const tabContents = document.querySelectorAll(".cmsmasters_tab");

      tabs.forEach((tab, index) => {
        tab.addEventListener("click", (event) => {
          event.preventDefault();

          tabs.forEach((t) => {
            t.classList.remove("current_tab");
          });
          tabContents.forEach((content) => {
            content.classList.remove("active_tab");
          });

          tab.classList.add("current_tab");
          tabContents[index].classList.add("active_tab");
        });
      });

      const elements = document.querySelectorAll(".infoItem");

      elements.forEach((element) => {
        if (
          element.textContent.includes(
            "Необхідно буде внести передоплату у розмірі 10% протягом 2 днів(я)"
          )
        ) {
          element.innerHTML = element.innerHTML.replace("10%", "не менше 50%");
          element.innerHTML = element.innerHTML.replace(
            "протягом 2 днів(я)",
            ""
          );
        }
      });

      const toggleWraps = accordionRef.current.querySelectorAll(
        ".cmsmasters_toggle_wrap"
      );

      toggleWraps.forEach((toggleWrap) => {
        const toggleTitle = toggleWrap.querySelector(
          ".cmsmasters_toggle_title"
        );
        const toggleContent = toggleWrap.querySelector(".cmsmasters_toggle");

        toggleTitle.addEventListener("click", () => {
          toggleWrap.classList.toggle("active");

          if (toggleWrap.classList.contains("active")) {
            toggleContent.style.display = "block";
          } else {
            toggleContent.style.display = "none";
          }
        });
      });

      // перекл валюти-----------------------------------
      const btnUA = document.querySelector(".carrencyUA");
      const btnEUR = document.querySelector(".carrencyEUR");

      const handleCurrencyChange = (currency) => {
        const curEUR = document.querySelectorAll(".international-currency");
        const curUA = document.querySelectorAll(".national-currency");

        // Получаем ссылки на элементы .carrencyUA и .carrencyEUR
        const carrencyUA = document.querySelector(".carrencyUA");
        const carrencyEUR = document.querySelector(".carrencyEUR");

        if (curEUR && curUA) {
          curEUR.forEach((elem) => {
            elem.style.display = currency === "EUR" ? "block" : "none";
          });

          curUA.forEach((elem) => {
            elem.style.display = currency === "UA" ? "block" : "none";
          });

          // Добавляем/удаляем класс "актив" для .carrencyUA и .carrencyEUR
          carrencyUA.classList.toggle("active", currency === "UA");
          carrencyEUR.classList.toggle("active", currency === "EUR");
        }
      };

      btnEUR.addEventListener("click", () => handleCurrencyChange("EUR"));
      btnUA.addEventListener("click", () => handleCurrencyChange("UA"));

      return () => {
        toggleWraps.forEach((toggleWrap) => {
          const toggleTitle = toggleWrap.querySelector(
            ".cmsmasters_toggle_title"
          );
          toggleTitle.removeEventListener("click", () => { });
        });
      };
    }
  }, [discript]);

  return (
    <div className="container">
      <div className="titleTourDescr">{discript.title}</div>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        navigation
        spaceBetween={3}
        slidesPerView={5}
        breakpoints={{
          1024: { slidesPerView: 5, spaceBetween: 3 },
          768: { slidesPerView: 3, spaceBetween: 2 },
          480: { slidesPerView: 2, spaceBetween: 1 },
          320: { slidesPerView: 1, spaceBetween: 1 },
        }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        {datestour.map((date, index) => (
          <SwiperSlide key={index} className="swiper_slide">
            {date.map((item, innerIndex) => (
              <div key={innerIndex}>
                {innerIndex === 2 && (
                  <div style={{ fontWeight: 'bold', color: 'red' }} class="national-currency">{item.trim()}</div>
                )}
                {innerIndex === 3 && (
                  <div class="international-currency">{item.trim()}</div>
                )}
                {innerIndex !== 2 && innerIndex !== 3 && (
                  <div >{item.trim()}</div>
                )}
              </div>
            ))}
          </SwiperSlide>
        ))}
      </Swiper>
      <hr />

      <div class="currency-toggle">
        <div class="carrencyUA active">UAH</div> /
        <div class="carrencyEUR">EUR</div>
      </div>

      <div
        className="cmsmasters_toggles"
        ref={accordionRef}
        dangerouslySetInnerHTML={{ __html: discript.infoAccord }}
      ></div>
      <div
        className="points"
        dangerouslySetInnerHTML={{ __html: discript.tourPoints }}
      ></div>
      <div
        className="cmsmasters_tabs"
        dangerouslySetInnerHTML={{ __html: discript.discrTuor }}
      ></div>
      <Buttonmodal />
    </div>
  );
};

export default ItravelTourDiscription;
