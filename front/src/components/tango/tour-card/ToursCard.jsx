import { Link } from "react-router-dom";
import toursCardCss from "./toursCard.module.scss";

function ToursCard(props) {
  return (
    <div>
      <Link to={`/tango/tours/${props.title}`}>
        <div key={props.prise + 1}>
          <div className={toursCardCss.tour}>
            <div
              className={toursCardCss.image}
              style={{
                backgroundImage: `url("https://tangotravel.com.ua/${props.src}")`,
              }}
            >
              <div className={toursCardCss.duration}>
                Тривалість: {props.timeTour.substring(10)}
              </div>
              <div className={toursCardCss.price}>Вартість {props.price} €</div>
            </div>
            <p className={toursCardCss.name}>{props.title}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
export default ToursCard;
