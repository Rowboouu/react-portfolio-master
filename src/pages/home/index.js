import React from "react";
import "./style.css";
// 1. Import 'motion' from the library
import { motion } from "framer-motion";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Typewriter from "typewriter-effect";
import { introdata, meta } from "../../content_option";

export const Home = () => {
  const scrollToPage = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <HelmetProvider>
      <section id="home" className="home">
        <Helmet>
          <meta charSet="utf-8" />
          <link rel="icon" type="image" href={meta.logo} />
          <title>{meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <div className="intro_sec d-block d-lg-flex align-items-center ">
          {/* 2. Convert <img> to <motion.img> and add animation props */}
          <motion.img
            className="h_bg-image order-1 order-lg-2 h-100"
            src={introdata.your_img_url}
            alt="my image"
            initial={{ opacity: 0, x: 100 }} // Start invisible and 100px to the right
            whileInView={{ opacity: 1, x: 0 }} // Animate to visible and original position
            transition={{ duration: 0.8, delay: 0.2 }} // Add a slight delay
          ></motion.img>

          {/* 3. Convert the text container <div> to <motion.div> */}
          <motion.div
            className="text order-2 order-lg-1 h-100 d-lg-flex justify-content-center"
            initial={{ opacity: 0, x: -100 }} // Start invisible and 100px to the left
            whileInView={{ opacity: 1, x: 0 }} // Animate to visible and original position
            transition={{ duration: 0.8 }}
          >
            <div className="align-self-center ">
              <div className="intro mx-auto">
                <h2 className="mb-1x">{introdata.title}</h2>
                <h1 className="fluidz-48 mb-1x">
                  <Typewriter
                    options={{
                      strings: [
                        introdata.animated.first,
                        introdata.animated.second,
                        introdata.animated.third,
                      ],
                      autoStart: true,
                      loop: true,
                      deleteSpeed: 10,
                    }}
                  />
                </h1>
                <p className="mb-1x">{introdata.description}</p>
                <div className="intro_btn-action pb-5">
                  <div
                    id="button_p"
                    className="ac_btn btn text_2"
                    onClick={() => scrollToPage("portfolio")}
                  >
                    My Portfolio
                    <div className="ring one"></div>
                    <div className="ring two"></div>
                    <div className="ring three"></div>
                  </div>
                  <div
                    id="button_h"
                    className="ac_btn btn"
                    onClick={() => scrollToPage("contact")}
                  >
                    Contact Me
                    <div className="ring one"></div>
                    <div className="ring two"></div>
                    <div className="ring three"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </HelmetProvider>
  );
};
