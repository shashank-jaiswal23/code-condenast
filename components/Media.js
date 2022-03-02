import Image, { RawImage } from "components/Image";
import Video, { RawVideo } from "components/Video";

export const RawMedia = ({
  media,
  absolute = true,
  alwaysShow = false,
  decorative = false,
  enforceInitialLoad = false,
}) => {
  let mediaType = null;

  if (
    media &&
    media.fields &&
    media.fields.file.contentType.includes("image")
  ) {
    mediaType = "image";
  } else if (
    media &&
    media.fields &&
    media.fields.file.contentType.includes("video")
  ) {
    mediaType = "video";
  }

  return (
    <>
      {mediaType === "image" && (
        <RawImage
          enforceInitialLoad={enforceInitialLoad}
          decorative={decorative}
          alwaysShow={alwaysShow}
          {...media}
        />
      )}
      {mediaType === "video" && (
        <RawVideo
          enforceInitialLoad={enforceInitialLoad}
          alwaysShow={alwaysShow}
          {...media}
        />
      )}
    </>
  );
};

const Media = ({
  media,
  absolute = true,
  alwaysShow = false,
  decorative = false,
  enforceInitialLoad = false,
}) => {
  let mediaType = null;

  if (
    media &&
    media.fields &&
    media.fields.file.contentType.includes("image")
  ) {
    mediaType = "image";
  } else if (
    media &&
    media.fields &&
    media.fields.file.contentType.includes("video")
  ) {
    mediaType = "video";
  }

  return (
    <>
      {mediaType === "image" && (
        <Image
          decorative={decorative}
          enforceInitialLoad={enforceInitialLoad}
          alwaysShow={alwaysShow}
          absolute={absolute}
          {...media}
        />
      )}
      {mediaType === "video" && (
        <Video
          enforceInitialLoad={enforceInitialLoad}
          alwaysShow={alwaysShow}
          absolute={absolute}
          {...media}
        />
      )}
    </>
  );
};

export default React.memo(Media);
