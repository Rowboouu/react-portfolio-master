"use client";

import { useState, useEffect } from "react";
import "./style.css";
import { VscGrabber, VscClose } from "react-icons/vsc";
import { logo, socialprofils } from "../content_option";
import Themetoggle from "../components/themetoggle";

const Headermain = () => {
  const [isActive, setActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle mobile menu toggle
  const handleToggle = () => {
    setActive(!isActive);
    document.body.classList.toggle("ovhidden");
  };

  // Detect scroll position for header background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Scroll to page section function
  const scrollToPage = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // Close mobile menu if open
      if (isActive) {
        handleToggle();
      }

      // Scroll to the element with smooth behavior
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      {/* Header */}
      <header className={`site__header ${scrolled ? "scrolled" : ""}`}>
        <div className="d-flex align-items-center justify-content-between">
          {/* Logo */}
          <button
            className="navbar-brand nav_ac"
            onClick={() => scrollToPage("home")}
          >
            <img src={logo.logo} className="logo"></img>
          </button>

          {/* Desktop Navigation */}
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

          {/* Theme Toggle and Mobile Menu Button */}
          <div className="d-flex align-items-center">
            <Themetoggle />
            <button
              className="menu__button nav_ac mobile__only"
              onClick={handleToggle}
            >
              {!isActive ? <VscGrabber /> : <VscClose />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
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

      {/* Border elements */}
      <div className="br-top"></div>
      <div className="br-right"></div>
      <div className="br-left"></div>

      {/* Footer */}
      <footer className={`site__footer ${scrolled ? "scrolled" : ""}`}>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center w-100 p-3">
          <div className="d-flex">
            <a href={socialprofils.facebook}>Facebook</a>
            <a href={socialprofils.github}>Github</a>
          </div>
        </div>
      </footer>

      {/* Bottom border */}
      <div className="br-bottom"></div>
    </>
  );
};

export default Headermain;
