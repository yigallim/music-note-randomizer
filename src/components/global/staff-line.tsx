import { cn } from "@/lib/utils";
import SheetMusic from "@slnsw/react-sheet-music";

type StaffLinesProps = {
  className?: string;
};

const notation = `
X: 1
M: 4/4
L: 1/4
K: C
V:1 clef=treble
C C G G | A A G2 | F F E E | D D C2 |
V:2 clef=bass
C, C, G, G, | A, A, G,2 | F, F, E, E, | D, D, C,2 |
`;

const StaffLines = ({ className }: StaffLinesProps) => {
  return <SheetMusic className={cn(className)} notation={notation} bpm={70} />;
};

export default StaffLines;
