// @ts-nocheck
import {
  MediaPlayer,
  MediaProvider,
  Poster,
  Thumbnail,
  Track,
  type MediaCanPlayDetail,
  type MediaCanPlayEvent,
  type MediaPlayerInstance,
} from "@vidstack/react";
import {
  DefaultAudioLayout,
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";

import "./player.css";


const VideoPlayer = ({
  source,
  introStart,
  introEnd,
  outroStart,
  outroEnd,
  captionSrc,
  autoSkip,
  animeposter
}: {
  source: string;
  introStart: number;
  introEnd: number;
  outroStart: number;
  outroEnd: number;
  captionSrc: { file: string; srclang: string; kind: string; label: string }[];
  autoSkip?: boolean;
}) => {
  
  const allCaptions = captionSrc.filter(
    (caption) => caption.kind === "captions"
  );

  return (
    <>
      <MediaPlayer
        className="player"
        
        src={source}
        crossOrigin="anonymous"
        playsInline

      >
        <MediaProvider>
          
          

          
        </MediaProvider>

        {allCaptions.map((tracks, index) => (
          <Track
            key={index}
            src={tracks.file}
            kind={tracks.kind}
            language={tracks.label}
            lang={tracks.srclang}
            label={tracks.label}
            default
          />
        ))}
        
   
     
        <DefaultVideoLayout icons={defaultLayoutIcons} />
      </MediaPlayer>
    </>
  );
};

export default VideoPlayer;
