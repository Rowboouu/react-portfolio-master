import { FaGithub, FaLinkedin, FaFacebookF } from "react-icons/fa";
import { socialprofils } from "../../content_option";

const Footer = () => {
  return (
    <footer className="site__footer">
      <div className="site__footer-inner">
        <div className="site__footer-name">
          &copy; {new Date().getFullYear()} Brian James Concillo
        </div>
        <div className="site__footer-socials">
          {socialprofils.github && (
            <a
              href={socialprofils.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
          )}
          {socialprofils.linkedin && (
            <a
              href={socialprofils.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
          )}
          {socialprofils.facebook && (
            <a
              href={socialprofils.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
