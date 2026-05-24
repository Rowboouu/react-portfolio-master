"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import "./style.css";
import { VscGrabber, VscClose } from "react-icons/vsc";

const Headermain = () => {
  const [isActive, setActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleToggle = () => {
    setActive(!isActive);
    document.body.classList.toggle("ovhidden");
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToPage = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      if (isActive) {
        handleToggle();
      }
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      <header className={`site__header ${scrolled ? "scrolled" : ""}`}>
        <div className="d-flex align-items-center justify-content-between">
          <button
            className="navbar-brand nav_ac brand__mark"
            onClick={() => scrollToPage("home")}
            aria-label="Home"
          >
            <Image
              src="/images/logo.png"
              alt="Brian James Concillo"
              width={42}
              height={42}
              className="brand__img"
              priority
            />
          </button>

          <div className="desktop__navigation">
            <ul className="nav__links">
              <li className="nav__item">
                <button onClick={() => scrollToPage("home")}>Home</button>
              </li>
              <li className="nav__item">
                <button onClick={() => scrollToPage("about")}>About</button>
              </li>
              <li className="nav__item">
                <button onClick={() => scrollToPage("portfolio")}>
                  Portfolio
                </button>
              </li>
              <li className="nav__item">
                <button onClick={() => scrollToPage("contact")}>Contact</button>
              </li>
            </ul>
          </div>

          <div className="d-flex align-items-center">
            <button
              className="menu__button nav_ac mobile__only"
              onClick={handleToggle}
            >
              {!isActive ? <VscGrabber /> : <VscClose />}
            </button>
          </div>
        </div>

        <div className={`site__navigation ${isActive ? "menu__opend" : ""}`}>
          <div className="bg__menu h-100">
            <div className="menu__wrapper">
              <div className="menu__container p-3">
                <ul className="the_menu">
                  <li className="menu_item">
                    <button
                      onClick={() => scrollToPage("home")}
                      className="my-3"
                    >
                      Home
                    </button>
                  </li>
                  <li className="menu_item">
                    <button
                      onClick={() => scrollToPage("about")}
                      className="my-3"
                    >
                      About
                    </button>
                  </li>
                  <li className="menu_item">
                    <button
                      onClick={() => scrollToPage("portfolio")}
                      className="my-3"
                    >
                      Portfolio
                    </button>
                  </li>
                  <li className="menu_item">
                    <button
                      onClick={() => scrollToPage("contact")}
                      className="my-3"
                    >
                      Contact
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>

    </>
  );
};

export default Headermain;
