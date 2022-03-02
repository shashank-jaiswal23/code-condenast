import Cover from "./Cover";

import FooterBlock from "./FooterBlock";
import OverlayingTextBlock from "./OverlayingTextBlock";
import ImageAndTextBlock from "./ImageAndTextBlock";
import TextBlock from "./TextBlock";
import MessagesBlock from "./MessagesBlock";
import DataBlock from "./DataBlock";
import ListBlock from "./ListBlock/";
import Carousel from "./Carousel";

const Section = ({ blocks, coverMedia, headerTitle, longText, title }) => {
  return (
    <section className="main-section">
      <Cover
        coverMedia={coverMedia}
        landingText={longText ? longText : headerTitle}
      />

      {blocks &&
        blocks.map((block, i) => {
          switch (block.sys.contentType.sys.id) {
            case "condeCodeCarouselBlock":
              return <Carousel key={i} {...block.fields} />;
            case "condeCodeFooterBlock":
              return <FooterBlock key={i} {...block.fields} />;
            case "condeCodeOverlayingTextBlock":
              return <OverlayingTextBlock key={i} {...block.fields} />;
            case "condeCodeTextBlock":
              return <TextBlock key={i} {...block.fields} />;
            case "condeCodeImageAndTextBlock":
              return <ImageAndTextBlock key={i} {...block.fields} />;
            case "condeCodeMessagesBlock":
              return <MessagesBlock key={i} {...block.fields} />;
            case "condeCodeDataBlock":
              return <DataBlock key={i} {...block.fields} />;
            case "condeCodeListBlock":
              return <ListBlock key={i} {...block.fields} />;
            default:
              return <div key={i}>Bruh</div>;
          }
        })}
    </section>
  );
};

export default Section;
