import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AdriaticNewYearTourDescriptionCss from "./AdriaticNewYearTourDescription.module.scss";
// import FeedbackForm from "../../feedback-form/FeedbackForm";
// import Modal from "../../modal/Modal";
import Buttonmodal from "../../feedback-form/button-modal/Buttonmodal";
import "./AdriaticNewYearTourDescription.scss";

const AdriaticNewYearTourDescription = () => {
  window.scrollTo(0, 0);
  const [discript, setDiscript] = useState([]);
  const [activeTab, setActiveTab] = useState("about_tour");
  const { title } = useParams();
  // const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .post(`https://turyukr.com/api/tours/get-adriaticnewyear/${title}`)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setDiscript(res.data);
        }
      });
  }, [title]);
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  useEffect(() => {
    // Находим все элементы <img> на странице
    var imgElements = document.querySelectorAll("img");

    // Проходим по каждому элементу
    imgElements.forEach(function (imgElement) {
      // Получаем текущее значение атрибута src
      var src = imgElement.getAttribute("src");

      // Проверяем, содержит ли src подстроку "UserFiles/Image/day_4.jpg"
      if (src.includes("UserFiles/Image/")) {
        // Добавляем "https://adriatic-travel.com.ua/" к началу src
        imgElement.src = "https://adriatic-travel.com.ua/" + src;
      }
    });

    // скрываем лишнее из опысу---------------------------
    // Находим все заголовки h3 внутри .tour_description
    var h3Elements = document.querySelectorAll(".tour_description h3");

    // Проходим по каждому найденному заголовку
    h3Elements.forEach(function (h3Element) {
      // Проверяем, содержит ли текущий заголовок нужный текст
      if (h3Element.textContent.trim() === "Акційні пропозиції:") {
        // Удаляем текущий заголовок h3
        h3Element.remove();

        // Находим следующий элемент ul
        var ulElement = h3Element.nextElementSibling;

        // Проверяем, был ли найден элемент ul
        if (ulElement && ulElement.tagName.toLowerCase() === "ul") {
          // Удаляем элемент ul
          ulElement.remove();
        }
      }
    });
    // -------------------------------------------------------------
    // Выбираем все ссылки внутри элемента с id "about_tour"
    const links = document.querySelectorAll("#about_tour a");

    // Проходимся по каждой ссылке и делаем их неактивными
    links.forEach((link) => {
      // link.setAttribute("disabled", true); // Устанавливаем атрибут disabled
      // ИЛИ
      link.style.pointerEvents = "none"; // Устанавливаем CSS-свойство pointer-events: none;
    });
    // --------------------------------------------------------------
    // // Находим все элементы <p> на странице
    // Находим все элементы <p> на странице
    const paragraphs = document.querySelectorAll("p");

    // Проходимся по всем найденным параграфам
    paragraphs.forEach((paragraph) => {
      // Проверяем содержимое параграфа на соответствие тексту "Дивіться також:"
      if (paragraph.textContent.trim() === "Дивіться також:") {
        // Находим следующий за параграфом элемент <ul>
        const ulElement = paragraph.nextElementSibling;
        // Проверяем, является ли следующий элемент <ul>
        if (ulElement && ulElement.tagName === "UL") {
          // Если элемент <ul> существует и является списком, удаляем его
          ulElement.remove();
          // Удаляем параграф
          paragraph.remove();
        }
      }
    });
    // --------------удаляем liшку вылезла за контейнер и появился нижний скролл------
    // Находим все элементы списка
    var listItems = document.querySelectorAll("ul li");

    // Проходим по каждому элементу списка
    listItems.forEach(function (item) {
      // Проверяем, содержит ли элемент указанный текст
      if (item.textContent.includes("Фотографії, відео, відгуки")) {
        // Если да, скрываем этот элемент
        item.style.display = "none";
      }
    });
  }, [discript]);
  // const toggleModal = () => {
  //   console.log("Button clicked");
  //   setShowModal(!showModal);
  //   console.log(showModal);
  // };
  return (
    <div className={AdriaticNewYearTourDescriptionCss.container}>
      <div id="tour_my_calendar" class="calendar_block no-print">
        <div dangerouslySetInnerHTML={{ __html: discript.calendarTour }}></div>
      </div>
      <div className={AdriaticNewYearTourDescriptionCss.tabs}>
        <button
          className={`${AdriaticNewYearTourDescriptionCss.tab} ${
            activeTab === "about_tour" &&
            AdriaticNewYearTourDescriptionCss.active
          }`}
          onClick={() => handleTabClick("about_tour")}
        >
          Опис туру
        </button>
        <button
          className={`${AdriaticNewYearTourDescriptionCss.tab} ${
            activeTab === "program" && AdriaticNewYearTourDescriptionCss.active
          }`}
          onClick={() => handleTabClick("program")}
        >
          Програма туру
        </button>
      </div>
      <div
        id="about_tour"
        className={`${AdriaticNewYearTourDescriptionCss.tabContent} ${
          activeTab === "about_tour" &&
          AdriaticNewYearTourDescriptionCss.activeTabContent
        }`}
        dangerouslySetInnerHTML={{ __html: discript.aboutTour }}
      ></div>
      <div
        id="program"
        className={`${AdriaticNewYearTourDescriptionCss.tabContent} ${
          activeTab === "program" &&
          AdriaticNewYearTourDescriptionCss.activeTabContent
        }`}
        dangerouslySetInnerHTML={{ __html: discript.tourProgram }}
      ></div>
      <div>
        <Buttonmodal />
        {/* <button type="button" onClick={toggleModal}>
          Замовити дзвінок
        </button> */}
        {/* {showModal && (
          <Modal onClose={toggleModal}>
            <FeedbackForm />
          </Modal>
        )} */}
      </div>
    </div>
  );
};

export default AdriaticNewYearTourDescription;
