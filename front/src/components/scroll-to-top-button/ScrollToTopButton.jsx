import React, { useState, useEffect } from 'react';
import ScrollToTopButtonCss from './ScrollToTopButton.module.scss';
import arrowUp from '../../images/arr1.png'


const ScrollToTopButton = () => {
    const [showButton, setShowButton] = useState(false);

    const handleScroll = () => {
        // Если пользователь прокрутил вниз более чем на 500 пикселей, покажем кнопку, иначе скроем ее
        if (window.scrollY > 500) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    };

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        // Добавляем обработчик события прокрутки при монтировании компонента
        window.addEventListener('scroll', handleScroll);

        // Удаляем обработчик события прокрутки при размонтировании компонента, чтобы избежать утечки памяти
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        // Показываем кнопку, если showButton равно true
        showButton && (
            <button onClick={handleScrollToTop}>
                <img className={ScrollToTopButtonCss.scrollToTopButton} src={arrowUp} alt='btnScroll'/>
            </button>

        )


    );
};

export default ScrollToTopButton;

