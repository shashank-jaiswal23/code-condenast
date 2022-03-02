import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { Dialog, DialogOverlay, DialogContent } from "@reach/dialog";
import "@reach/dialog/styles.css";

import Media from "components/Media";
import { RichText } from "components/Typography";

export const ListItemMobile = ({
  activeItem,
  i,
  media1,
  text,
  title,
  setActiveItem,
}) => {
  const active = activeItem === i;

  const close = () => {
    setActiveItem(null);
  };

  //  const [showDialog, setShowDialog] = React.useState(false);
  //  const open = () => setShowDialog(true);
  //  const close = () => setShowDialog(false);
  return (
    <div>
      {/* <button onClick={open}>Show Dialog</button> */}
      <Dialog
        aria-labelledby={`#${title}-${i}`}
        style={{ color: "red" }}
        isOpen={active}
        onDismiss={close}
      >
        <DialogContent aria-labelledby={`#${title}-${i}`}>
          <div className={`active-${active} list-item`}>
            <div className="text-container psr px2 no-indent pt2 pb1 bgc-b">
              <div className="psr z2">
                <RichText text={text} />
              </div>

              <button className="close-popup" onClick={close}>
                <img src="/svgs/close.svg" alt="close popup" />
              </button>

              {media1 && (
                <div className="media">
                  <Media decorative media={media1} />
                </div>
              )}
            </div>

            <style jsx>{`
              .media {
                opacity: 0.3;
                pointer-events: none;
              }

              .text-container {
                max-width: 700px;
              }

              .close-popup {
                position: absolute;
                top: 1rem;
                right: 1rem;
                width: 1rem;
              }
            `}</style>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
  // return (
  //   <div></div>
  // <motion.div
  //   onClick={close}
  //   initial={{
  //     opacity: 0,
  //     pointerEvents: "none",
  //   }}
  //   animate={{
  //     opacity: active ? 1 : 0,
  //     pointerEvents: active ? "auto" : "none",
  //   }}
  //   className={`mobile-list-item x xw xac xjc px1 py1 psa`}
  // >
  //
  //   // </motion.div>
  // );
};

const ListItem = ({ activeItem, i, media1, media2, text }) => {
  const active = activeItem === i;
  let type;
  if (i % 3 === 0) type = "A";
  else if (i % 3 === 1) type = "B";
  else type = "C";

  return (
    <div className={`active-${active} type-${type} list-item`}>
      {media2 && (
        <motion.div
          className="media-container hover-for-zindex-priority media-1"
          initial={{
            opacity: 0,
            y: 20,
            x: -20,
          }}
          animate={{
            opacity: active ? 1 : 0,
            y: active ? 0 : 20,
            x: active ? 0 : -20,
          }}
          transition={{
            duration: active ? 0.5 : 0.1,
            delay: active ? 0.1 : 0,
          }}
        >
          <Media decorative absolute={false} media={media2} />
        </motion.div>
      )}

      {media1 && (
        <motion.div
          className="media-container media-2 hover-for-zindex-priority"
          initial={{
            opacity: 0,
            y: 20,
            x: 20,
          }}
          animate={{
            opacity: active ? 1 : 0,
            y: active ? 0 : 20,
            x: active ? 0 : 20,
          }}
          transition={{
            duration: active ? 0.5 : 0.1,
            delay: active ? 0.3 : 0,
          }}
        >
          <Media decorative absolute={false} media={media1} />
        </motion.div>
      )}

      {text && (
        <motion.div
          className="pss text-list"
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: active ? 1 : 0,
            y: active ? 0 : 20,
          }}
          transition={{
            duration: active ? 0.5 : 0.1,
            delay: active ? 0.4 : 0,
          }}
        >
          <div className="text-container px3 no-indent pt3 pb2 bgc-g">
            <RichText text={text} />
          </div>
        </motion.div>
      )}

      <style jsx>{`
        .active-false {
          pointer-events: none;
          opacity: 0;
          visibility: hidden;
        }
      `}</style>
      <style global jsx>{`
        .hover-for-zindex-priority:hover {
          z-index: 3;
        }
        .media-container {
          width: 28rem;
          position: absolute;
          top: 4rem;
          right: 26rem;
        }

        .media-2 {
          top: 8rem;
          right: 2rem;
          left: unset;
        }

        .text-list {
          position: absolute;
          bottom: 4rem;
          width: 36rem;
          right: 4rem;
        }

        .type-B .text-list {
          right: unset;
          right: 14rem;
          bottom: unset;
          top: 8rem;
        }

        .type-B .media-1 {
          top: 12rem;
          right: 4rem;
        }

        .type-B .media-2 {
          top: unset;
          bottom: 3rem;
          right: 17rem;
          left: unset;
        }

        .type-C .text-list {
          right: unset;
          right: 20rem;
          bottom: 5rem;
          top: unset;
        }

        .type-C .media-1 {
          top: 8rem;
          left: 14rem;
          left: unset;
        }

        .type-C .media-2 {
          top: unset;
          bottom: 14rem;
          right: 4rem;
          left: unset;
        }

        .list-item {
          position: static;
        }

        @media (max-width: 1200px) {
          .text-list {
            width: 30rem;
          }

          .media-container {
            width: 20rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ListItem;
