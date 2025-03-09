//@ts-nocheck
// import {
//   MediaPlayer,
//   MediaProvider,
//   Track,
//   Thumbnail,
//   type MediaPlayerInstance,
//   useMediaStore,
// } from "@vidstack/react";
// import {
//   DefaultVideoLayout,
//   defaultLayoutIcons,
// } from "@vidstack/react/player/layouts/default";
// import { useEffect, useState, useCallback, useRef } from "react";
// import CustomLocalMediaStorage from "@/components/videocomponent/CustomLocalMediaStorge";
// import "./player.css";

// const VideoPlayer = ({
//   source,
//   introStart,
//   introEnd,
//   outroStart,
//   outroEnd,
//   captionSrc,
//   autoSkip,
// }: {
//   source: string;
//   introStart: number;
//   introEnd: number;
//   outroStart: number;
//   outroEnd: number;
//   captionSrc: { file: string; srclang: string; kind: string; label: string }[];
//   autoSkip?: boolean;
// }) => {
//   const playerRef = useRef<MediaPlayerInstance>(null);
//   const { currentTime } = useMediaStore(playerRef);
//   const skipButtonRef = useRef<HTMLButtonElement>(null);
//   const [preferredCaption, setPreferredCaption] = useState("");

//   // Show/hide skip button based on current time using useMediaStore
//   useEffect(() => {
//     if (!autoSkip) {
//       if (skipButtonRef.current) {
//         if (
//           (currentTime >= introStart && currentTime < introEnd) ||
//           (currentTime >= outroStart && currentTime < outroEnd)
//         ) {
//           skipButtonRef.current.style.display = "block";
//         } else {
//           skipButtonRef.current.style.display = "none";
//         }
//       }
//     } else {
//       if (skipButtonRef.current) {
//         if (currentTime >= introStart && currentTime < introEnd) {
//           playerRef.current.currentTime = introEnd;
//         } else if (currentTime >= outroStart && currentTime < outroEnd) {
//           if (playerRef.current) {
//             playerRef.current.currentTime = outroEnd;
//           }
//         }
//       }
//     }
//   }, [currentTime, introStart, introEnd, outroStart, outroEnd]);

//   // Handle skip button click
//   const handleSkip = () => {
//     if (currentTime >= introStart && currentTime < introEnd) {
//       if (playerRef.current) {
//         playerRef.current.currentTime = introEnd;
//       }
//     } else if (currentTime >= outroStart && currentTime < outroEnd) {
//       if (playerRef.current) {
//         playerRef.current.currentTime = outroEnd;
//       }
//     }
//   };

//   // Retrieve user preference on component mount
//   useEffect(() => {
//     const storage = new CustomLocalMediaStorage();
//     storage.get("vds-player").then((preference) => {
//       if (preference && preference.lang) {
//         setPreferredCaption(preference.lang);
//       }
//     });
//   }, []);

//   // Save the preferred caption language to localStorage
//   const savePreferredCaption = useCallback((lang) => {
//     const storage = new CustomLocalMediaStorage();
//     storage.get("vds-player").then((preference) => {
//       const updatedPreference = {
//         ...preference,
//         lang,
//         captions: true,
//       };
//       storage.save("vds-player", updatedPreference);
//       setPreferredCaption(lang);
//     });
//   }, []);

//   const allCaptions = captionSrc.filter(
//     (caption) => caption.kind === "captions"
//   );

//   const thumbnail = captionSrc.filter(
//     (thumbnail) => thumbnail.kind === "thumbnails"
//   );

//   return (
//     <>
//       <MediaPlayer
//         className="player"
//         title=""
//         src={`https://goodproxy.goodproxy.workers.dev/fetch?url=${source}`}
//         crossOrigin="anonymous"
//         playsInline
//         ref={playerRef}
//         onTextTrackChange={(event) => {
//           const selectedTrack = event;
//           if (selectedTrack?.kind === "captions") {
//             savePreferredCaption(selectedTrack?.language);
//           }
//         }}
//       >
//         <MediaProvider></MediaProvider>
//         <button
//           ref={skipButtonRef}
//           className="skip absolute bottom-24 right-5 border px-3 py-2 rounded-md "
//           style={{ display: "none" }}
//           onClick={handleSkip}
//         >
//           Skip
//         </button>

//         {allCaptions?.map((tracks, index) => (
//           <Track
//             key={index}
//             src={tracks?.file}
//             kind={tracks?.kind}
//             language={tracks?.label}
//             lang={tracks?.srclang}
//             label={tracks?.label}
//             default={preferredCaption === tracks?.label}
//           />
//         ))}

