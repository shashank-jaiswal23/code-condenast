import { useRef, useEffect, useState, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

export const RawVideo = ({ fields }) => {
  const { url } = fields.file;
  const [src, setSrc] = useState(null);

  const [ref, inView] = useInView({
    /* Optional options */
    triggerOnce: true,
    threshold: 0,
  });

  useEffect(() => {
    if (inView) setSrc(url);
  }, [inView]);

  return <video autoPlay ref={ref} muted loop playsInline src={src} />;
};

const Video = ({
  fields,
  sys,
  absolute = false,
  enforceInitialLoad = false,
}) => {
  const { title } = fields;
  const { url, details } = fields.file;

  const [src, setSrc] = useState(enforceInitialLoad ? url : null);

  const [inViewRef, inView, entry] = useInView({
    /* Optional options */
  });

  const videoRef = useRef(null);

  const setRefs = useCallback(
    (node) => {
      videoRef.current = node;
      inViewRef(node);
    },
    [inViewRef]
  );

  useEffect(() => {
    if (inView) {
      videoRef.current.play();
      setSrc(url);
    } else if (!inView) {
      videoRef.current.pause();
    }
  }, [inView]);

  return (
    <figure className={`${absolute ? "absolute-video" : "non"}`}>
      <motion.div
        initial={{
          opacity: 0,
        }}
        transition={{ duration: 0.5, delay: 0.3 }}
        animate={{ opacity: inView ? 1 : 0 }}
      >
        <video
          aria-hidden="true"
          autoPlay
          muted
          loop
          playsInline
          ref={setRefs}
          src={src}
        />
      </motion.div>

      <style jsx>{`
        figure.absolute-video {
          padding-bottom: 0;
        }

        video {
          transition: 0.3s ease-in opacity;
        }
      `}</style>
    </figure>
  );
};

export default Video;
