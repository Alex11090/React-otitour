import React, { useState, useEffect } from "react";
import axios from "axios";
import Accordion from "react-bootstrap/Accordion";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import discriptCss from "./discription.module.scss";
import wallet from "../../../images/wallet.svg";
import plan from "../../../images/plan.svg";
import places from "../../../images/places.svg";
import schedule from "../../../images/schedule.svg";
import tickets from "../../../images/tickets.svg";
import keys from "../../../images/keys.svg";
import meal from "../../../images/meal.svg";
import "./custom-slick-styles.css";
import Buttonmodal from "../../feedback-form/button-modal/Buttonmodal";
// import FeedbackForm from "../feedbackForm/FeedbackForm"

const VidvTourDescription = () => {
  const [discript, setDiscript] = useState([]);
  const { id } = useParams();
  window.scrollTo(0, 0);
  useEffect(() => {
    const accessToken = "328dc807c1c2eaf44903dcae2cb5cfce";
    axios
      .get(`https://vidviday.ua/api/v1/tour/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);

          setDiscript(res.data);
        }
      });
  }, [id]);

  useEffect(() => {
    if (discript?.id) {
      // console.log(discript.data.text['uk']);
    }
  }, [discript]);
  if (discript && discript.data && discript.data.food) {
    const foodData = discript.data.food;

    // Создаем объект, где ключи - это дни, а значения - массив блюд для каждого дня
    const mealsByDay = {};
    foodData.forEach((elem) => {
      if (!mealsByDay[elem.day]) {
        mealsByDay[elem.day] = [];
      }
      mealsByDay[elem.day].push(elem);
    });

    return (
      <div>
        {/* <h2 className="title">Опис туру</h2> */}
        {discript.data && (
          <>
            <h4 className="discrtitle">{discript.data.title.uk}</h4>
            <div className={discriptCss.centered}>
              <p className={discriptCss.priceTour}>
                Вартість: <b>{discript.data.price}</b> грн
              </p>
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: discript.data.text.uk.replace(
                  /<ul/g,
                  '<ul style="list-style: none;"'
                ),
              }}
              style={{
                textAlign: "center",
                padding: "0 15px",
                listStyle: "none",
              }}
            />
            <Slider
              dots={false}
              infinite={true}
              arrows={true}
              slidesToShow={3}
              // centerMode={true}
              // centerPadding="0px"
              speed={500}
              slidesToScroll={3}
              initialSlide={0}
              responsive={[
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                  },
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                  },
                },
                {
                  breakpoint: 480,
                  settings: {
                    // centerMode: true,
                    // centerPadding: "0px",
                    slidesToShow: 1,
                    slidesToScroll: 1,
                  },
                },
              ]}
            >
              {discript.data.images.map((image, index) => (
                <div key={index}>
                  <img
                    src={image}
                    alt={`Slide ${index}`}
                    className={discriptCss.imgWidthTop}
                  />
                </div>
              ))}
            </Slider>

            <Accordion defaultActiveKey={["0"]} alwaysOpen>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <img
                    src={plan}
                    alt="plan"
                    className={discriptCss.accordIcon}
                  />
                  План туру
                </Accordion.Header>
                <Accordion.Body>
                  <div
                    dangerouslySetInnerHTML={{ __html: discript.data.plan.uk }}
                  />
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  {
                    <svg
                      className={discriptCss.accordIcon}
                      style={{
                        height: "26px",
                        width: "26px",
                        marginRight: "15px",
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                    >
                      <path d="M288 0C422.4 0 512 35.2 512 80V128C529.7 128 544 142.3 544 160V224C544 241.7 529.7 256 512 256L512 416C512 433.7 497.7 448 480 448V480C480 497.7 465.7 512 448 512H416C398.3 512 384 497.7 384 480V448H192V480C192 497.7 177.7 512 160 512H128C110.3 512 96 497.7 96 480V448C78.33 448 64 433.7 64 416L64 256C46.33 256 32 241.7 32 224V160C32 142.3 46.33 128 64 128V80C64 35.2 153.6 0 288 0zM128 256C128 273.7 142.3 288 160 288H272V128H160C142.3 128 128 142.3 128 160V256zM304 288H416C433.7 288 448 273.7 448 256V160C448 142.3 433.7 128 416 128H304V288zM144 400C161.7 400 176 385.7 176 368C176 350.3 161.7 336 144 336C126.3 336 112 350.3 112 368C112 385.7 126.3 400 144 400zM432 400C449.7 400 464 385.7 464 368C464 350.3 449.7 336 432 336C414.3 336 400 350.3 400 368C400 385.7 414.3 400 432 400zM368 64H208C199.2 64 192 71.16 192 80C192 88.84 199.2 96 208 96H368C376.8 96 384 88.84 384 80C384 71.16 376.8 64 368 64z"></path>
                    </svg>
                  }
                  Місця посадки
                </Accordion.Header>
                <Accordion.Body>
                  {discript.data.landings.map((elem, index) => {
                    return (
                      <React.Fragment key={index}>
                        <div>
                          <h6
                            dangerouslySetInnerHTML={{ __html: elem.title.uk }}
                          />
                          <div
                            dangerouslySetInnerHTML={{
                              __html: elem.description.uk,
                            }}
                          />
                        </div>
                        <hr />
                      </React.Fragment>
                    );
                  })}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>
                  <img
                    src={places}
                    alt="places"
                    className={discriptCss.accordIcon}
                  />
                  Екскурсійні об'єкти
                </Accordion.Header>
                <Accordion.Body>
                  {discript.data.places.map((place, index) => {
                    return (
                      <React.Fragment key={index}>
                        <div>
                          <Slider
                            dots={false}
                            infinite={true}
                            arrows={true}
                            slidesToShow={3}
                            // centerMode={true}
                            // centerPadding="0px"
                            speed={500}
                            slidesToScroll={3}
                            responsive={[
                              {
                                breakpoint: 1024,
                                settings: {
                                  slidesToShow: 3,
                                  slidesToScroll: 3,
                                  infinite: true,
                                  dots: true,
                                },
                              },
                              {
                                breakpoint: 768,
                                settings: {
                                  slidesToShow: 2,
                                  slidesToScroll: 2,
                                  initialSlide: 2,
                                },
                              },
                              {
                                breakpoint: 480,
                                settings: {
                                  slidesToShow: 1,
                                  slidesToScroll: 1,
                                },
                              },
                            ]}
                          >
                            {place.images.map((image, index) => (
                              <div key={index}>
                                <img
                                  src={image}
                                  alt={`Slide ${index}`}
                                  className={discriptCss.imgWidth}
                                />
                              </div>
                            ))}
                          </Slider>
                          <h6
                            dangerouslySetInnerHTML={{ __html: place.title.uk }}
                            style={{ fontWeight: "600", textAlign: "center" }}
                          />
                          <div
                            dangerouslySetInnerHTML={{ __html: place.text.uk }}
                          />
                        </div>
                        <hr />
                      </React.Fragment>
                    );
                  })}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>
                  <img
                    src={schedule}
                    alt="schedule"
                    className={discriptCss.accordIcon}
                  />
                  Розклад
                </Accordion.Header>
                <Accordion.Body>
                  {discript.data.schedules.map((elem, index) => {
                    return (
                      <React.Fragment key={index}>
                        <div className={discriptCss.shedule}>
                          <div className={discriptCss.sheduleItem}>
                            <h6>Дата виїзду</h6>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: elem.start_date,
                              }}
                            />
                          </div>
                          <div className={discriptCss.sheduleItem}>
                            <h6>Дата повернення</h6>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: elem.end_date,
                              }}
                            />
                          </div>
                          <div className={discriptCss.sheduleItem}>
                            <h6>Доступно місць</h6>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: elem.places_available,
                              }}
                            />
                          </div>
                          {/* <div className={discriptCss.sheduleItem}>
                            <h6>Всього місць</h6>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: elem.places_total,
                              }}
                            />
                          </div>
                          <div className={discriptCss.sheduleItem}>
                            <h6>Вартість</h6>
                            <div
                              dangerouslySetInnerHTML={{ __html: elem.price }}
                            />
                          </div> */}
                        </div>
                        <hr />
                      </React.Fragment>
                    );
                  })}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="4">
                <Accordion.Header>
                  <img
                    src={wallet}
                    alt="wallet"
                    className={discriptCss.accordIcon}
                  />
                  Фінанси
                </Accordion.Header>
                <Accordion.Body>
                  {discript.data.includes.map((elem, index) => {
                    return (
                      <React.Fragment key={index}>
                        <div>
                          <h6
                            dangerouslySetInnerHTML={{ __html: elem.title.uk }}
                          />
                        </div>
                        {elem.items.map((item, itemIndex) => (
                          <div>
                            <p
                              key={itemIndex}
                              dangerouslySetInnerHTML={{ __html: item.uk }}
                            />
                          </div>
                        ))}

                        <hr />
                      </React.Fragment>
                    );
                  })}
                  <h5>Знижки</h5>
                  {discript.data.discounts.map((elem, index) => {
                    return (
                      <React.Fragment key={index}>
                        <div>
                          <li
                            dangerouslySetInnerHTML={{ __html: elem.title.uk }}
                          />
                        </div>
                      </React.Fragment>
                    );
                  })}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="5">
                <Accordion.Header>
                  <img
                    src={tickets}
                    alt="tickets"
                    className={discriptCss.accordIcon}
                  />
                  Вхідні квитки
                </Accordion.Header>
                <Accordion.Body>
                  {discript.data.tickets.map((elem, index) => {
                    return (
                      <React.Fragment key={index}>
                        <div>
                          <h5
                            dangerouslySetInnerHTML={{ __html: elem.title.uk }}
                          />
                          <div
                            dangerouslySetInnerHTML={{ __html: elem.text.uk }}
                          />
                        </div>
                        <hr />
                      </React.Fragment>
                    );
                  })}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="6">
                <Accordion.Header>
                  {" "}
                  <img
                    src={keys}
                    alt="keys"
                    className={discriptCss.accordIcon}
                  />
                  Проживання
                </Accordion.Header>
                <Accordion.Body>
                  {discript.data.accommodation.map((elem, index) => {
                    return (
                      <React.Fragment key={index + 1}>
                        <Slider
                          dots={false}
                          infinite={true}
                          arrows={true}
                          slidesToShow={3}
                          // centerMode={true}
                          // centerPadding="0px"
                          speed={500}
                          slidesToScroll={3}
                          responsive={[
                            {
                              breakpoint: 1024,
                              settings: {
                                slidesToShow: 3,
                                slidesToScroll: 3,
                                infinite: true,
                                dots: true,
                              },
                            },
                            {
                              breakpoint: 768,
                              settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2,
                                initialSlide: 2,
                              },
                            },
                            {
                              breakpoint: 480,
                              settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                              },
                            },
                          ]}
                        >
                          {elem.images.map((image, index) => (
                            <div key={index + 1}>
                              <img
                                src={image}
                                alt={`Slide ${index}`}
                                className={discriptCss.imgWidth}
                              />
                              {console.log(image)}
                            </div>
                          ))}
                        </Slider>

                        <div>
                          <h5
                            dangerouslySetInnerHTML={{ __html: elem.title.uk }}
                          />
                          <div
                            dangerouslySetInnerHTML={{ __html: elem.text.uk }}
                          />
                        </div>
                        <hr />
                      </React.Fragment>
                    );
                  })}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="7">
                <Accordion.Header>
                  <img
                    src={meal}
                    alt="meal"
                    className={discriptCss.accordIcon}
                  />
                  &nbsp;&nbsp;Харчування
                </Accordion.Header>
                <Accordion.Body>
                  {Object.keys(mealsByDay).map((day) => (
                    <div key={day}>
                      <h3>День {day}</h3>
                      {mealsByDay[day].map((meal, index) => (
                        <div key={index}>
                          <h5
                            dangerouslySetInnerHTML={{ __html: meal.time.uk }}
                          />
                          <div
                            dangerouslySetInnerHTML={{ __html: meal.text.uk }}
                          />
                        </div>
                      ))}
                      <hr />
                    </div>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </>
        )}
        <Buttonmodal />
      </div>
    );
  }
};

export default VidvTourDescription;
