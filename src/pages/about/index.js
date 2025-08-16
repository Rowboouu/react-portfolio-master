import React from "react";
import "./style.css";
// 1. Import 'motion' from the library
import { motion } from "framer-motion";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import {
  dataabout,
  meta,
  worktimeline,
  achievements,
  services,
} from "../../content_option";

export const About = () => {
  const scrollToPage = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <HelmetProvider>
      <Container className="About-header">
        <Helmet>
          <meta charSet="utf-8" />
          <link rel="icon" type="image" href={meta.logo} />
          <title>{meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4">About me</h1>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>

        {/* --- 2. Wrap each section you want to animate in a <motion.div> --- */}
        <motion.div
          initial={{ opacity: 0, y: 100 }} // Start invisible and 100px down
          whileInView={{ opacity: 1, y: 0 }} // Animate to visible and original position
          transition={{ duration: 0.8 }} // Animation duration
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
              <table className="table caption-top">
                <tbody>
                  {worktimeline.map((data, i) => (
                    <tr key={i}>
                      <th scope="row">{data.jobtitle}</th>
                      <td>{data.where}</td>
                      <td>{data.date}</td>
                      <td>
                        <a
                          href={data.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {data.reference}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
              <table className="table caption-top">
                <tbody>
                  {achievements.map((data, i) => (
                    <tr key={i}>
                      <th scope="row">{data.title}</th>
                      <td>{data.description}</td>
                      <td>{data.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="text-center mt-4">
                <div
                  className="ac_btn btn"
                  onClick={() => scrollToPage("contact")}
                >
                  Email me for proof of achievements
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
    </HelmetProvider>
  );
};