//         <DefaultVideoLayout
//           icons={defaultLayoutIcons}
//           thumbnails={`https://vtt.blasphemy8473.workers.dev/${thumbnail[0]?.file}`}
//         />
//       </MediaPlayer>
//     </>
//   );
// };

// export default VideoPlayer;

import { useEffect, useRef } from "react";
import Artplayer from "artplayer";
import artplayerPluginHlsControl from "artplayer-plugin-hls-control";
import Hls from "hls.js";

export default function Player({
  source,
  captionSrc,
  introStart,
  introEnd,
  outroStart,
  outroEnd,
}: any) {
  const artRef = useRef(null);

  useEffect(() => {
    let art;

    if (artRef.current) {
      const defaultCaption = captionSrc.find((caption) => caption.default);
      const defaultCaptionLabel = defaultCaption
        ? defaultCaption.label
        : "Subtitle";
      art = new Artplayer({
        container: artRef.current,
        url: source,
        setting: true,
        fullscreen: true,
        moreVideoAttr: {
          crossOrigin: "anonymous",
        },

        controls: [
          {
            name: "skip",
            position: "right",
            html: "Skip",
            tooltip: "Skip",
            style: {
              position: " relative",
              bottom: " 60px",
              right: "-90px",
              border: "1px solid white",
              padding: "0px 18px",
              borderRadius: "10px",
              background: "rgba(39, 39, 39, 0.43)",
              color: "white",
              display: "none",
            },
            click: function () {
              const currentTime = art.currentTime;
              if (currentTime >= introStart && currentTime < introEnd) {
                art.currentTime = introEnd;
              } else if (currentTime >= outroStart && currentTime < outroEnd) {
                art.currentTime = outroEnd;
              }
            },
          },
        ],

        plugins: [
          artplayerPluginHlsControl({
            quality: {
              // Show qualitys in control
              // control: true,
              // Show qualitys in setting
              setting: true,
              // Get the quality name from level
              getName: (level) => level.height + "P",
              // I18n
              title: "Quality",
              auto: "Auto",
            },
          }),
        ],
        customType: {
          m3u8: function playM3u8(video, url, art) {
            if (Hls.isSupported()) {
              if (art.hls) art.hls.destroy();
              const hls = new Hls();
              hls.loadSource(url);
              hls.attachMedia(video);
              art.hls = hls;
              art.on("destroy", () => hls.destroy());
            } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
              video.src = url;
            } else {
              art.notice.show = "Unsupported playback format: m3u8";
            }
          },
        },

        settings: [
          {
            width: 200,
            html: "Subtitle",
            tooltip: defaultCaptionLabel,
            icon: '<img width="22" heigth="22" src="/assets/img/subtitle.svg">',
            selector: [
              {
                html: "Display",
                tooltip: "Show",
                switch: true,
                onSwitch: function (item) {
                  item.tooltip = item.switch ? "Hide" : "Show";
                  art.subtitle.show = !item.switch;
                  return !item.switch;
                },
              },
              ...captionSrc.map((caption) => ({
                default: caption.default,
                html: caption.label,
                url: caption.file,
              })),
            ],
            onSelect: function (item) {
              art.subtitle.switch(item.url, {
                name: item.html,
              });
              return item.html;
            },
          },
        ],
        subtitle: {
          url:
            captionSrc.find((caption) => caption.default)?.file ||
            captionSrc[0]?.file,
          type: "vtt",
          encoding: "utf-8",
          escape: true,
          style: {
            color: "#fff",
            fontSize: "20px",
          },
        },
        highlight: [
          {
            time: introStart,
            text: "Intro Start",
          },
          {
            time: introEnd,
            text: "Intro End",
          },
          {
            time: outroStart,
            text: "Outro Start",
          },
          {
            time: outroEnd,
            text: "Outro End",
          },
        ],
      });

      art.on("video:timeupdate", () => {
        const currentTime = art.currentTime;
        const skipButton = art.controls.skip;
        if (
          (currentTime >= introStart && currentTime < introEnd) ||
          (currentTime >= outroStart && currentTime < outroEnd)
        ) {
          skipButton.style.display = "flex";
        } else {
          skipButton.style.display = "none";
        }
      });
    }

    return () => {
      if (art && art.destroy) {
        art.destroy(false);
      }
    };
  }, [source, introStart, introEnd, outroStart, outroEnd]);

  return (
    <div
      ref={artRef}
      className="artplayer-app absolute top-0 left-0 p-0 m-0 w-full h-full "
    ></div>
  );
}
