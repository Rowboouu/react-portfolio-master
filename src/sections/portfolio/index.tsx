"use client";

import { useState } from "react";
import Image from "next/image";
import "./style.css";
import { motion } from "framer-motion";
import { Container, Row, Col, Modal } from "react-bootstrap";
import { FaExternalLinkAlt } from "react-icons/fa";
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
                    alt={data.title}
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
                  <div className="po_item__title">{data.title}</div>
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

      {/* `scrollable` caps the dialog height and scrolls the body instead of
          the page, so long project write-ups stay readable on short screens. */}
      <Modal show={show} onHide={handleClose} scrollable>
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
              <ul className="modal-highlights">
                {currentProject.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              <p className="modal-text">
                Role:
                <br />
                {currentProject.role}
              </p>
              {currentProject.portfolioSafe && (
                <div className="modal-note">
                  <span className="modal-note__label">
                    Production work, sanitized for this portfolio
                  </span>
                  {currentProject.originalName && (
                    <p className="modal-note__original">
                      Known internally as{" "}
                      <strong>{currentProject.originalName}</strong>
                    </p>
                  )}
                  <p className="modal-note__body">
                    {currentProject.portfolioSafe}
                  </p>
                </div>
              )}
            </>
          )}
        </Modal.Body>
        {/* Plain elements rather than react-bootstrap Buttons: the default
            variants ship their own colours, and overriding them costs more
            specificity than styling from scratch. Close comes first so the
            primary action sits rightmost. */}
        <Modal.Footer className="portfolio-modal-container modal-actions">
          <button
            type="button"
            className="modal-btn modal-btn--ghost"
            onClick={handleClose}
          >
            Close
          </button>
          {currentProject && (
            <a
              className="modal-btn modal-btn--primary"
              href={currentProject.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Project
              <FaExternalLinkAlt aria-hidden />
            </a>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};
