"use client";

import "./style.css";
import { motion } from "framer-motion";
import { Container, Row, Col } from "react-bootstrap";
import {
  dataabout,
  worktimeline,
  achievements,
  services,
} from "../../content_option";

export const About = () => {
  const scrollToPage = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Container className="About-header">
      <Row className="mb-5 mt-3 pt-md-3">
        <Col lg="8">
          <h1 className="display-4 mb-4">About me</h1>
          <hr className="t_border my-4 ml-0 text-left" />
        </Col>
      </Row>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Row className="sec_sp">
          <Col lg="5">
            <h3 className="color_sec py-4">{dataabout.title}</h3>
          </Col>
          <Col lg="7" className="d-flex align-items-center">
            <div>
              <p>{dataabout.aboutme}</p>
            </div>
          </Col>
        </Row>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Row className="sec_sp">
          <Col lg="5">
            <h3 className="color_sec py-4">Work Timeline</h3>
          </Col>
          <Col lg="7">
            <ol className="timeline">
              {worktimeline.map((data, i) => (
                <motion.li
                  key={i}
                  className="timeline__item"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="timeline__date">{data.date}</div>
                  <h4 className="timeline__title">{data.jobtitle}</h4>
                  <div className="timeline__where">{data.where}</div>
                  <div className="timeline__ref">
                    Reference:{" "}
                    <a
                      href={data.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {data.reference}
                    </a>
                  </div>
                </motion.li>
              ))}
            </ol>
          </Col>
        </Row>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Row className="sec_sp">
          <Col lg="5">
            <h3 className="color_sec py-4">Achievements</h3>
          </Col>
          <Col lg="7">
            <ul className="about__list">
              {achievements.map((data, i) => (
                <motion.li
                  key={i}
                  className="about__list-item"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="date">{data.date}</div>
                  <div className="title">{data.title}</div>
                  <div className="description">{data.description}</div>
                </motion.li>
              ))}
            </ul>
            <div className="text-center mt-4">
              <div
                className="ac_btn btn"
                onClick={() => scrollToPage("contact")}
              >
                Email me to learn more
              </div>
            </div>
          </Col>
        </Row>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Row className="sec_sp">
          <Col lg="5">
            <h3 className="color_sec py-4">Services</h3>
          </Col>
          <Col lg="7">
            {services.map((data, i) => (
              <div className="service_ py-4" key={i}>
                <h5 className="service__title">{data.title}</h5>
                <p className="service_desc">{data.description}</p>
              </div>
            ))}
          </Col>
        </Row>
      </motion.div>
    </Container>
  );
};
