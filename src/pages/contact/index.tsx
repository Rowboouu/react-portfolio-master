"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import "./style.css";
import { Container, Row, Col } from "react-bootstrap";
import { FaEnvelope, FaPhone, FaRegCopy, FaCheck } from "react-icons/fa";
import { contactConfig } from "../../content_option";
import "@n8n/chat/style.css";

interface ContactMethodProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}

const ContactMethod = ({ icon, label, value, href }: ContactMethodProps) => {
  const [copied, setCopied] = useState(false);

  const copy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard API failed (insecure context, permission denied, etc.)
    }
  };

  return (
    <a className="contact__method" href={href}>
      <span className="contact__method-icon">{icon}</span>
      <span className="contact__method-body">
        <span className="contact__method-label">{label}</span>
        <span className="contact__method-value">{value}</span>
      </span>
      <button
        type="button"
        className="contact__method-copy"
        onClick={copy}
        aria-label={`Copy ${label}`}
      >
        {copied ? <FaCheck /> : <FaRegCopy />}
      </button>
    </a>
  );
};

export const ContactUs = () => {
  useEffect(() => {
    let cancelled = false;
    import("@n8n/chat").then(({ createChat }) => {
      if (cancelled) return;
      createChat({
        webhookUrl:
          "https://n8n-rowboouu.onrender.com/webhook/e1b1fe08-7038-4a35-a803-4668224c2658/chat",
        initialMessages: [
          "Hi there! 👋",
          "Would you like to schedule a meeting with Brian?",
          "/* This chatbot is currently unavailable. Please contact me via email or phone. */",
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
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4">Contact Me</h1>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
      </motion.div>

      <Row className="sec_sp">
        <Col lg="5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="color_sec py-4">Get in touch</h3>
            <p className="contact__intro">{contactConfig.description}</p>
            <a
              className="ac_btn btn contact__cta"
              href={`mailto:${contactConfig.YOUR_EMAIL_1}`}
            >
              Send me an email
            </a>
          </motion.div>
        </Col>

        <Col lg="7">
          <motion.div
            className="contact__methods"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <ContactMethod
              icon={<FaEnvelope />}
              label="Email"
              value={contactConfig.YOUR_EMAIL_1}
              href={`mailto:${contactConfig.YOUR_EMAIL_1}`}
            />
            <ContactMethod
              icon={<FaEnvelope />}
              label="Alt Email"
              value={contactConfig.YOUR_EMAIL_2}
              href={`mailto:${contactConfig.YOUR_EMAIL_2}`}
            />
            {contactConfig.YOUR_PHONE && (
              <ContactMethod
                icon={<FaPhone />}
                label="Phone"
                value={contactConfig.YOUR_PHONE}
                href={`tel:${contactConfig.YOUR_PHONE.replace(/\s|\(|\)/g, "")}`}
              />
            )}

            <div className="contact__notice">
              <span className="contact__notice-dot" />
              Chat assistant temporarily offline — email is fastest.
            </div>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
};
