import { RichText } from "components/Typography";
import { SlideUp } from "components/Animation";

const TextBlock = ({ text }) => {
  return (
    <section className="text-block psr z2 px2">
      <div className="text mxa">
        <SlideUp>{text && <RichText text={text} />}</SlideUp>
      </div>

      <style jsx>{`
        .text-block {
          background-color: black;
          padding: 13rem 2rem;
        }

        .text {
          max-width: 700px;
        }

        @media (max-width: 760px) {
          .text {
            max-width: 500px;
          }

          .text-block {
            padding: 4rem 2rem;
          }
        }
      `}</style>
    </section>
  );
};

export default React.memo(TextBlock);
