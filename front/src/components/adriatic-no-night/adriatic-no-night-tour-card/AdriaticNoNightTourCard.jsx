import { Link } from "react-router-dom";
import "./AdriaticNoNightTourCard.scss";
import { useEffect } from "react";

function AdriaticNoNightTourCard(props) {
  // Используем useEffect для управления эффектами после монтирования компонента
  useEffect(() => {
    // Выбираем все элементы с классом ".price"
    const prices = document.querySelectorAll(".price");

    // Функция обработки клика на элементе ".price"
    prices.forEach((price) => {
      if (!price.dataset.clickListenerAdded) {
        price.addEventListener("click", () => {
          const dropdown = price.querySelector(".tour_price_currency");
          if (dropdown) {
            dropdown.classList.toggle("block");
            dropdown.classList.toggle("dnone");
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
          to={`/adriatic_no_night/description/tours/${props.title}`}
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
          to={`/adriatic_no_night/description/tours/${props.title}`}
        >
          <div className="tour_btn_details">Детальніше</div>
        </Link>
      </div>
    </div>
  );
}
export default AdriaticNoNightTourCard;
