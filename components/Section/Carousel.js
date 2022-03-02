import { useInView } from "react-intersection-observer";

import { RawImage } from "components/Image";
import { RawMedia } from "components/Media";

const Carousel = ({ images, reverse }) => {
  const [ref, inView, entry] = useInView({
    /* Optional options */
    threshold: 0,
  });

  const width = images.length * 4 * 200;

  return (
    <section
      ref={ref}
      className={`reverse-${reverse} inview-${inView} carousel bgc-b psr z2`}
    >
      <div
        style={{
          width,
        }}
        className="carousel-container"
      >
        {images &&
          images.map((img, i) => (
            <div key={i} className="carousel-img">
              <RawMedia decorative media={img} />
            </div>
          ))}
        {images &&
          images.map((img, i) => (
            <div key={i} className="carousel-img">
              <RawMedia decorative media={img} />
            </div>
          ))}
        {images &&
          images.map((img, i) => (
            <div key={i} className="carousel-img">
              <RawMedia decorative media={img} />
            </div>
          ))}
        {images &&
          images.map((img, i) => (
            <div key={i} className="carousel-img">
              <RawMedia decorative media={img} />
            </div>
          ))}
      </div>

      <style jsx global>{`
        .carousel-img img,
        .carousel-img video {
          height: 100%;
          width: 100%;
          object-fit: cover;
          vertical-align: middle;
        }

        .carousel-img figure {
          padding: 0 !important;
          height: 100% !important;
          width: auto !important;
        }
      `}</style>

      <style jsx>{`
        .carousel {
          width: 100vw;
          overflow: hidden;
          position: relative;
        }

        .carousel::before,
        .carousel::after {
          position: absolute;
          content: " ";
          top: 0;
          height: 100%;
          background-color: black;
          width: 14%;
          z-index: 3;
          background: linear-gradient(
            90deg,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 0) 100%
          );
        }
        .carousel::after {
          right: 0;
          transform: rotate(180deg);
        }
        .carousel::before {
          left: 0;
        }
        .carousel-img {
          height: 250px;
          position: relative;
          width: 180px;
          // width: auto;
          margin-right: 10px;
          margin-top: 10px;
          margin-bottom: 10px;
        }

        .carousel-container {
          display: flex;
          animation: 150s marquee linear forwards infinite;
        }

        .reverse-true .carousel-container {
          animation-direction: reverse;
        }

        .inview-false .carousel-container {
          animation-play-state: paused;
        }

        @keyframes marquee {
          from {
            transform: translateX(0px);
          }
          to {
            transform: translateX(-${width / 2}px);
          }
        }
      `}</style>
    </section>
  );
};

export default Carousel;
