import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export const RichText = ({ text }) => {
  const renderedText = documentToReactComponents(text);

  return <div className="rich-text">{renderedText}</div>;
};

export const TextGroup = ({ children }) => {
  return <section className="text-group px2 mxa">{children}</section>;
};
