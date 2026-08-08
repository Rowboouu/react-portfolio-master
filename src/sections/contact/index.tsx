"use client";

import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import "./style.css";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaEnvelope,
  FaPhone,
  FaRegCopy,
  FaCheck,
  FaSpinner,
} from "react-icons/fa";
import { contactConfig } from "../../content_option";

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

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
  /** Honeypot — hidden from real users, so any value means a bot. */
  website: string;
};

const EMPTY_FORM: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
  website: "",
};

type Status = "idle" | "sending" | "sent" | "error";

const ContactForm = () => {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const update = (key: keyof FormState) => (value: string) => {
    setForm((current) => ({ ...current, [key]: value }));

    // A finished result no longer describes what is in the form. Only clear
    // terminal states — never "sending", which owns the disabled/spinner UI.
    setStatus((current) =>
      current === "sent" || current === "error" ? "idle" : current,
    );
    setMessage((current) => (current ? "" : current));

    setFieldErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    setMessage("");
    setFieldErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const body = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        errors?: Record<string, string>;
      };

      if (!response.ok) {
        setStatus("error");
        setFieldErrors(body.errors ?? {});
        setMessage(
          body.error ??
            `Something went wrong. Please email me at ${contactConfig.YOUR_EMAIL_1} instead.`,
        );
        return;
      }

      setStatus("sent");
      setForm(EMPTY_FORM);
      setMessage("Thanks — your message is on its way. I'll get back to you soon.");
    } catch {
      setStatus("error");
      setMessage(
        `Couldn't reach the server. Please email me at ${contactConfig.YOUR_EMAIL_1} instead.`,
      );
    }
  };

  const sending = status === "sending";

  return (
    <form className="contact__form" onSubmit={onSubmit} noValidate>
      <div className="contact__form-row">
        <div className="contact__field">
          <label htmlFor="contact-name">Name</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={(event) => update("name")(event.target.value)}
            disabled={sending}
            maxLength={120}
            required
            aria-invalid={Boolean(fieldErrors.name)}
          />
          {fieldErrors.name && (
            <span className="contact__field-error">{fieldErrors.name}</span>
          )}
        </div>

        <div className="contact__field">
          <label htmlFor="contact-email">Email</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(event) => update("email")(event.target.value)}
            disabled={sending}
            maxLength={254}
            required
            aria-invalid={Boolean(fieldErrors.email)}
          />
          {fieldErrors.email && (
            <span className="contact__field-error">{fieldErrors.email}</span>
          )}
        </div>
      </div>

      <div className="contact__field">
        <label htmlFor="contact-subject">
          Subject <span className="contact__field-optional">optional</span>
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          value={form.subject}
          onChange={(event) => update("subject")(event.target.value)}
          disabled={sending}
          maxLength={200}
          aria-invalid={Boolean(fieldErrors.subject)}
        />
        {fieldErrors.subject && (
          <span className="contact__field-error">{fieldErrors.subject}</span>
        )}
      </div>

      <div className="contact__field">
        <label htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={form.message}
          onChange={(event) => update("message")(event.target.value)}
          disabled={sending}
          maxLength={5000}
          required
          aria-invalid={Boolean(fieldErrors.message)}
        />
        {fieldErrors.message && (
          <span className="contact__field-error">{fieldErrors.message}</span>
        )}
      </div>

      {/* Honeypot: off-screen and hidden from assistive tech. */}
      <div className="contact__honeypot" aria-hidden>
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(event) => update("website")(event.target.value)}
        />
      </div>

      <div className="contact__form-footer">
        <button type="submit" className="ac_btn btn" disabled={sending}>
          {sending ? (
            <>
              <FaSpinner className="contact__spinner" /> Sending
            </>
          ) : (
            "Send message"
          )}
        </button>

        {message && (
          <p
            className={`contact__form-message contact__form-message--${
              status === "sent" ? "ok" : "error"
            }`}
            role="status"
          >
            {message}
          </p>
        )}
      </div>
    </form>
  );
};

export const ContactUs = () => {
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

            <div className="contact__methods">
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
            </div>
          </motion.div>
        </Col>

        <Col lg="7">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h3 className="color_sec py-4">Send a message</h3>
            <ContactForm />
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
};
