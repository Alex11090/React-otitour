import React, { useState } from "react";
import InputMask from "react-input-mask";
import "./FeedbackForm.scss";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    text: "",
    url: window.location.href,
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Если изменяется номер телефона, сбрасываем сообщение об ошибке
    if (name === "phone") {
      setErrorMessage(""); // Сбрасываем ошибку при изменении телефона
    }
  };

  const validatePhoneNumber = (phone) => {
    // Проверка на длину номера и корректность формата
    const cleaned = phone.replace(/\D/g, ""); // Убираем все нецифровые символы
    return cleaned.length === 12; // Проверяем, что номер содержит 12 цифр
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Предотвращаем отправку формы по умолчанию

    // Очищаем номер телефона от маски перед отправкой
    const cleanPhoneNumber = formData.phone.replace(/\D/g, "");

    if (!validatePhoneNumber(cleanPhoneNumber)) {
      setErrorMessage("Некорректний номер телефону.");
      return;
    }

    const formDataToSend = {
      ...formData,
      phone: cleanPhoneNumber, // обновляем телефон
    };

    try {
      console.log("Відправка запиту:", formDataToSend);

      const formDataString = Object.keys(formDataToSend)
        .map(
          (key) =>
            encodeURIComponent(key) +
            "=" +
            encodeURIComponent(formDataToSend[key])
        )
        .join("&");

      const response = await fetch("/sender2.php", {
        method: "POST",
        body: formDataString,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const responseData = await response.text();
      console.log("Відповідь сервера:", responseData);

      if (!response.ok) {
        throw new Error("Помилка відправки форми");
      }

      console.log("Успішно відправлено");
      setFormData({
        name: "",
        phone: "",
        text: "",
        url: window.location.href,
      });
      setSuccessMessage("Успішно відправлено");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Сталася помилка під час надсилання форми:", error.message);
      setErrorMessage(
        "Сталася помилка під час надсилання форми: " + error.message
      );
    }
  };

  return (
    <form className="form_mod" onSubmit={handleSubmit}>
      <input
        type="text"
        className="name"
        name="name"
        placeholder="Им'я"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <InputMask
        id="phone"
        mask="+380 (99) 999-99-99"
        value={formData.phone}
        onChange={handleChange}
        name="phone"
      >
        {(inputProps) => (
          <input {...inputProps} placeholder="Телефон" required />
        )}
      </InputMask>
      <textarea
        name="text"
        cols="30"
        rows="1"
        placeholder="Коментар"
        value={formData.text}
        onChange={handleChange}
      ></textarea>
      <button type="submit" className="send-form">
        Надіслати
      </button>
      <div className="success-message">{successMessage}</div>
      <div className="error-message">{errorMessage}</div>
    </form>
  );
};

export default FeedbackForm;
