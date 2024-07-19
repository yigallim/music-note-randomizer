import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useSetting from "@/state/setting/hook";
import useMusicSheet from "@/lib/use-music-sheet";
import { cn } from "@/lib/utils";
import usePlay from "@/state/play/hook";
import { generateMusicXML } from "@/utils/music-xml";
import pubSub from "@/lib/pubsub";
import { Spinner } from "./spinner";

type StaffLinesProps = {
  className?: string;
};

const StaffLines = ({ className }: StaffLinesProps) => {
  const [setting] = useSetting();
  const { isPlaying, stop: playStop } = usePlay();
  const [randomizeKey, setRandomizeKey] = useState(0);

  const musicXML = useMemo(() => {
    return generateMusicXML(setting);
  }, [setting.clef, setting.min, setting.max, randomizeKey]);

  const { placeholder, stop, play, pause, isLoading } = useMusicSheet({
    bpm: setting.bpm,
    musicXML,
    onFinish: playStop,
  });

  pubSub.subscribe("randomize-notes-event", () => {
    playStop();
    stop();
    setRandomizeKey((prevKey) => prevKey + 1);
  });

  useEffect(() => {
    if (isPlaying) {
      if (isLoading) {
        playStop();
      }
      play();
    } else {
      pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    playStop();
    stop();
  }, [setting]);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 grid place-items-center"
          >
            <Spinner size="icon" />
          </motion.div>
        )}
      </AnimatePresence>
      <div className={cn(className, "w-full h-full overflow-hidden")}>{placeholder}</div>
    </>
  );
};

export default StaffLines;
