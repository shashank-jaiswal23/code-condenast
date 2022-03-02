import { useRef, useEffect, useState, useCallback, memo } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const RawImageSRc = ({ fields, enforceInitialLoad }) => {
  const { url, details } = fields.file;
  const [src, setSrc] = useState(null);

  const [ref, inView] = useInView({
    /* Optional options */
    triggerOnce: true,
    threshold: 0,
  });

  useEffect(() => {
    if (inView) setSrc(url);
  }, [inView]);

  return <img ref={ref} src={src} alt="" />;
};

export const RawImage = memo(RawImageSRc);

const Image = ({
  fields,
  sys,
  enforceInitialLoad = false,
  absolute = false,
  alwaysShow = false,
  decorative = false,
}) => {
  const { title } = fields;
  const { url, details } = fields.file;

  const [src, setSrc] = useState(enforceInitialLoad ? url : null);
  const [inViewRef, inView, entry] = useInView({
    /* Optional options */
    triggerOnce: true,
    threshold: 0,
  });

  const [hasLoaded, setHasLoaded] = useState(false);
  const imageRef = useRef(null);

  const setRefs = useCallback(
    (node) => {
      // Ref's from useRef needs to have the node assigned to `current`
      imageRef.current = node;
      // Callback refs, like the one from `useInView`, is a function that takes the node as an argument
      inViewRef(node);
    },
    [inViewRef]
  );

  // height and width
  const { image } = details;
  let paddingBottom = 100;

  if (image && image.width && image.height) {
    paddingBottom = (image.height / image.width) * 100;
  }

  useEffect(() => {
    if (inView) setSrc(url);
  }, [inView]);

  return (
    <figure
      className={`${absolute ? "absolute-image" : "non"} ${
        hasLoaded ? "loaded" : "loading"
      }`}
      style={{ paddingBottom: absolute ? "0" : paddingBottom + "%" }}
    >
      <motion.div
        initial={{
          opacity: alwaysShow ? 1 : 0,
        }}
        transition={{ duration: 0.5, delay: 0.3 }}
        animate={{ opacity: inView ? 1 : alwaysShow ? 1 : 0 }}
      >
        <img ref={setRefs} src={src} alt={decorative ? "" : title} />
      </motion.div>

      <style jsx>{`
        figure.absolute-image {
          padding-bottom: 0;
        }

        figure.non {
          height: 0;
          overflow: hidden;
          position: relative;
        }

        img {
          transition: 0.3s ease-in opacity;
        }

        figure.loaded img {
          opacity: 1;
        }
      `}</style>
    </figure>
  );
};

export default memo(Image);
