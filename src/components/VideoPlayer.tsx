import { useEffect, useRef } from "react";
import Hls from "hls.js";
import Plyr, { APITypes, PlyrProps, PlyrInstance } from "plyr-react";
import "plyr-react/plyr.css";

const VideoPlayer = ({
  customeStyles,
  source,
  type,

}: {
  customeStyles?: string;
  source: string;
  type?: string;
  
}) => {
  const ref = useRef<APITypes>(null);
  useEffect(() => {
    const loadVideo = async () => {
      const video = document.getElementById("plyr") as HTMLVideoElement;
      var hls = new Hls();
      hls.loadSource(source);
      hls.attachMedia(video);
      // @ts-ignore
      ref.current!.plyr.media = video;

      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        (ref.current!.plyr as PlyrInstance).play();
      });
    };
    if (type!=="mp4") {
      loadVideo();
    }
  });




  return (
    <>
      {
      type==="mp4" ? (
        <iframe
        className="w-full h-full absolute top-0 left-0 bottom-0 right-0 border-0 "
        src={source}
        allowFullScreen
        scrolling="no"
      ></iframe>
      ) :  
      (
        <Plyr
          id="plyr"
          options={{ volume: 0.1 }}
          source={{} as PlyrProps["source"]}
          ref={ref}
          controls
          style={{border:"none"}}
          className="absolute w-full h-full top-0 left-0 bottom-0 right-0 border-none "
        />
      )}
    </>
  );
};

export default VideoPlayer;