import { useState, useEffect } from "react";
import FeedbackForm from "../FeedbackForm";
import Modal from "../modal/Modal";
import ButtonmodalCss from "./Buttonmodal.module.scss";

const Buttonmodal = () => {
  const [showModal, setShowModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 500; // Измените это значение на то, которое вам нужно
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <button
        className={`${ButtonmodalCss.btn_mdl} ${
          scrolled && ButtonmodalCss.scrolled
        }`}
        type="button"
        onClick={toggleModal}
      >
        Замовити дзвінок
      </button>
      {showModal && (
        <Modal onClose={toggleModal}>
          <FeedbackForm />
        </Modal>
      )}
    </div>
  );
};

export default Buttonmodal;
