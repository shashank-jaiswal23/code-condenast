import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

import { RichText } from "components/Typography";
import Media from "components/Media";

const MessagesBlock = ({ text, backgroundMedia }) => {
  const [ref, inView] = useInView();
  const [refForMessages, inViewForMessages] = useInView({
    triggerOnce: true,
  });
  const [textHasLoaded, setTextHasLoaded] = useState(false);

  useEffect(() => {
    if (inViewForMessages && !textHasLoaded) {
      setTimeout(() => {
        setTextHasLoaded(true);
      }, 2000);
    }
  }, [inViewForMessages]);

  return (
    <section className="messages-block oh x xw xac xjc psr z2">
      {backgroundMedia && (
        <span className={`media inview-${inView}`}>
          <Media decorative media={backgroundMedia} />
        </span>
      )}

      <div ref={refForMessages} className="messages">
        <motion.div
          className="oh"
          initial={{
            height: 0,
            opacity: 0,
          }}
          transition={{
            duration: 0.6,
            delay: 0.2,
          }}
          animate={{
            height: textHasLoaded ? "auto" : 0,
            opacity: textHasLoaded ? 1 : 0,
          }}
        >
          <div className="message text">
            <RichText text={text} />
          </div>
        </motion.div>

        <motion.div
          className="oh"
          initial={{
            height: "auto",
            opacity: 1,
          }}
          animate={{
            height: textHasLoaded ? 0 : "auto",
            opacity: textHasLoaded ? 0 : 1,
          }}
          transition={{
            duration: 0.2,
            delay: 0.3,
          }}
        >
          <div className={`message dib message-loading`}>
            <div
              style={{
                animationDelay: "0.2s",
              }}
            />
            <div
              style={{
                animationDelay: "0.4s",
              }}
            />
            <div
              style={{
                animationDelay: "0.6s",
              }}
            />
          </div>
        </motion.div>
      </div>

      <div className="bottom-checker psa" ref={ref} />

      <style jsx>{`
        .message {
          background-color: rgba(0, 0, 0, 0.7);
          border-radius: 1rem;
          padding: 2rem 2rem;
        }

        .messages-block {
          width: 100%;
          position: relative;
        }

        .messages-block,
        .bottom-checker,
        .media {
          min-height: 100vh;
        }

        .media.inview-true {
          position: fixed;
          top: 0vh;
          left: 0;
        }

        .media {
          filter: brightness(0.8);
          position: absolute;
          width: 100%;
          display: block;
          z-index: 1;
          background-color: #000;
        }

        .bottom-checker {
          top: 100vh;
          left: 0;
          width: 100%;
        }

        .message.text {
          display: inline-block;
          padding-bottom: 1rem;
          margin-bottom: 2rem;
        }

        .message-loading div {
          height: 3px;
          width: 3px;
          border-radius: 50%;
          margin-left: 4px;
          margin-right: 4px;
          vertical-align: middle;
          display: inline-block;
          background-color: white;
          animation: 1.56s linear dotLoading infinite;
        }

        .messages {
          z-index: 10;
          position: relative;
          // position: absolute;
          max-width: 650px;
          // top: 50%;
          // left: 50%;
          // transform: translate(-50%, -50%);
        }

        @keyframes dotLoading {
          0% {
            transform: translateY(0px);
          }
          20% {
            transform: translateY(-7px);
          }
          40% {
            transform: translateY(0px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @media (max-width: 760px) {
          .messages {
            max-width: unset;
            width: calc(100% - 2rem);
            top: unset;
            left: 50%;
            transform: translateX(-50%);
            bottom: 2rem;
          }
        }
      `}</style>

      <style jsx global>{`
        @media (max-width: 600px) {
          .message p {
            font-size: 18px;
          }
        }
      `}</style>
    </section>
  );
};

export default React.memo(MessagesBlock);
