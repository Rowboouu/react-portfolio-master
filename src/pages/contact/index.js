import React, { useEffect } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { meta } from "../../content_option";
import { Container, Row, Col } from "react-bootstrap";
import { contactConfig } from "../../content_option";
import "@n8n/chat/style.css";
import { createChat } from "@n8n/chat";

export const ContactUs = () => {
  useEffect(() => {
    createChat({
      webhookUrl:
        "https://miles1000.app.n8n.cloud/webhook/e1b1fe08-7038-4a35-a803-4668224c2658/chat",
      initialMessages: [
        "Hi there! 👋",
        "Would you like to schedule a meeting with Brian?",
      ],
      i18n: {
        en: {
          title: "Hi there! 👋",
          subtitle: "Start a chat. We're here to help you 24/7.",
          footer: "",
          getStarted: "New Conversation",
          inputPlaceholder: "Chat here..",
        },
      },
    });
  }, []);

  return (
    <HelmetProvider>
      <Container>
        <Helmet>
          <meta charSet="utf-8" />
          <link rel="icon" type="image" href={meta.logo} />
          <title>{meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4">Contact Me</h1>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        <Row className="sec_sp">
          <h3 className="color_sec py-4">Get in touch</h3>
          <address>
            <strong>Email:</strong>{" "}
            <a href={`mailto:${contactConfig.YOUR_EMAIL}`}>
              {contactConfig.YOUR_EMAIL}
            </a>
            <br />
            <br />
            {contactConfig.hasOwnProperty("YOUR_FONE") ? (
              <p>
                <strong>Phone:</strong> {contactConfig.YOUR_FONE}
              </p>
            ) : (
              ""
            )}
          </address>
          <p>{contactConfig.description}</p>
        </Row>
      </Container>
    </HelmetProvider>
  );
};
