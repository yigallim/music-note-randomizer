import { useEffect, useRef, useState } from "react";
import { OpenSheetMusicDisplay } from "opensheetmusicdisplay";
import AudioPlayer from "osmd-audio-player";
import { PlaybackEvent } from "osmd-audio-player/dist/PlaybackEngine";
import { debounce, delay } from "./utils";

const getZoom = (): number => {
  const width = window.innerWidth;
  if (width > 1000) {
    return 1.2;
  } else if (width <= 1000 && width > 700) {
    return 1.0;
  } else {
    return 0.8;
  }
};

async function fakeFetchMusicXML(musicXML: string | Document): Promise<string | Document> {
  await delay(1);
  return musicXML;
}

interface UseMusicSheet {
  isLoading: boolean;
  play: () => void;
  pause: () => void;
  stop: () => void;
  placeholder: React.ReactNode;
}

type useMusicSheetProps = {
  musicXML: string | Document;
  bpm: number;
  onFinish?: () => void;
};

const useMusicSheet = ({ musicXML, bpm, onFinish }: useMusicSheetProps): UseMusicSheet => {
  const previousScreenWidth = useRef(window.innerWidth);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const audioPlayerRef = useRef<AudioPlayer | null>(null);
  const osmdInstanceRef = useRef<OpenSheetMusicDisplay | null>(null);

  const setupMusicSheet = async () => {
    onFinish?.();
    stop();

    const musicSheetContainer = document.getElementById("music-sheet") as HTMLElement;
    musicSheetContainer.innerHTML = "";
    const osmdInstance = new OpenSheetMusicDisplay(musicSheetContainer, {
      autoResize: false,
      alignRests: 1,
      drawTitle: false,
      drawPartNames: false,
      followCursor: true,
    });

    const audioPlayerInstance = new AudioPlayer();

    try {
      const musicXMLLoader = await fakeFetchMusicXML(musicXML);

      await osmdInstance.load(musicXMLLoader);
      osmdInstance.zoom = getZoom();
      await osmdInstance.render();
      //@ts-ignore
      await audioPlayerInstance.loadScore(osmdInstance);
      audioPlayerInstance.setBpm(bpm);

      audioPlayerInstance.on(PlaybackEvent.ITERATION, (notes) => {
        if (!notes.length) {
          onFinish?.();
          stop();
        }
      });

      osmdInstanceRef.current = osmdInstance;
      audioPlayerRef.current = audioPlayerInstance;
    } catch (error) {
      console.error("Error loading or rendering the music sheet:", error);
    } finally {
      setIsLoading(false);
    }

    const observer = new MutationObserver((mutationsList) => {
      const cursor = osmdInstance.Cursor.cursorElement;
      for (const mutation of mutationsList) {
        if (mutation.type === "attributes") {
          cursor.style.height = cursor.getAttribute("height") + "px";
        }
      }
    });
    observer.observe(osmdInstance.Cursor.cursorElement, { attributes: true });
  };

  useEffect(() => {
    setIsLoading(true);
    setupMusicSheet();
  }, [musicXML, bpm]);

  useEffect(() => {
    const handleResize = debounce(() => {
      const screenWidthDifferences = previousScreenWidth.current - window.innerWidth;
      if (screenWidthDifferences > 50 || screenWidthDifferences < -50) {
        setIsLoading(true);
        const osmdInstance = osmdInstanceRef.current;
        if (!osmdInstance) return;
        const zoom = getZoom();
        osmdInstance.zoom = zoom;
        setupMusicSheet();
        previousScreenWidth.current = window.innerWidth;
      }
    }, 300);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const play = () => {
    const audioPlayer = audioPlayerRef.current;
    if (audioPlayer && (audioPlayer.state === "STOPPED" || audioPlayer.state === "PAUSED")) {
      audioPlayer.play();
    }
  };

  const pause = () => {
    const audioPlayer = audioPlayerRef.current;
    if (audioPlayer && audioPlayer.state === "PLAYING") {
      audioPlayer.pause();
    }
  };

  const stop = () => {
    const audioPlayer = audioPlayerRef.current;
    if (audioPlayer && (audioPlayer.state === "PLAYING" || audioPlayer.state === "PAUSED")) {
      audioPlayer.stop();
    }
  };

  const placeholder = <div id="music-sheet" />;

  return {
    isLoading,
    play,
    pause,
    stop,
    placeholder,
  };
};

export default useMusicSheet;
