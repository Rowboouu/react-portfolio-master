"use client";

import { useState } from "react";
import Image from "next/image";
import "./style.css";
import { motion } from "framer-motion";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { dataportfolio } from "../../content_option";
import type { PortfolioItem } from "../../content_option";

export const Portfolio = () => {
  const [show, setShow] = useState(false);
  const [currentProject, setCurrentProject] = useState<PortfolioItem | null>(
    null,
  );

  const handleShow = (project: PortfolioItem) => {
    setCurrentProject(project);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setCurrentProject(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <Container className="About-header">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Row className="mb-5 mt-3 pt-md-3">
            <Col lg="8">
              <h1 className="display-4 mb-4"> Projects </h1>
              <hr className="t_border my-4 ml-0 text-left" />
            </Col>
          </Row>
        </motion.div>

        <motion.div
          className="mb-5 po_items_ho"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
        >
          {dataportfolio.map((data, i) => {
            const title = data.link
              .replace(/^https?:\/\//, "")
              .replace(/\/$/, "")
              .split("/")[0];
            return (
              <motion.div
                key={i}
                className="po_item"
                onClick={() => handleShow(data)}
                variants={itemVariants}
              >
                <div className="po_item__media">
                  <Image
                    src={`/images/${data.img}`}
                    alt={title}
                    width={900}
                    height={600}
                    quality={88}
                    sizes="(max-width: 600px) 100vw, (max-width: 1100px) 50vw, (max-width: 1800px) 33vw, 25vw"
                  />
                  <span
                    className={`po_item__badge po_item__badge--${data.type}`}
                  >
                    {data.type}
                  </span>
                </div>
                <div className="po_item__meta">
                  <div className="po_item__title">{title}</div>
                  <div className="po_item__role">{data.role}</div>
                </div>
                <div className="content">
                  <span className="content__cta">View Details</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="portfolio-modal-container">
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="portfolio-modal-container">
          {currentProject && (
            <>
              <p
                className={`modal-text modal-text--type modal-text--${currentProject.type}`}
              >
                <strong>
                  {currentProject.type === "university" &&
                    "*University Project*"}
                  {currentProject.type === "work" && "*Work Project*"}
                  {currentProject.type === "hobby" && "*Hobby Project*"}
                </strong>
              </p>
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
    </>
  );
};
