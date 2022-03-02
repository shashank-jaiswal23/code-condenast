import { useState } from "react";
import { motion } from "framer-motion";

import Media from "components/Media";
import { SlideUp } from "components/Animation";
import animateScrollTo from "animated-scroll-to";

const Intro = ({
  sections,
  state,
  title,
  headerTitle,
  scrollToPosition,
  changeStateToContent,
}) => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section
      id="intro"
      aria-hidden={`${state === "intro" ? "false" : "true"}`}
      className={`state-${state} active-index-${activeIndex}`}
    >
      <div id="intro-content" className="x xw xac xjc px4 py2 tac">
        <div className="text">
          {title && (
            <div id="title">
              <SlideUp>
                <h1>{title}</h1>
              </SlideUp>
            </div>
          )}

          <SlideUp>
            <div className="navigation x xw xac xjc">
              {sections &&
                sections.map((section, i) => {
                  const { fields } = section;

                  const navigate = () => {
                    changeStateToContent();
                    setTimeout(() => {
                      scrollToPosition(i);
                    }, 1);
                  };

                  const removeIndex = () => {
                    setActiveIndex(null);
                  };
                  const setIndex = () => {
                    setActiveIndex(i);

                    if (window.innerWidth < 760) {
                      setTimeout(navigate, 400);
                    }
                  };

                  let active = activeIndex === i;
                  if (activeIndex === null) active = null;

                  return (
                    <div
                      onMouseLeave={removeIndex}
                      onMouseEnter={setIndex}
                      onClick={navigate}
                      key={i}
                      className={`mx1 my1 element-hover active-${active}`}
                    >
                      <button>
                        <p>
                          {i + 1}. {fields.headerTitle}
                        </p>
                      </button>
                    </div>
                  );
                })}
            </div>
          </SlideUp>
        </div>
      </div>

      {sections &&
        sections.map((section, i) => {
          const { fields } = section;
          const active = i === activeIndex;
          return (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: active ? 1 : 0,
              }}
              transition={{
                duration: active ? 0.3 : 0.6,
              }}
              key={i}
              className="overlay"
            >
              {fields.coverMedia && (
                <Media decorative media={fields.coverMedia} />
              )}
            </motion.div>
          );
        })}

      <style jsx>{`
        .state-content {
          opacity: 0;
        }
        section {
          transition: 0.3s ease-out opacity;
          position: fixed;
          top: 0;
          z-index: 15;
          left: 0;
          height: 100vh;
          width: 100vw;
          overflow: scroll;
          opacity: 1;
        }

        #title {
          opacity: 0;
          transition: 0.3s ease-in opacity;
        }
        .active-index-null #title {
          opacity: 1;
        }

        #intro-content {
          height: 82vmin;
          width: 100%;
          overflow: scroll;
          position: relative;
          z-index: 17;
        }

        @media (max-height: 360px) {
          #intro-content {
            height: 100vh;
          }
        }

        @media (max-width: 760px) {
          #intro-content {
            height: 87vmax;
            padding-top: 4rem;
            padding-bottom: 4rem;
            padding-left: 2rem;
            padding-right: 2rem;
          }

          #title {
            max-width: 300px;
            margin: auto;
          }

          .element-hover {
            width: 100%;
            margin-bottom: 0.25rem;
            margin-top: 0.25rem;
          }
          .element-hover p {
            border-bottom: 1px solid #6c6e70;
            display: inline-block;
          }
        }

        .text {
          max-width: 800px;
        }

        .element-hover {
          cursor: pointer;
          transition: 0.3s ease-out opacity;
        }
        .element-hover.active-false {
          opacity: 0;
        }
      `}</style>

      <style jsx global>{`
        .overlay {
          position: fixed;
          height: 100vh;
          width: 100vw;
          top: 0;
          pointer-events: none;
          z-index: 16;
          left: 0;
          filter: brightness(0.8);
        }
      `}</style>
    </section>
  );
};

export default Intro;
