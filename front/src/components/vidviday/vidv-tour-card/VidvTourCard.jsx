import { Link } from "react-router-dom";
import vidvToursCardCss from "./VidvTourCard.module.scss"

const VidvTourCard = (props) => {
    let night = "";
    console.log(props.timeNights);
    if (props.timeNights > 0) {
        // night = "д" + " " + "/" + " " + props.timeNights + 'н';
        night = `д / ${props.timeNights}н`
    } else {
        // night = " " + "день" + "";
        night = ` день`
    }
    console.log(night);


    return (
        <Link to={`vidvidaydiscription/tours/${props.id}`}>
            <div >
                <div>
                    <div  className={vidvToursCardCss.tour} >

                        <div className={vidvToursCardCss.image} style={{ backgroundImage: `url(${props.src})` }}>
                            <div className={vidvToursCardCss.duration}>Тривалість: {props.timeTour}{night}</div>
                            <div className={vidvToursCardCss.price}>Вартість: {props.prise} грн</div>
                        </div>
                        <p className={vidvToursCardCss.name}>{props.title}</p>
                    </div>
                </div>
            </div >
        </Link>
    )
}
export default VidvTourCard;