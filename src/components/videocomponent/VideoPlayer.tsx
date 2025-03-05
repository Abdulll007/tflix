//@ts-nocheck
import {
  MediaPlayer,
  MediaProvider,
  Track,
  Thumbnail,
  type MediaPlayerInstance,
  useMediaStore,
} from "@vidstack/react";
import {
  DefaultVideoLayout,
  defaultLayoutIcons,
} from "@vidstack/react/player/layouts/default";
import { useEffect, useState, useCallback, useRef } from "react";
import CustomLocalMediaStorage from "@/components/videocomponent/CustomLocalMediaStorge";
import "./player.css";

const VideoPlayer = ({
  source,
  introStart,
  introEnd,
  outroStart,
  outroEnd,
  captionSrc,
  autoSkip,
}: {
  source: string;
  introStart: number;
  introEnd: number;
  outroStart: number;
  outroEnd: number;
  captionSrc: { file: string; srclang: string; kind: string; label: string }[];
  autoSkip?: boolean;
}) => {
  const playerRef = useRef<MediaPlayerInstance>(null);
  const { currentTime } = useMediaStore(playerRef);
  const skipButtonRef = useRef<HTMLButtonElement>(null);
  const [preferredCaption, setPreferredCaption] = useState("");

  // Show/hide skip button based on current time using useMediaStore
  useEffect(() => {
    if (!autoSkip) {
      if (skipButtonRef.current) {
        if (
          (currentTime >= introStart && currentTime < introEnd) ||
          (currentTime >= outroStart && currentTime < outroEnd)
        ) {
          skipButtonRef.current.style.display = "block";
        } else {
          skipButtonRef.current.style.display = "none";
        }
      }
    } else {
      if (skipButtonRef.current) {
        if (currentTime >= introStart && currentTime < introEnd) {
          playerRef.current.currentTime = introEnd;
        } else if (currentTime >= outroStart && currentTime < outroEnd) {
          if (playerRef.current) {
            playerRef.current.currentTime = outroEnd;
          }
        }
      }
    }
  }, [currentTime, introStart, introEnd, outroStart, outroEnd]);

  // Handle skip button click
  const handleSkip = () => {
    if (currentTime >= introStart && currentTime < introEnd) {
      if (playerRef.current) {
        playerRef.current.currentTime = introEnd;
      }
    } else if (currentTime >= outroStart && currentTime < outroEnd) {
      if (playerRef.current) {
        playerRef.current.currentTime = outroEnd;
      }
    }
  };

  // Retrieve user preference on component mount
  useEffect(() => {
    const storage = new CustomLocalMediaStorage();
    storage.get("vds-player").then((preference) => {
      if (preference && preference.lang) {
        setPreferredCaption(preference.lang);
      }
    });
  }, []);

  // Save the preferred caption language to localStorage
  const savePreferredCaption = useCallback((lang) => {
    const storage = new CustomLocalMediaStorage();
    storage.get("vds-player").then((preference) => {
      const updatedPreference = {
        ...preference,
        lang,
        captions: true,
      };
      storage.save("vds-player", updatedPreference);
      setPreferredCaption(lang);
    });
  }, []);

  const allCaptions = captionSrc.filter(
    (caption) => caption.kind === "captions"
  );

  const thumbnail = captionSrc.filter(
    (thumbnail) => thumbnail.kind === "thumbnails"
  );

  return (
    <>
      <MediaPlayer
        className="player"
        title=""
        src={source}
        crossOrigin="anonymous"
        playsInline
        ref={playerRef}
        onTextTrackChange={(event) => {
          const selectedTrack = event;
          if (selectedTrack?.kind === "captions") {
            savePreferredCaption(selectedTrack?.language);
          }
        }}
      >
        <MediaProvider></MediaProvider>
        <button
          ref={skipButtonRef}
          className="skip absolute bottom-24 right-5 border px-3 py-2 rounded-md "
          style={{ display: "none" }}
          onClick={handleSkip}
        >
          Skip
        </button>

        {allCaptions?.map((tracks, index) => (
          <Track
            key={index}
            src={tracks?.file}
            kind={tracks?.kind}
            language={tracks?.label}
            lang={tracks?.srclang}
            label={tracks?.label}
            default={preferredCaption === tracks?.label}
          />
        ))}

        <DefaultVideoLayout
          icons={defaultLayoutIcons}
          thumbnails={`https://vtt.blasphemy8473.workers.dev/${thumbnail[0]?.file}`}
        />
      </MediaPlayer>
    </>
  );
};

export default VideoPlayer;
