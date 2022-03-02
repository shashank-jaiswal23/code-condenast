import { useState, useEffect, useRef, useCallback } from "react";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { useInView } from "react-intersection-observer";
import animateScrollTo from "animated-scroll-to";

import Burst from "./Burst";
import Marquee from "./Marquee";
import Intro from "./Intro";

import Header from "components/Header";
import Footer from "components/Footer";
import Section from "components/Section";

const ScrollToElement = ({
  addToElementRefs,
  setSelectedSection,
  children,
  index,
  section,
}) => {
  const [inViewRef, inView, entry] = useInView({
    /* Optional options */
    threshold: 0,
    rootMargin: "-5%",
  });

  const ref = useRef(null);

  const setRefs = useCallback(
    (node) => {
      // Ref's from useRef needs to have the node assigned to `current`
      ref.current = node;
      // Callback refs, like the one from `useInView`, is a function that takes the node as an argument
      inViewRef(node);
    },
    [inViewRef]
  );

  useEffect(() => {
    addToElementRefs(index, ref.current);
  }, []);

  useEffect(() => {
    if (inView) setSelectedSection(index);
  }, [inView]);

  return (
    <section
      aria-label={section.fields.title}
      role="region"
      className="psr"
      ref={setRefs}
    >
      {children}

      <style jsx>{`
        section {
          z-index: 4;
        }
      `}</style>
    </section>
  );
};

const Page = (props) => {
  const [elementRefs, setElementRefs] = useState({});
  // the section thats in view
  const [selectedSection, setSelectedSection] = useState(0);
  const [state, setState] = useState("loading");
  const { data, locales, selectedLocale } = props;

  const { sections, landingSlideshow, title } = data.fields;

  useEffect(() => {
    if (state === "content") {
      enableBodyScroll();
      setTimeout(() => {
        animateScrollTo(window.scrollY + 50);
      }, 600);
    } else {
      disableBodyScroll();
    }
  }, [state]);

  const finishSlideshow = () => {
    setState("intro");
  };

  const changeStateToContent = () => {
    setState("content");
  };

  const addToElementRefs = (index, ref) => {
    setElementRefs((refs) => {
      return { ...refs, [index]: ref };
    });
  };

  const animatedScrollToPosition = (index, speed) => {
    if (elementRefs[index]) {
      animateScrollTo(elementRefs[index], {
        speed: speed,
      });

      elementRefs[index].focus();
    }
  };

  const nonAnimatedScrollToPosition = (index) => {
    if (elementRefs[index]) {
      window.scrollTo(0, elementRefs[index].offsetTop);
    }
  };

  return (
    <div role="main" id="main" className={`state-${state}`}>
      {state === "loading" && (
        <Burst
          state={state}
          finishSlideshow={finishSlideshow}
          landingSlideshow={landingSlideshow}
        />
      )}

      {state === "intro" && (
        <Intro
          changeStateToContent={changeStateToContent}
          scrollToPosition={nonAnimatedScrollToPosition}
          state={state}
          sections={sections}
          title={title}
        />
      )}

      <Marquee state={state} />

      <Header
        selectedLocale={selectedLocale}
        locales={locales}
        animatedScrollToPosition={animatedScrollToPosition}
        sections={sections}
        selectedSection={selectedSection}
        state={state}
        setState={setState}
      />

      <article
        aria-hidden={`${state === "content" ? "false" : "true"}`}
        className={`oh state-${state}`}
      >
        <main>
          {sections.map((section, i) => (
            <ScrollToElement
              setSelectedSection={setSelectedSection}
              key={i}
              index={i}
              section={section}
              addToElementRefs={addToElementRefs}
            >
              <Section key={i} {...section.fields} />
            </ScrollToElement>
          ))}
        </main>

        <Footer />
      </article>

      <style jsx>{`
        #main {
          height: 100vh;
          width: 100vw;
          overflow: hidden;
        }

        #main.state-content {
          height: auto;
          overflow: scroll;
        }

        #buffer {
          height: 101vh;
          width: 100vw;
        }

        article.state-loading,
        article.state-intro {
          opacity: 0;
          display: none;
          transform: translateX(105vw);
        }
      `}</style>
    </div>
  );
};

export default Page;
