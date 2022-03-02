import { useRef, useEffect, useState } from "react";
import Media from "components/Media";
import { SlideUp } from "components/Animation";
import { useInView } from "react-intersection-observer";

const InlineImage = ({ data, content }) => {
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [boundingBox, setBoundingBox] = useState(null);
  const [showImage, setShowImage] = useState(false);

  const ref = useRef(null);
  const [inViewRef, inView] = useInView();

  useEffect(() => {
    const defineBox = () => {
      setBoundingBox(ref.current.getBoundingClientRect());
    };

    defineBox();

    setTimeout(defineBox, 1000);
    window.addEventListener("resize", defineBox);

    return () => {
      window.removeEventListener("resize", defineBox);
    };
  }, []);

  useEffect(() => {
    const defineBox = () => {
      setBoundingBox(ref.current.getBoundingClientRect());
    };

    if (inView) defineBox();
  }, [inView]);

  const revealImage = () => {
    setShowImage(true);
  };

  const hideImage = () => {
    setShowImage(false);
  };

  const handleMouseMove = (e) => {
    if (window.innerWidth < 760) return false;
    setTranslate({
      x: (boundingBox.x + boundingBox.width / 2 - e.clientX) / 5 + "%",
    });
  };

  const handleMouseEnter = (e) => {
    revealImage();
  };

  const handleTapOut = () => {
    setTimeout(() => {
      hideImage();
    }, 800);
  };

  return (
    <div
      ref={inViewRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={hideImage}
      onTouchStart={revealImage}
      onTouchEnd={handleTapOut}
      className={`inline-image dib psr showing-image-${showImage}`}
    >
      <div className="media-block di">
        <div
          className="el-to-transform"
          style={{
            transform: `translateX(${translate.x})`,
          }}
        >
          {data.target && (
            <>
              <div className="media-relative">
                <Media decorative absolute={false} media={data.target} />
              </div>
              <div className="media-absolute">
                <Media decorative absolute={true} media={data.target} />
              </div>
            </>
          )}
        </div>
      </div>
      <div ref={ref} className="di fwb p">
        {content.map((p, i) => (
          <p className="di" key={i}>
            {p.value}
          </p>
        ))}
      </div>

      <style jsx>{`
        .media-block {
          width: 30rem;
          position: absolute;
          top: 50%;
          left: 50%;
          pointer-events: none;
          opacity: 0;
          transition: 0.2s ease-out opacity, 0.1s ease-out transform;
          transform: translate(-50%, -46%);
        }

        .inline-image p {
          margin-left: 0.37rem;
          margin-right: 0.37rem;
        }

        .inline-image.showing-image-true {
          z-index: 3;
        }

        .showing-image-true .media-block {
          opacity: 1;
          transform: translate(-50%, -50%);
          transition: 0.45s ease-in opacity, 0.3111s ease-out transform;
        }

        p {
          position: relative;
          z-index: 2;
          margin-bottom: 0;
        }

        p {
          border-bottom: 1px solid rgba(0, 0, 0, 0.4);
          transition: 0.2s ease-out color;
        }

        .showing-image-true {
          color: white;
        }

        .media-relative {
          display: block;
        }
        .media-absolute {
          display: none;
        }

        @media (max-width: 760px) {
          .media-block {
            height: 100%;
            width: 100%;
            top: 0;
            left: 0;
            z-index: 1;
            pointer-events: none;
            filter: brightness(0.8);
            transform: translate(0, 0);
          }

          .media-absolute {
            display: block;
            height: 100vh;
            width: 100vw;
            top: 0;
            left: 0;
            pointer-events: none;
          }
          .media-relative {
            display: none;
          }
          .inline-image {
            position: static;
          }

          .showing-image-true .media-block {
            transform: translate(0, 0);
            z-index: 0;
          }
          .el-to-transform {
            transform: translate(0, 0) !important;
          }
        }
      `}</style>

      <style jsx global>{``}</style>
    </div>
  );
};

const Paragraph = ({ content }) => {
  return (
    <>
      {content.map((block, i) => {
        if (block.nodeType === "text")
          return (
            <div key={i} className="p di">
              <h5 className="di">{block.value}</h5>
            </div>
          );
        else if (block.nodeType === "asset-hyperlink")
          return <InlineImage key={i} {...block} />;
        else return null;
      })}

      <style jsx>{`
        h5 {
          margin-bottom: 0;
        }
      `}</style>
    </>
  );
};

const OverlayingTextBlock = ({ text }) => {
  return (
    <section className=" oh overlaying-text-block psr x xw xac xjc bgc-light-grey psr z2 px2 py2 c12 c-b">
      {/* complicated custom asset linker!! */}
      <div>
        <SlideUp>
          {text &&
            text.content &&
            text.content.map((block, i) => (
              <Paragraph key={i} content={block.content} />
            ))}
        </SlideUp>
      </div>

      <style jsx>{`
        .overlaying-text-block {
          min-height: 100vh;
          width: 100%;
        }

        div {
          max-width: 900px;
          text-align: center;
        }

        @media (max-width: 1100px) {
          .overlaying-text-block {
            min-height: 80vh;
          }
        }

        @media (max-width: 760px) {
          .overlaying-text-block {
            min-height: 80vh;
          }
        }
      `}</style>

      <style jsx global>{`
        .overlaying-text-block h5 {
          font-size: 28px;
          line-height: 1.7;
        }

        .overlaying-text-block p {
          line-height: 1.4;
          font-size: 24px;
        }

        @media (max-width: 760px) {
          .overlaying-text-block h5 {
            position: relative;
            z-index: 2;
          }
        }
      `}</style>
    </section>
  );
};

export default React.memo(OverlayingTextBlock);
