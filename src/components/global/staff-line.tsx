import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import useSetting from "@/state/setting/hook";
import { SettingState } from "@/state/setting/slice";
import SheetMusic from "@slnsw/react-sheet-music";
import pubSub from "@/lib/pubsub";
import usePlay from "@/state/play/hook";
import * as Tone from "tone";

//TODO: Combine OSMD with ABCjs
// Use OSMD for sheet rendering
// abcjs for
// ??? https://codesandbox.io/p/sandbox/sheet-player-forked-ovejz?file=%2Fsrc%2Findex.js

const fixedWidth = 830;

const sampler = new Tone.Sampler({
  urls: {
    C4: "C4.mp3",
    "D#4": "Ds4.mp3",
    "F#4": "Fs4.mp3",
    A4: "A4.mp3",
  },
  release: 0.5,
  baseUrl: "https://tonejs.github.io/audio/salamander/",
}).toDestination();

const noteMap = {
  treble: ["A,", "B,", "C", "D", "E", "F", "G", "A", "B", "c", "d", "e", "f", "g", "a", "b", "c'"],
  bass: [
    "C,,",
    "D,,",
    "E,,",
    "F,,",
    "G,,",
    "A,,",
    "B,,",
    "C,",
    "D,",
    "E,",
    "F,",
    "G,",
    "A,",
    "B,",
    "C",
    "D",
    "E",
  ],
};

type Clef = keyof typeof noteMap;

const getRandomNote = (min: number, max: number, clef: Clef) => {
  const randomIndex = Math.floor(Math.random() * (max - min + 1)) + min;
  return noteMap[clef][randomIndex];
};

const generateRandomNotes = (min: number, max: number, noteCount: number, clef: Clef) => {
  let notes = [];
  for (let i = 0; i < noteCount; i++) {
    notes.push(getRandomNote(min, max, clef));
    if ((i + 1) % 4 === 0 && i !== noteCount - 1) {
      notes.push("|");
    }
  }
  return notes.join(" ");
};

const generateNotation = (setting: SettingState) => {
  const { min, max, clef } = setting;
  const notesPerRow = 20;
  const totalNotes = 32;
  const numRows = Math.ceil(totalNotes / notesPerRow);

  let rows = [];
  for (let i = 0; i < numRows; i++) {
    const notesInRow =
      i === numRows - 1 && totalNotes % notesPerRow !== 0 ? totalNotes % notesPerRow : notesPerRow;

    let currentClef = clef as Clef;
    if (clef === "mixed" && i % 2 === 0) {
      currentClef = "treble";
    } else if (clef === "mixed" && i % 2 === 1) {
      currentClef = "bass";
    }

    const randomNotes = generateRandomNotes(min, max, notesInRow, currentClef);
    rows.push(`V:1 clef=${currentClef}\n${randomNotes}`);
  }

  return `
X: 1
M: 4/4
L: 1/4
K: C
${rows.join("\n")}
`;
};

type StaffLinesProps = {
  className?: string;
};

const StaffLines = ({ className }: StaffLinesProps) => {
  const [highlightPosition, setHighlightPosition] = useState({ x: 0, y: 0 });
  const [setting] = useSetting();
  const { isPlaying, stop } = usePlay();
  const [notation, setNotation] = useState(generateNotation(setting));
  const isPlayingRef = useRef(false);

  useEffect(() => {
    stop();
  }, [setting, notation]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  const updateNotation = () => {
    setNotation(generateNotation(setting));
  };
  pubSub.subscribe("randomize-notes-event", updateNotation);

  const handleEvent = (event: any) => {
    if (!event || !isPlayingRef.current) {
      return;
    }

    console.log("event", event);

    setHighlightPosition({
      x: event.left,
      y: event.top,
    });

    event.notes.forEach((note: any) => {
      sampler.triggerAttackRelease(note.name, note.duration);
    });
  };

  const handleLineEnd = (event: any) => {
    if (!event.top && !event.bottom) {
      stop();
    }
  };

  const ratio = window.innerWidth / fixedWidth;

  return (
    <div className="w-full h-full relative">
      {isPlaying && (
        <div
          className="bg-amber-400 opacity-50 absolute -translate-x-1/4"
          style={{
            left: highlightPosition.x * ratio,
            top: highlightPosition.y * ratio,
            height: 14 * ratio * 4,
            width: 14 * ratio,
          }}
        />
      )}

      <SheetMusic
        className={cn(className)}
        notation={notation}
        bpm={setting.bpm}
        isPlaying={isPlaying}
        onEvent={handleEvent}
        onLineEnd={handleLineEnd}
      />
    </div>
  );
};

export default StaffLines;
