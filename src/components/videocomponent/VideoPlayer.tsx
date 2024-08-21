// @ts-nocheck
"use client";

import { useEffect, useRef } from "react";
import Plyr from "plyr";
import "plyr/dist/plyr.css";
import Hls from "hls.js";
import { languages } from "@/helper/languages";

const VideoPlayer = ({
  source,
  introStart,
  introEnd,
  outroStart,
  outroEnd,
  captionSrc,
  autoSkip = true,
}: {
  source: string;
  introStart: number;
  introEnd: number;
  outroStart: number;
  outroEnd: number;
  captionSrc: [];
  autoSkip?: boolean;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const plyrRef = useRef<Plyr | null>(null);
  const skipButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const cleanup = () => {
      if (plyrRef.current) {
        plyrRef.current.destroy();
        plyrRef.current = null;
      }
      Array.from(videoElement.querySelectorAll("track")).forEach((track) =>
        track.remove()
      );
    };

    const initializePlayer = () => {
      cleanup();

      const hls = Hls.isSupported() ? new Hls() : null;
      if (hls) {
        hls.loadSource(source);
        hls.attachMedia(videoElement);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          plyrRef.current = new Plyr(videoElement, {
            captions: { active: true, language: "en" },
            controls: [
              "play-large",
              "play",
              "progress",
              "current-time",
              "mute",
              "volume",
              "captions",
              "settings",
              "pip",
              "airplay",
              "fullscreen",
            ],
            settings: ["captions", "quality", "speed"],
          });

          const createFontSizeMenu = () => {
            const settingsMenuContainer = document.querySelector(
              ".plyr__menu__container div div[role=menu]"
            );
            if (
              !settingsMenuContainer ||
              document.querySelector("#plyr-settings-font-size")
            )
              return;

            // Font size tab button
            const fontSizeTab = document.createElement("button");
            fontSizeTab.id = "plyr-settings-font-size";
            fontSizeTab.className = "plyr__control plyr__control--forward";
            fontSizeTab.type = "button";
            fontSizeTab.role = "menuitem";
            fontSizeTab.ariaHaspopup = "true";
            fontSizeTab.innerHTML = `
              <span>Font Size
                <span class="plyr__menu__value">small</span>
              </span>
            `;

            // Font size options menu
            const fontSizeOptions = document.createElement("div");
            fontSizeOptions.id = "plyr-settings-7984-font-size";
            fontSizeOptions.className = "plyr__menu__options";
            fontSizeOptions.style.display = "none";
            fontSizeOptions.innerHTML = `
              <button data-plyr="font-size" type="button" role="menuitemradio" class="plyr__control" aria-checked="true" value="Small">
                <span>Small</span>
              </button>
              <button data-plyr="font-size" type="button" role="menuitemradio" class="plyr__control" aria-checked="false" value="Medium">
                <span>Medium</span>
              </button>
              <button data-plyr="font-size" type="button" role="menuitemradio" class="plyr__control" aria-checked="false" value="Large">
                <span>Large</span>
              </button>
              <button data-plyr="font-size" type="button" role="menuitemradio" class="plyr__control" aria-checked="false" value="Extra Large">
                <span>Extra Large</span>
              </button>
            `;

            // Add the font size tab and options menu to the settings container
            settingsMenuContainer.insertBefore(
              fontSizeTab,
              settingsMenuContainer.firstChild
            );
            settingsMenuContainer.appendChild(fontSizeOptions);

            // Toggle visibility of the font size options when the tab is clicked
            fontSizeTab.addEventListener("click", () => {
              const isOptionsVisible =
                fontSizeOptions.style.display === "block";
              fontSizeOptions.style.display = isOptionsVisible
                ? "none"
                : "block";
            });

            // Handle font size option selection
            fontSizeOptions.querySelectorAll("button").forEach((button) => {
              button.addEventListener("click", (event) => {
                const selectedSize = (event.target as HTMLButtonElement).value;
                const captionElement =
                  document.querySelector(".plyr__captions");
                if (captionElement) {
                  captionElement.style.fontSize =
                    {
                      Small: "1rem",
                      Medium: "1.3rem",
                      Large: "1.6rem",
                      "Extra Large": "1.8rem",
                    }[selectedSize] || "1rem";
                }

                // Update aria-checked attribute for all buttons
                fontSizeOptions.querySelectorAll("button").forEach((btn) => {
                  btn.setAttribute(
                    "aria-checked",
                    btn.value === selectedSize ? "true" : "false"
                  );
                });

                // Update display of the selected option
                const valueSpan = document.querySelector(
                  "#plyr-settings-font-size .plyr__menu__value"
                );
                if (valueSpan) {
                  valueSpan.textContent = selectedSize;
                }

                // Hide the font size options after selection
                fontSizeOptions.style.display = "none";
              });
            });
          };

          createFontSizeMenu();

          let skipButton = skipButtonRef.current;
          if (!skipButton) {
            skipButton = document.createElement("button");
            skipButton.className =
              "absolute bottom-20 bg-[##00000091] right-4 px-4 py-2  rounded-md hidden z-10";
            skipButton.innerText = "Skip";
            skipButtonRef.current = skipButton;

            const plyrDiv = document.querySelector(".plyr");
            plyrDiv?.appendChild(skipButton);
          }

          if (!autoSkip) {
            skipButton.addEventListener("click", () => {
              if (videoElement.currentTime < introEnd) {
                videoElement.currentTime = introEnd;
              } else if (
                videoElement.currentTime >= outroStart &&
                videoElement.currentTime < outroEnd
              ) {
                videoElement.currentTime = outroEnd;
              }
              skipButton.style.display = "none";
            });

            videoElement.addEventListener("timeupdate", () => {
              const currentTime = videoElement.currentTime;

              if (currentTime >= introStart && currentTime < introEnd) {
                skipButton.style.display = "block";
              } else if (
                currentTime >= outroStart &&
                currentTime < outroEnd
              ) {
                skipButton.style.display = "block";
              } else {
                skipButton.style.display = "none";
              }
            });
          } else {
            // Automatically skip the intro and outro
            videoElement.addEventListener("timeupdate", () => {
              const currentTime = videoElement.currentTime;

              if (
                currentTime >= introStart &&
                currentTime < introEnd
              ) {
                videoElement.currentTime = introEnd;
              }
              if (
                currentTime >= outroStart &&
                currentTime < outroEnd
              ) {
                videoElement.currentTime = outroEnd;
              }
            });
          }
        });

        hls.on(Hls.Events.ERROR, (_, data) => {
          if (data.fatal === Hls.ErrorTypes.NETWORK_ERROR) {
            console.error("Network error:", data.fatal);
          } else if (data.fatal === Hls.ErrorTypes.MEDIA_ERROR) {
            console.error("Media error:", data.fatal);
          }
        });
      } else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
        videoElement.src = source;
        plyrRef.current = new Plyr(videoElement, {
          captions: { active: true, language: "en" },
          controls: [
            "play-large",
            "play",
            "progress",
            "current-time",
            "mute",
            "volume",
            "captions",
            "settings",
            "pip",
            "airplay",
            "fullscreen",
          ],
          settings: ["captions", "quality", "speed"],
        });
      }

      captionSrc.forEach((track) => {
        const trackElement = document.createElement("track");
        trackElement.kind = track.kind;
        trackElement.label = track.label || "";
        trackElement.srclang = languages[track.label] || "en";
        trackElement.src = track.file;
        trackElement.default = track.default || false;
        videoElement.appendChild(trackElement);
      });

      if (plyrRef.current) {
        plyrRef.current.update();
      }
    };

    initializePlayer();

    return cleanup;
  }, [
    source,
    introStart,
    introEnd,
    outroStart,
    outroEnd,
    captionSrc,
    autoSkip,
  ]);

  return (
    <div className="plyr-container absolute top-0 left-0 bottom-0 right-0 ">
      <video
        ref={videoRef}
        controls
        style={{ width: "100%", height: "100%" }}
        crossOrigin="anonymous"
        playsInline
        className="aspect-video"
        title="my player"
      />
    </div>
  );
};

export default VideoPlayer;
