import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Buttonmodal from "../../feedback-form/button-modal/Buttonmodal";
// import "../../App.css"

const TourDiscription = () => {
  window.scrollTo(0, 0);
  const [discript, setDiscript] = useState([]);
  const { title } = useParams();
  let firstElement = "";
  let secondElement = "";

  useEffect(() => {
    axios
      .post(`https://turyukr.com/api/tours/get-item/${title}`)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);

          setDiscript(res.data);
        }
      });
  }, [title]);
  console.log(discript);

  useEffect(() => {
    if (discript?.id) {
      // Получите текстовое содержимое элемента с классом "information-container"
      var container = document.querySelector(".information-container");
      let text = container.innerHTML;

      // Удалите кавычки и запятые между блоками
      text = text.replace(/<\/div>\s*,\s*<div/g, "</div><div");

      // Обновите текстовое содержимое элемента
      container.innerHTML = text;

      document.querySelector(".prew-links-buttons").style.display = "none";
      document.querySelector(".link-block-title").style.display = "none";

      if (document.querySelector(".ratings-result")) {
        document.querySelector(".ratings-result").style.display = "none";
      }

      // Получаем все элементы с классом "tab"
      const tabs = document.querySelectorAll(".tab");
      // Получаем все элементы с классом "tab" вкладок заголовков
      const tabHeadings = document.querySelectorAll(".tabs-head .tab");

      // Добавляем обработчик события для каждого заголовка таба
      tabHeadings.forEach((tabHeading) => {
        tabHeading.addEventListener("click", () => {
          // Скрываем все табы
          tabs.forEach((tab) => tab.classList.remove("active"));
          // Находим соответствующий таб по data-атрибуту
          const tabId = tabHeading.getAttribute("data-tab");
          const targetTab = document.getElementById(tabId);
          // Отображаем выбранный таб
          targetTab.classList.add("active");
          // Убираем активный класс со всех заголовков табов
          tabHeadings.forEach((heading) => heading.classList.remove("active"));
          // Добавляем активный класс только выбранному заголовку
          tabHeading.classList.add("active");
        });
      });
      // Получаем все элементы аккордеона
      const accordionElements = document.querySelectorAll(".accordion");

      // Перебираем элементы аккордеона и добавляем обработчик клика
      accordionElements.forEach((accordion) => {
        const top = accordion.querySelector(".top");
        const bottom = accordion.querySelector(".bottom");

        top.addEventListener("click", () => {
          // Переключаем видимость содержимого аккордеона
          if (bottom.style.display === "block") {
            bottom.style.display = "none";
          } else {
            bottom.style.display = "block";
          }

          // Закрываем остальные аккордеоны
          accordionElements.forEach((otherAccordion) => {
            if (otherAccordion !== accordion) {
              otherAccordion.querySelector(".bottom").style.display = "none";
            }
          });
          /// Получаем все элементы с классом "gallery"
          const galleries = document.querySelectorAll(".article-gallery");

          // Перебираем каждую галерею
          galleries.forEach((gallery) => {
            // Получаем все изображения в галерее
            const images = gallery.querySelectorAll("img");

            // Перебираем каждое изображение и обновляем атрибут "src"
            images.forEach((image) => {
              // Получаем текущее значение атрибута "src"
              let src = image.getAttribute("data-defimage");

              // Добавляем домен к относительной ссылке
              src = "https://tangotravel.com.ua/" + src;

              // Устанавливаем обновленное значение атрибута "src"
              image.setAttribute("src", src);
            });
          });
        });
      });
      // ------------------------- маршрут флаги
      /// Получаем все элементы с классом "dot"
      const galleriesPoints = document.querySelectorAll(".dot");

      // Перебираем каждую страну флаг
      galleriesPoints.forEach((gallery) => {
        // Получаем все изображения в галерее
        const images = gallery.querySelectorAll("img");

        // Перебираем каждое изображение и обновляем атрибут "src"
        images.forEach((image) => {
          // Получаем текущее значение атрибута "src"
          let src = image.getAttribute("src");

          // Добавляем домен к относительной ссылке
          src = "https://tangotravel.com.ua/" + src;

          // Устанавливаем обновленное значение атрибута "src"
          image.setAttribute("src", src);
        });
      });
      // ---------------------------------------------------------
      // Получите элемент по его идентификатору
      let element = document.getElementById("show_tour-points");

      // Скройте элемент, установив его стиль display в "none"
      if (element) {
        element.style.display = "none";
      }
      // -------------------------------------------------------------
      // // Получите элемент по его идентификатору
      // let elements = document.getElementById("tour-map-button");

      // // Скройте элемент, установив его стиль display в "none"
      // if (elements) {
      //   elements.style.display = "none";
      // }
      // // Найдите следующий элемент после элемента с id 'tour-map-button' и скройте его
      // var nextElement = elements.nextElementSibling;
      // if (nextElement) {
      //   nextElement.style.display = "none";
      // }
      // ------------------------------------------------
      // Найдите элемент с id 'tour-map-button'
      var mapButton = document.getElementById("tour-map-button");

      // Проверьте, существует ли элемент 'tour-map-button'
      if (mapButton) {
        // Если существует, найдите следующий элемент и скройте его
        var nextElement = mapButton.nextElementSibling;
        if (nextElement) {
          nextElement.style.display = "none";
        }
      }
      // --------------------------------------------------------------

      document.querySelectorAll(".toggle-button").forEach((elements) => {
        if (elements) {
          elements.style.display = "none";
        }
      });

      // Скройте элемент, установив его стиль display в "none"

      // ----------------------------------------
      // переключатель валют-----------------

      let toggl = document.getElementById("selValute");
      const WWW = () => {
        let valuteEuro = document.querySelectorAll(".valute");
        let valuteGrn = document.querySelectorAll(".grn");
        if (toggl.value === "grn") {
          valuteEuro.forEach((elem) => {
            elem.style.display = "none";
          });
          valuteGrn.forEach((elem) => {
            elem.style.display = "block";
          });
        } else if (toggl.value === "eur") {
          valuteEuro.forEach((elem) => {
            elem.style.display = "block";
          });
          valuteGrn.forEach((elem) => {
            elem.style.display = "none";
          });
        }
      };
      toggl.onchange = WWW;

      //    Забераем превью туру с исходного файла----------

      // Находим элемент с классом "information-container"
      var container = document.querySelector(".information-container");

      if (container) {
        // Получаем список всех дочерних элементов внутри контейнера
        let children = container.children;

        // Проверяем, есть ли хотя бы три дочерних элемента
        if (children.length >= 3) {
          // Удаляем три первых дочерних элемента
          for (var i = 0; i < 3; i++) {
            container.removeChild(children[0]);
          }
        } else {
          // Если дочерних элементов меньше трех, то вы можете выполнить другие действия или вывести сообщение об ошибке.
          console.log("Недостаточно дочерних элементов для удаления.");
        }
      } else {
        // Если контейнер не найден, вы также можете вывести сообщение об ошибке.
        console.log("Элемент с классом 'information-container' не найден.");
      }
    }
    // скриваємо ссилки Деталі акції-------------------------------------

    // Найдём все ссылки на странице
    const links = document.querySelectorAll("a");

    // Скрываем ссылки, у которых текстовое содержимое совпадает с нужной фразой
    links.forEach((link) => {
      if (link.textContent.trim() === "Деталі акції.") {
        link.style.display = "none";
      }
    });

    // міняємо почту танго на otitour@gmail.com------------------------------
    // Найдём элемент, содержащий почту
    const emailElement = document.querySelectorAll(
      ".accordion-content p strong"
    );

    emailElement.forEach((elem) => {
      if (elem && elem.textContent.trim() === "office@tangotravel.com.ua") {
        elem.textContent = "otitour@gmail.com";
      }
    });
    // Проверяем, содержит ли он нужную почту, и заменяем её
  }, [discript]);

  // Ваш код для обработки HTML-строки и получения firstElement и secondElement
  // Например, если вы хотите получить первый и второй div из discript.discrTable:
  const parser = new DOMParser();
  const htmlDoc = parser.parseFromString(discript.discrTable, "text/html");
  const divElements = htmlDoc.querySelectorAll("div");

  if (divElements.length >= 2) {
    firstElement = divElements[0];
    secondElement = divElements[2];
  }

  let parsedData = [];
  if (discript.dayList) {
    parsedData = JSON.parse(discript.dayList);
  }

  const listDayArr = parsedData.map((day) => {
    const datePrice = day.price;
    const dateParts = day.date.split(" ")[0].split("-");
    const year = dateParts[0];
    const month = dateParts[1];
    const dayOfMonth = dateParts[2];

    // Собираем дату в нужном формате "dd-mm-yyyy"
    const formattedDate = `${dayOfMonth}.${month}.${year} Вартість:${datePrice}`;
    return formattedDate;
  });

  return (
    <div>
      <h2 className="discrtitle">{discript.title}</h2>
      <p className="dayTitle">Дати виїзду: </p>
      <div className="date">
        {listDayArr.map((date, index) => (
          <div className="dayItem" key={index}>
            {date}
          </div>
        ))}
      </div>
      <div dangerouslySetInnerHTML={{ __html: discript.tourPoints }}></div>
      {/* Используйте firstElement и secondElement */}
      {firstElement && (
        <div
          className="information-containerTop"
          dangerouslySetInnerHTML={{ __html: firstElement.innerHTML }}
        ></div>
      )}
      {secondElement && (
        <div
          className="information-containerTop"
          dangerouslySetInnerHTML={{ __html: secondElement.innerHTML }}
        ></div>
      )}
      <div dangerouslySetInnerHTML={{ __html: discript.discrTuor }}></div>
      <div
        className="information-container"
        dangerouslySetInnerHTML={{ __html: discript.discrTable }}
      ></div>
      <Buttonmodal />
    </div>
  );
};

export default TourDiscription;
