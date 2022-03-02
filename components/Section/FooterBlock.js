import { useInView } from "react-intersection-observer";
import animateScrollTo from "animated-scroll-to";

import { RawMedia } from "components/Media";
import Button from "components/Button";
import { SlideUp } from "components/Animation";

const scrollToTop = () => {
  animateScrollTo(0);
};

const FooterBlock = ({ title, media }) => {
  const [firstRef, inViewFirst] = useInView();
  const [secondRef, inViewSecond] = useInView();
  const [thirdRef, inViewThird] = useInView();

  return (
    <section className={`footer-block psr z2`}>
      <div
        className={`media-block fade-to-black-${inViewThird} fade-to-low-${inViewSecond} inview-${inViewFirst}`}
      >
        {media && <RawMedia absolute={false} media={media} />}
      </div>

      <div className="bottom-checker psa" ref={firstRef} />

      {title && (
        <SlideUp>
          <div className="title-section tac mxa px2">
            <h1>{title}</h1>
          </div>
        </SlideUp>
      )}

      <div className="s2t mt2 mxa tac back2top">
        <SlideUp>
          <div className="dib mxa curp tac" onClick={scrollToTop}>
            <Button>
              <button>Back to Top</button>
            </Button>
          </div>
        </SlideUp>
      </div>

      <div ref={secondRef} className="fade-to-low-checker" />
      <div ref={thirdRef} className="fade-to-black-checker" />

      <style jsx global>{`
        .footer-block video {
          height: 100%;
          width: 100%;
          object-fit: cover;
        }
      `}</style>

      <style jsx>{`
        .media-block {
          width: 100vw;
          position: absolute;
          top: 0;
          left: 0;
          height: 100vh;
          transition: 0.7s ease-out opacity;
        }

        .media-block.inview-true {
          position: fixed;
          top: 0vh;
          left: 0;
        }

        .media-block.fade-to-black-true {
          opacity: 0;
        }

        .fade-to-black-checker {
          position: absolute;
          top: 205vh;
          left: 0;
          height: 100vh;
          width: 100%;
          pointer-events: none;
        }

        .title-section {
          padding-top: 130vh;
          z-index: 3;
          position: relative;
          max-width: 1200px;
        }

        .fade-to-low-true {
          opacity: 0.3;
        }

        .back2top {
          z-index: 3;
          position: relative;
          margin-bottom: 4rem;
        }

        .fade-to-low-checker {
          margin-bottom: 50vh;
        }

        .bottom-checker {
          top: 100vh;
          left: 0;
          width: 100%;
        }

        .media,
        .bottom-checker {
          height: 100vh;
        }

        .footer-block {
          background-color: black;
        }

        h1 {
          line-height: 1.45;
        }

        @media (max-width: 760px) {
          .media-block {
            width: 100%;
          }
          .footer-block {
            padding-top: 4rem;
            padding-bottom: 4rem;
          }
        }
      `}</style>
    </section>
  );
};

export default React.memo(FooterBlock);
