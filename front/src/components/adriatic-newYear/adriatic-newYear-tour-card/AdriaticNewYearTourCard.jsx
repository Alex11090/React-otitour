import { Link } from "react-router-dom";
import "./AdriaticNewYearTourCard.scss";
import { useEffect } from "react";

function AdriaticNewYearTourCard(props) {
  // Используем useEffect для управления эффектами после монтирования компонента
  useEffect(() => {
    // // Выбираем все элементы с классом ".price" и ".dnone"
    // const boxes = document.querySelectorAll(".price");
    // const dropdowns = document.querySelectorAll(".dnone");
    // // Функция обработки клика на элементе с заданным индексом
    // const handleClick = (index) => {
    //   // Закрываем все dropdowns
    //   dropdowns.forEach((dropdown) => {
    //     dropdown.classList.remove("block");
    //     dropdown.classList.add("dnone");
    //   });
    //   // Открываем или закрываем dropdown по индексу
    //   if (dropdowns[index].classList.contains("block")) {
    //     dropdowns[index].classList.remove("block");
    //     dropdowns[index].classList.add("dnone");
    //   } else {
    //     dropdowns[index].classList.remove("dnone");
    //     dropdowns[index].classList.add("block");
    //   }
    // };
    // // Добавляем обработчик клика к каждому элементу ".price"
    // boxes.forEach((box, index) => {
    //   box.addEventListener("click", () => handleClick(index));
    // });
    // // Возвращаем функцию очистки, чтобы удалить обработчики при размонтировании компонента
    // return () => {
    //   boxes.forEach((box, index) => {
    //     box.removeEventListener("click", () => handleClick(index));
    //   });
    // };

    // ===================упрощенный код открытия цен валюты==================
    // Выбираем все элементы с классом ".price"
    const prices = document.querySelectorAll(".price");

    // Функция обработки клика на элементе ".price"
    prices.forEach((price, index) => {
      if (!price.dataset.clickListenerAdded) {
        price.addEventListener("click", () => {
          const dropdown = price.querySelector(".tour_price_currency");

          if (dropdown) {
            console.log(`Element clicked: ${index}`);
            console.log(
              `Before toggle: block=${dropdown.classList.contains(
                "block"
              )}, dnone=${dropdown.classList.contains("dnone")}`
            );

            dropdown.classList.toggle("block");
            dropdown.classList.toggle("dnone");

            console.log(
              `After toggle: block=${dropdown.classList.contains(
                "block"
              )}, dnone=${dropdown.classList.contains("dnone")}`
            );
          } else {
            console.error(`Dropdown not found for element: ${index}`);
          }
        });

        // Помечаем элемент, чтобы не добавлять обработчик снова
        price.dataset.clickListenerAdded = true;
      }
    });

    // --------меняем относительную ссылку на абсолютную--------------
    const imgElements = document.querySelectorAll(".text_box_imgAnimated");
    console.log(imgElements);

    if (imgElements.length > 0) {
      imgElements.forEach((imgElement) => {
        imgElement.src =
          "https://adriatic-travel.com.ua/UserFiles/textBox/1732031523673cb4233bb59-100x100.gif";
      });
    } else {
      console.error(".text_box_imgAnimated не найден в DOM.");
    }
  }, [props]);

  return (
    <div className="container">
      <div className="tour_item_sm">
        <Link
          className="tour_descr_sm"
          to={`/adriatic_new_year/description/tours/${props.title}`}
        >
          <div dangerouslySetInnerHTML={{ __html: props.blackCentr }}></div>
        </Link>
        <div
          className="box2tour_sm visible-xs"
          dangerouslySetInnerHTML={{ __html: props.visible }}
        ></div>
        <div
          className="block_date_sm"
          dangerouslySetInnerHTML={{ __html: props.dateBlock }}
        ></div>

        <div
          className="block_price_sm  tour_price"
          dangerouslySetInnerHTML={{ __html: props.priceBlock }}
        ></div>
        <Link
          className="more_detail"
          to={`/adriatic_new_year/description/tours/${props.title}`}
        >
          <div className="tour_btn_details">Детальніше</div>
        </Link>
      </div>
    </div>
  );
}
export default AdriaticNewYearTourCard;
