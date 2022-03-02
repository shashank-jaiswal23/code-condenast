import { useEffect, useState, useRef } from "react";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { motion } from "framer-motion";
import FocusTrap from "focus-trap-react";

import SEO from "components/SEO";
import LanguageSelector from "components/LanguageSelector";

import Button from "components/Button";
import { footerLinks } from "components/Footer";

const Header = ({
  animatedScrollToPosition,
  locales,
  selectedLocale,
  state,
  sections,
  selectedSection,
  setState,
}) => {
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const popup = useRef(null);

  const bringToIntro = () => {
    if (state === "content") {
      setState("intro");
    }
  };

  const toggleMobileHeader = () => {
    setMobileExpanded(!mobileExpanded);
  };

  useEffect(() => {
    if (mobileExpanded && popup.current) {
      popup.current.focus();
    }
  }, [mobileExpanded]);

  useEffect(() => {
    const closeHeaderWEsc = (e) => {
      if (e.keyCode == 27) {
        setMobileExpanded(false);
      }
    };
    window.addEventListener("keyup", closeHeaderWEsc);

    return () => {
      window.removeEventListener("click", closeHeaderWEsc);
    };
  }, []);

  return (
    <motion.header
      initial={{
        y: -30,
      }}
      animate={{
        y: state === "loading" ? -30 : 0,
      }}
      transition={{
        duration: 0.6,
      }}
    >
      <header className={`state-${state}`}>
        <div onClick={bringToIntro} id="logo" className=" curp psf px1 py1">
          <h5>The Condé Code</h5>
        </div>

        <div id="to-conde" className=" no-margin curp psf px1 py1">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://condenast.com"
          >
            <Button lowOpacity>condenast.com</Button>
          </a>
        </div>

        <SEO />

        <nav
          aria-hidden={`${state === "content" ? "false" : "true"}`}
          className={`x xw xjb`}
        >
          {sections &&
            sections.map((s, i) => {
              const navigate = () => {
                animatedScrollToPosition(i, 300);
              };

              const active = selectedSection === i;

              return (
                <div className={` small active-${active}`}>
                  <button
                    tabIndex={`${state === "content" ? "1" : "-1"}`}
                    onClick={navigate}
                  >
                    <p>
                      {i + 1}. {s.fields.headerTitle}
                    </p>
                  </button>
                </div>
              );
            })}
        </nav>

        <div id="share-links" className="curp psf px1 py1 x xw xjb">
          <LanguageSelector
            onChange={() => {
              setMobileExpanded(false);
            }}
            locales={locales}
            selectedLocale={selectedLocale}
          />
          <h6>Share:</h6>
          <div className="social-icons x xw xac mxa mb2 xjb">
            <div className="sm-icon ">
              <a
                aria-label="Condé Nast Twitter"
                href="https://twitter.com/condenast"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/svgs/twitter.svg" alt="Condé Nast Twitter" />
              </a>
            </div>
            <div className="sm-icon ">
              <a
                aria-label="Condé Nast Instagram"
                href="https://www.instagram.com/condenast/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/svgs/ig.svg" alt="Condé Nast Instagram" />
              </a>
            </div>
            <div className="sm-icon ">
              <a
                aria-label="Condé Nast LinkedIn"
                href="https://www.linkedin.com/company/conde-nast-international"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/svgs/linkedin.svg" alt="Condé Nast LinkedIn" />
              </a>
            </div>
          </div>
        </div>

        {!mobileExpanded && (
          <button
            onClick={toggleMobileHeader}
            className="mobile-expander mobile curp"
          >
            <img src="/svgs/mobile-open.svg" alt="Open navigation" />
          </button>
        )}

        <aside
          id="mobile-nav"
          role="dialog"
          aria-modal={mobileExpanded}
          className="psf t0 l0 bgc-b c-b"
          ref={popup}
        >
          <motion.div
            className="oh"
            initial={{
              height: 0,
            }}
            animate={{
              height: mobileExpanded ? "auto" : 0,
            }}
            transition={{
              duration: 0.6,
            }}
          >
            <div id="mobile-nav-parent">
              {mobileExpanded && (
                <FocusTrap>
                  <div>
                    <button
                      onClick={toggleMobileHeader}
                      className="mobile-expander mobile curp"
                    >
                      <img src="/svgs/mobile-x.svg" alt="Close navigation" />
                    </button>
                    <div
                      onClick={toggleMobileHeader}
                      id="logo"
                      className=" curp px1 py1"
                    >
                      <h5>The Condé Code</h5>
                    </div>

                    <div className="mobile-nav-items px1 py1 mb2">
                      {sections &&
                        sections.map((s, i) => {
                          const navigate = () => {
                            setMobileExpanded(false);
                            animatedScrollToPosition(i, 300);
                          };

                          return (
                            <button onClick={navigate} className={`db small`}>
                              <h5>
                                {i + 1} <span className="pr1"> </span>{" "}
                                {s.fields.headerTitle}
                              </h5>
                            </button>
                          );
                        })}
                    </div>

                    <section className="footer-links px1">
                      <div className="mb1">
                        {footerLinks.map((link, i) => (
                          <a
                            className="nav-link db"
                            key={link.link}
                            href={link.link}
                          >
                            {link.title}
                          </a>
                        ))}
                      </div>
                      <div>
                        <div className="nav-link">
                          Copyright 2020 Condé Nast. All rights reserved
                        </div>
                      </div>
                    </section>
                    <div className="px1 py1">
                      <LanguageSelector
                        onChange={() => {
                          setMobileExpanded(false);
                        }}
                        locales={locales}
                        selectedLocale={selectedLocale}
                      />
                      <a
                        href="https://condenast.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button>condenast.com</Button>
                      </a>
                    </div>
                  </div>
                </FocusTrap>
              )}
            </div>
          </motion.div>
        </aside>
      </header>

      <style jsx>{`
        header {
          z-index: 20;
        }
      `}</style>

      <style jsx>{`
        #logo,
        #to-conde {
          top: 0;
          left: 0;
          z-index: 30;
        }

        .mobile-expander {
          width: 1.25rem;
          position: fixed;
          top: 1rem;
          right: 1rem;
          z-index: 32;
          display: none;
        }

        #mobile-nav {
          z-index: 31;
        }

        #mobile-nav-parent {
          height: 100vh;
          padding-bottom: 0;
          overflow: scroll;
          -webkit-overflow-scrolling: touch;
          width: 100vw;
          background-color: #caccce;
        }

        .nav-link {
          margin-bottom: 0.5rem;
        }

        nav {
          position: fixed;
          top: 0.2rem;
          left: 50%;
          transform: translateX(-50%) translateY(-100px);
          z-index: 99;
          transition: 0.8s ease-in-out transform;
          transition-delay: 0.8s;
        }

        .state-content nav {
          transform: translateX(-50%) translateY(0px);
        }
        nav div {
          margin: 0.8rem;
          cursor: pointer;
          opacity: 0.5;
          transition: 0.3s ease-out opacity, 0.3s ease-out border;
          border-bottom: 0px solid white;
        }

        nav div:hover {
          opacity: 0.8;
        }

        nav div p {
          margin-bottom: 0;
        }

        nav div.active-true {
          opacity: 1;
          border-bottom: 1px solid white;
        }

        #share-links {
          top: 0;
          right: 0;
          z-index: 31;
        }

        #share-links h6 {
          transform: translateY(2px);
          margin-right: 0.56rem;
        }

        .sm-icon {
          width: 1.33rem;
          transition: 0.3s ease-out opacity;
          margin-left: 0.26rem;
        }

        .sm-icon:hover {
          opacity: 0.56;
        }

        header.state-content #logo,
        header.state-intro #to-conde {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        #logo,
        #to-conde {
          opacity: 0;
          visibility: hidden;
          transform: translateY(-4rem);
          transition: 0.4s ease-out opacity, 0.4s ease-out transform,
            0.4s ease-out visibility;
          transition-delay: 0.3s;
        }

        @media (max-width: 800px) {
          nav,
          #share-links {
            display: none;
          }

          .mobile-expander {
            display: block;
          }
        }
      `}</style>
    </motion.header>
  );
};

export default Header;
