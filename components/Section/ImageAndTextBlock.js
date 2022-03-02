import Media from "components/Media";
import { RichText } from "components/Typography";
import { SlideUp } from "components/Animation";
import Button from "components/Button";

const ImageAndTextBlock = ({
  backgroundColor,
  imageLeft = false,
  linkTitle,
  linkUrl,
  media,
  text,
  textColor,
}) => {
  return (
    <section
      style={{
        backgroundColor: backgroundColor ? backgroundColor : "black",
        color: textColor ? textColor : "white",
      }}
      className={`image-and-text-block x xw xac xjb psr z2 image-left-${imageLeft}`}
    >
      <div className="media psr">
        {media && <Media absolute media={media} />}
      </div>
      <div className="text psr">
        {text && (
          <SlideUp>
            <>
              <RichText text={text} />
              {linkUrl && linkTitle && (
                <a
                  className="dib my1"
                  href={linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button>{linkTitle}</Button>
                </a>
              )}
            </>
          </SlideUp>
        )}
      </div>

      <style jsx>{`
        .media,
        .text {
          width: 50%;
        }
        .media {
          height: 0;
          padding-bottom: 50%;
        }

        .text {
          padding: 8%;
        }

        .image-left-false .text {
          order: 1;
        }
        .image-left-false .media {
          order: 2;
        }

        @media (max-width: 1000px) {
          .media,
          .text {
            width: 100%;
          }

          .image-left-false .text {
            order: initial;
          }
          .image-left-false .media {
            order: initial;
          }
        }

        @media (max-width: 600px) {
          .media {
            padding-bottom: 100%;
          }
        }
      `}</style>
    </section>
  );
};

export default ImageAndTextBlock;
