import { PauseIcon, Play as PlayIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import usePlay from "@/state/play/hook";

const Play = () => {
  const { isPlaying, toggleIsPlaying } = usePlay();

  return (
    <Button
      className="rounded-full z-50 shadow-md fixed top-2 left-2 md:left-5 h-12 w-12 md:h-14 md:w-14"
      size="icon"
      variant="outline"
      onClick={toggleIsPlaying}
    >
      {isPlaying ? (
        <PauseIcon className="text-neutral-700 ml-0.5 h-4 w-4 md:h-5 md:w-5" />
      ) : (
        <PlayIcon className="text-neutral-700 ml-0.5 h-4 w-4 md:h-5 md:w-5" />
      )}
    </Button>
  );
};

export default Play;
