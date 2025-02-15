// import React from "react";
// import headerCss from "./header.module.scss";
// import Logo from "../../images/logo_sm.png";
// import logoAdress from "../../images/Icon_Address.png";
// import logoTel from "../../images/Icon_Phone.png";
// import { NavLink } from "react-router-dom";

// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
// import Image from "react-bootstrap/Image";
// /* The following line can be included in a src/App.scss */
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/css/bootstrap.css";

// const Header = () => {
//   return (
//     <>
//       {/* <header className={headerCss.header}> */}
//       {/* <a href={'https://otitour.com/'}><img className={headerCss.logoImg} src={Logo} alt='logo' /></a>
//                 <nav className={headerCss.haederNav}>
//                     <div className={headerCss.sp_column}>
//                         <div >
//                             <ul className={headerCss.nav_menuTop}>
//                                 <li class="itemNav"><a href="/pro-nas">Про нас</a></li>
//                                 <li class="itemNav"><a href="/oplata">Оплата</a></li>
//                                 <li class="itemNav"><a href="/kontakty">Контакти</a></li>
//                                 <li class="itemNav"><a href="/strahuvannya">Страхування</a></li>
//                             </ul>
//                         </div>

//                         <div class="sp-module _menu menu_main">
//                             <div class="sp-module-content">
//                                 <ul className={headerCss.nav_menu}>
//                                     <li className={headerCss.itemNav2}><a href="/">Головна</a></li>
//                                     <li className={headerCss.itemNav2}><a href="https://otitour.com/avtobusnni-tury">Автобусні Тури</a></li>
//                                     <li className={headerCss.itemNav2}><a href="/poshuk-turu-otpuskcom">Тури Україною</a></li>
//                                     <li className={headerCss.itemNav2}><a href="/pidbir-turu">Підбір туру</a></li>
//                                 </ul>
//                             </div>
//                         </div>

//                     </div>
//                 </nav> */}
//       <Navbar expand="lg" className={headerCss.bgTop}>
//         <span className={headerCss.spanTop}>
//           <img className={headerCss.icoTop} src={logoAdress} alt="ico" /> Львів.
//           Лемківська 16
//         </span>
//         <span className={headerCss.spanTop}>
//           <Nav.Link className={headerCss.telTop} href="tel:+380677565876">
//             <img className={headerCss.icoTop} src={logoTel} alt="ico" />{" "}
//             +38(067)756-58-76
//           </Nav.Link>
//         </span>
//       </Navbar>
//       <Navbar expand="lg" className={headerCss.bgbodytertiary}>
//         <Container>
//           <Nav.Link href="https://otitour.com/">
//             <Image src={Logo} className={headerCss.navImg} />
//             <div className={headerCss.brand}>
//               Туристична агенція Ольги Сороки
//             </div>
//           </Nav.Link>
//           <Navbar.Toggle aria-controls="basic-navbar-nav" />
//           <Navbar.Collapse id="basic-navbar-nav" className={headerCss.collapse}>
//             <Nav className="me-auto">
//               <Nav.Link
//                 className={headerCss.navLink}
//                 href="https://otitour.com/"
//               >
//                 Головна
//               </Nav.Link>

//               <NavDropdown
//                 as={NavLink}
//                 title="Тури Європою"
//                 id="basic-nav-dropdown"
//                 className={headerCss.navDropdown}
//               >
//                 <NavDropdown.Item
//                   as={NavLink}
//                   className={`${headerCss.navLink} `}
//                   to="/tango"
//                 >
//                   Багато турів
//                 </NavDropdown.Item>
//                 <NavDropdown.Item
//                   as={NavLink}
//                   className={`${headerCss.navLink} `}
//                   to="/itravel"
//                 >
//                   Більше турів
//                 </NavDropdown.Item>
//                 <NavDropdown.Item
//                   as={NavLink}
//                   className={`${headerCss.navLink} `}
//                   to="/adriatic"
//                 >
//                   Ще більше турів)
//                 </NavDropdown.Item>
//                 <NavDropdown.Item
//                   as={NavLink}
//                   className={`${headerCss.navLink} ${headerCss.itravel}`}
//                   to="/adriatic_no_night"
//                 >
//                   Без нічних переїздів
//                 </NavDropdown.Item>
//                 <NavDropdown.Item
//                   as={NavLink}
//                   className={`${headerCss.navLink} ${headerCss.itravel}`}
//                   to="/adriatic_new_year"
//                 >
//                   Новий рік в Європі
//                 </NavDropdown.Item>
//               </NavDropdown>
//               <Nav.Link
//                 as={NavLink}
//                 className={headerCss.navLink}
//                 to="/adriatic_new_year"
//               >
//                 Новий рік в Європі
//               </Nav.Link>
//               <Nav.Link
//                 as={NavLink}
//                 className={headerCss.navLink}
//                 to="/vidviday"
//               >
//                 Тури Україною
//               </Nav.Link>

