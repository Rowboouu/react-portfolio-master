import React, { useState } from "react";
import "./style.css";
// 1. Import 'motion' from the library
import { motion } from "framer-motion";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { dataportfolio, meta } from "../../content_option";

export const Portfolio = () => {
  const [show, setShow] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  const handleShow = (project) => {
    setCurrentProject(project);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setCurrentProject(null);
  };

  // 2. Define animation variants for the container and items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // This will delay each child's animation by 0.2s
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 }, // Start invisible and 50px down
    visible: { opacity: 1, y: 0 }, // Animate to visible and original position
  };

  return (
    <HelmetProvider>
      <Container className="About-header">
        <Helmet>
          <meta charSet="utf-8" />
          <link rel="icon" type="image" href={meta.logo} />
          <title>{meta.title}</title>{" "}
          <meta name="description" content={meta.description} />
        </Helmet>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Row className="mb-5 mt-3 pt-md-3">
            <Col lg="8">
              <h1 className="display-4 mb-4"> Portfolio </h1>{" "}
              <hr className="t_border my-4 ml-0 text-left" />
            </Col>
          </Row>
        </motion.div>

        {/* 3. Apply the container variants to the parent div */}
        <motion.div
          className="mb-5 po_items_ho"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
        >
          {dataportfolio.map((data, i) => {
            return (
              // 4. Apply the item variants to each child div
              <motion.div
                key={i}
                className="po_item"
                onClick={() => handleShow(data)}
                variants={itemVariants} // The magic happens here!
              >
                <img src={require(`../../assets/images/${data.img}`)} alt="" />
                <div className="content">
                  <p>Click to View Details</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>

      {/* The Modal logic remains completely untouched */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="portfolio-modal-container">
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="portfolio-modal-container">
          {currentProject && (
            <>
              <p className="modal-text">{currentProject.description}</p>
              <p className="modal-text">
                Role:
                <br />
                {currentProject.role}
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer className="portfolio-modal-container">
          {currentProject && (
            <Button
              variant="secondary"
              href={currentProject.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Project
            </Button>
          )}
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </HelmetProvider>
  );
};
