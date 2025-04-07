import React, { useState } from "react";
import "./style.css";
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

  return (
    <HelmetProvider>
      <Container className="About-header">
        <Helmet>
          <meta charSet="utf-8" />
          <link rel="icon" type="image" href={meta.logo} />
          <title>{meta.title}</title>{" "}
          <meta name="description" content={meta.description} />
        </Helmet>
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4"> Portfolio </h1>{" "}
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        <div className="mb-5 po_items_ho">
          {dataportfolio.map((data, i) => {
            return (
              <div key={i} className="po_item" onClick={() => handleShow(data)}>
                <img src={require(`../../assets/images/${data.img}`)} alt="" />
                <div className="content">
                  <p>Click to View Details</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>

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