//               <Nav.Link
//                 className={headerCss.navLink}
//                 href="https://otitour.com/pidbir-turu"
//               >
//                 Підбір туру
//               </Nav.Link>
//               <NavDropdown
//                 title="Інфо"
//                 id="basic-nav-dropdown"
//                 className={headerCss.navDropdown}
//               >
//                 <NavDropdown.Item href="https://otitour.com/pro-nas">
//                   Про нас
//                 </NavDropdown.Item>
//                 <NavDropdown.Item href="https://otitour.com/kontakty">
//                   Контакти
//                 </NavDropdown.Item>
//                 <NavDropdown.Item href="https://otitour.com/oplata">
//                   Оплата
//                 </NavDropdown.Item>
//                 <NavDropdown.Divider />
//                 <NavDropdown.Item href="https://otitour.com/strahuvannya">
//                   Страхування
//                 </NavDropdown.Item>
//               </NavDropdown>
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//       {/* </header> */}
//     </>
//   );
// };

// export default Header;
import React, { useState } from "react"; // Импортируем useState
import headerCss from "./header.module.scss";
import Logo from "../../images/logo_sm.png";
import logoAdress from "../../images/Icon_Address.png";
import logoTel from "../../images/Icon_Phone.png";
import { NavLink } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Image from "react-bootstrap/Image";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";

const Header = () => {
  const [navExpanded, setNavExpanded] = useState(false); // Состояние для навигационного меню

  const handleToggle = () => {
    setNavExpanded(!navExpanded); // Переключаем состояние при клике на бургер-меню
  };

  const handleLinkClick = () => {
    setNavExpanded(false); // Закрываем меню при выборе пункта
  };

  return (
    <>
      <Navbar expand="lg" className={headerCss.bgTop}>
        <span className={headerCss.spanTop}>
          <img className={headerCss.icoTop} src={logoAdress} alt="ico" /> Львів.
          Лемківська 16
        </span>
        <span className={headerCss.spanTop}>
          <Nav.Link className={headerCss.telTop} href="tel:+380677565876">
            <img className={headerCss.icoTop} src={logoTel} alt="ico" />{" "}
            +38(067)756-58-76
          </Nav.Link>
        </span>
      </Navbar>
      <Navbar expand="lg" className={headerCss.bgbodytertiary}>
        <Container>
          <Nav.Link href="https://otitour.com/">
            <Image src={Logo} className={headerCss.navImg} />
            <div className={headerCss.brand}>
              Туристична агенція Ольги Сороки
            </div>
          </Nav.Link>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={handleToggle}
          />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className={headerCss.collapse}
            in={navExpanded}
          >
            <Nav className="me-auto">
              <Nav.Link
                className={headerCss.navLink}
                href="https://otitour.com/"
                onClick={handleLinkClick} // Закрываем меню при выборе пункта
              >
                Головна
              </Nav.Link>
              <NavDropdown
                as={NavLink}
                title="Тури Європою"
                id="basic-nav-dropdown"
                className={headerCss.navDropdown}
              >
                <NavDropdown.Item
                  as={NavLink}
                  className={headerCss.navLink}
                  to="/tango"
                  onClick={handleLinkClick} // Закрываем меню при выборе пункта
                >
                  Багато турів
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={NavLink}
                  className={headerCss.navLink}
                  to="/itravel"
                  onClick={handleLinkClick}
                >
                  Більше турів
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={NavLink}
                  className={headerCss.navLink}
                  to="/adriatic"
                  onClick={handleLinkClick}
                >
                  Ще більше турів)
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={NavLink}
                  className={`${headerCss.navLink} ${headerCss.itravel}`}
                  to="/adriatic_no_night"
                  onClick={handleLinkClick}
                >
                  Без нічних переїздів
                </NavDropdown.Item>
                {/* <NavDropdown.Item
                  as={NavLink}
                  className={`${headerCss.navLink} ${headerCss.itravel}`}
                  to="/adriatic_new_year"
                  onClick={handleLinkClick}
                >
                  Новий рік в Європі
                </NavDropdown.Item> */}
              </NavDropdown>
              {/* <Nav.Link
                as={NavLink}
                className={headerCss.navLink}
                to="/adriatic_new_year"
                onClick={handleLinkClick}
              >
                Новий рік в Європі
              </Nav.Link> */}
              <Nav.Link
                as={NavLink}
                className={headerCss.navLink}
                to="/vidviday"
                onClick={handleLinkClick}
              >
                Тури Україною
              </Nav.Link>

              <Nav.Link
                className={headerCss.navLink}
                href="https://otitour.com/pidbir-turu"
                onClick={handleLinkClick}
              >
                Підбір туру
              </Nav.Link>
              <NavDropdown
                title="Інфо"
                id="basic-nav-dropdown"
                className={headerCss.navDropdown}
              >
                <NavDropdown.Item
                  href="https://otitour.com/pro-nas"
                  onClick={handleLinkClick}
                >
                  Про нас
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="https://otitour.com/kontakty"
                  onClick={handleLinkClick}
                >
                  Контакти
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="https://otitour.com/oplata"
                  onClick={handleLinkClick}
                >
                  Оплата
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  href="https://otitour.com/strahuvannya"
                  onClick={handleLinkClick}
                >
                  Страхування
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* </header> */}
    </>
  );
};

export default Header;
