import { useAppSelector, useAppDispatch } from "../hooks";
import { setIsPlaying } from "./slice";

const usePlay = () => {
  const dispatch = useAppDispatch();
  const isPlaying = useAppSelector((state) => state.play.isPlaying);

  const toggleIsPlaying = () => {
    dispatch(setIsPlaying(!isPlaying));
  };

  const play = () => {
    dispatch(setIsPlaying(true));
  };

  const stop = () => {
    dispatch(setIsPlaying(false));
  };

  return {
    isPlaying,
    toggleIsPlaying,
    play,
    stop,
  };
};

export default usePlay;
