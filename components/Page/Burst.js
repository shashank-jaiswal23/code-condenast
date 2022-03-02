import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Media from "components/Media";

const Burst = ({ landingSlideshow, finishSlideshow, state }) => {
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    let interval;
    let timeout;
    let x = -1;

    interval = setInterval(() => {
      if (x < landingSlideshow.length) {
        x++;
        setActiveIndex(x);
      } else {
        clearInterval(timeout);
        finishSlideshow();
      }
    }, 400);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      id="burst"
      aria-hidden={`${state === "loading" ? "false" : "true"}`}
      className="bgc-b"
    >
      {landingSlideshow &&
        landingSlideshow.map((item, i) => {
          const active = i === activeIndex;
          return (
            <motion.div
              key={i}
              className="burst-image"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: active ? 1 : 0,
              }}
              transition={{
                duration: active ? 0.3 : 0.3,
              }}
            >
              <div className="media">
                <Media media={item} />
              </div>
            </motion.div>
          );
        })}

      <style jsx>{`
        #burst {
          position: fixed;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          height: 100vh;
          width: 100vw;
          z-index: 14;
        }

        .media {
          height: 60%;
          width: 60%;
          margin: auto;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          object-fit: contain;
        }

        @media (max-width: 760px) {
          .media {
            height: 100%;
            width: 100%;
            object-fit: cover;
          }
        }
      `}</style>

      <style jsx global>{`
        .burst-image {
          position: absolute;
          height: 100%;
          width: 100%;
          top: 0;
          left: 0;
          object-fit: contain;
        }

        .burst-image figure,
        .burst-image img,
        .burst-image video {
          height: 100%;
          width: 100%;
          object-fit: contain;
        }

        @media (max-width: 760px) {
          .burst-image,
          .burst-image figure,
          .burst-image img,
          .burst-image video {
            object-fit: cover;
          }
        }
      `}</style>
    </div>
  );
};

export default Burst;
