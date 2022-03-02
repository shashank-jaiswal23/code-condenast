import { useInView } from "react-intersection-observer";

import Media from "components/Media";
import { SlideUp } from "components/Animation";

const Cover = ({ coverMedia, landingText }) => {
  const [ref, inView] = useInView();

  return (
    <>
      {coverMedia && (
        <div className="cover-section x xw xac xjc psr">
          <span className={`media inview-${inView}`}>
            <Media
              enforceInitialLoad={true}
              decorative
              alwaysShow
              media={coverMedia}
            />
          </span>

          {landingText && (
            <div className="text-group mxa px2">
              <SlideUp>
                <h1>{landingText}</h1>
              </SlideUp>
            </div>
          )}

          <div className="bottom-checker psa" ref={ref} />
        </div>
      )}

      <style jsx>{`
        .cover-section {
          width: 100%;
          position: relative;
        }

        .bottom-checker {
          top: 100vh;
          left: 0;
          width: 100%;
        }

        .cover-section,
        .bottom-checker,
        .media {
          min-height: 100vh;
        }

        .cover-section,
        .bottom-checker {
        }

        .media {
          filter: brightness(0.8);
          position: absolute;
          width: 100%;
          background-color: #000;
        }

        .media.inview-true {
          position: fixed;
          top: 0vh;
          left: 0;
        }

        .text-group {
          text-align: center;
          position: relative;
          z-index: 10;
          max-width: 1200px;
          width: 70%;
        }

        @media (max-width: 760px) {
          .text-group {
            max-width: 500px;
            width: 100%;
          }
        }
      `}</style>
    </>
  );
};

export default Cover;
