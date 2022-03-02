import animateScrollTo from "animated-scroll-to";

export const footerLinks = [
  {
    title: "User Agreement",
    link: "https://www.condenast.com/user-agreement",
  },
  {
    title: "Privacy",
    link: "https://www.condenast.com/privacy-policy",
  },
  {
    title: "Cookie Policy",
    link: "https://www.condenast.com/cookie-policy",
  },
  {
    title: "Modern Slavery Statement",
    link: "https://www.condenast.com/modern-slavery-policy-statement",
  },
  {
    title: "Tax Strategy",
    link: "https://www.condenast.com/tax-strategy",
  },
  {
    title: "Code of Conduct",
    link: "https://www.condenast.com/codes-of-conduct",
  },
  {
    title: "US Advertising T&CS",
    link:
      "https://www.condenast.com/advertising-terms-conditions/#termsandconditions",
  },
];

const scrollToTop = () => {
  animateScrollTo(0);
};

const Footer = () => {
  return (
    <footer className="py1 bgc-b psr z2">
      <section onClick={scrollToTop} className="footer-logo px1 curp">
        <img src="/svgs/conde-footer-svg.svg" alt="Condé Nast" />
      </section>

      <section className="x xw xjb footer-links">
        <nav>
          {footerLinks.map((link, i) => (
            <a
              className="nav-link mx1 my1 dib"
              key={link.link}
              href={link.link}
            >
              {link.title}
            </a>
          ))}
        </nav>
        <div>
          <div className="nav-link no-hover px1 my1">
            Copyright 2020 Condé Nast. All rights reserved
          </div>
        </div>
      </section>

      <style jsx>{`
        .footer-links {
          color: #808080;
        }

        footer {
          position: relative;
          z-index: 6;
        }

        .nav-link.no-hover:hover {
          opacity: 1;
          cursor: default;
        }

        .footer-links a {
          transition: 0.3s ease-out color;
        }

        .footer-links a:hover {
          color: #fff;
          opacity: 1;
        }

        @media (max-width: 760px) {
          .footer-logo {
            margin-bottom: 2rem;
          }

          footer {
            padding-top: 6rem;
          }
          a {
            display: block;
            margin-bottom: 0;
            margin-top: 0.4rem;
          }
        }
      `}</style>
    </footer>
  );
};

export default React.memo(Footer);
