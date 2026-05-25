"use client";

import "./style.css";
import { motion } from "framer-motion";
import Image from "next/image";
import Typewriter from "typewriter-effect";
import { introdata } from "../../content_option";

const MotionImage = motion.create(Image);

export const Home = () => {
  const scrollToPage = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="home">
      <div className="intro_sec d-block d-lg-flex align-items-center ">
        <motion.div
          className="scroll__cue"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          onClick={() => scrollToPage("about")}
          style={{ cursor: "pointer", pointerEvents: "auto" }}
        >
          <span>Scroll</span>
          <div className="arrow" />
        </motion.div>
        <MotionImage
          className="h_bg-image order-1 order-lg-2 h-100"
          src={introdata.your_img_url}
          alt={introdata.title}
          width={1500}
          height={1000}
          quality={90}
          priority
          sizes="(max-width: 991px) 100vw, 50vw"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        <motion.div
          className="text order-2 order-lg-1 h-100 d-lg-flex justify-content-center"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="align-self-center ">
            <div className="intro mx-auto">
              <div className="hero__eyebrow">Portfolio</div>
              <h1 className="hero__name">{introdata.title}</h1>
              <h2 className="hero__role">
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
              </h2>
              <p className="hero__desc">{introdata.description}</p>
              <div className="intro_btn-action pb-5">
                <div
                  id="button_p"
                  className="ac_btn btn text_2"
                  onClick={() => scrollToPage("portfolio")}
                >
                  My Projects
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
  );
};
