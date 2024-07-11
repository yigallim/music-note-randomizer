import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import useSetting from "@/state/setting/hook";
import { SettingState } from "@/state/setting/slice";
import SheetMusic from "@slnsw/react-sheet-music";
import pubSub from "@/lib/pubsub";

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
  const totalNotes = 120;
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
  const [setting] = useSetting();
  const [notation, setNotation] = useState(() => generateNotation(setting));

  const updateNotation = useCallback(() => {
    setNotation(generateNotation(setting));
  }, [setting]);
  pubSub.subscribe("randomize-notes-event", updateNotation);

  return <SheetMusic className={cn(className)} notation={notation} bpm={70} />;
};

export default StaffLines;
