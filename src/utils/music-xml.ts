import { SettingState } from "@/state/setting/slice";

export type Clef = "treble" | "bass";

export const trebleNotes = [
  { step: "A", octave: 3 },
  { step: "B", octave: 3 },
  { step: "C", octave: 4 },
  { step: "D", octave: 4 },
  { step: "E", octave: 4 },
  { step: "F", octave: 4 },
  { step: "G", octave: 4 },
  { step: "A", octave: 4 },
  { step: "B", octave: 4 },
  { step: "C", octave: 5 },
  { step: "D", octave: 5 },
  { step: "E", octave: 5 },
  { step: "F", octave: 5 },
  { step: "G", octave: 5 },
  { step: "A", octave: 5 },
  { step: "B", octave: 5 },
  { step: "C", octave: 6 },
];
export const bassNotes = [
  { step: "C", octave: 2 },
  { step: "D", octave: 2 },
  { step: "E", octave: 2 },
  { step: "F", octave: 2 },
  { step: "G", octave: 2 },
  { step: "A", octave: 2 },
  { step: "B", octave: 2 },
  { step: "C", octave: 3 },
  { step: "D", octave: 3 },
  { step: "E", octave: 3 },
  { step: "F", octave: 3 },
  { step: "G", octave: 3 },
  { step: "A", octave: 3 },
  { step: "B", octave: 3 },
  { step: "C", octave: 4 },
  { step: "D", octave: 4 },
  { step: "E", octave: 4 },
];

if (trebleNotes.length != bassNotes.length)
  throw "Treble Notes and Bass Notes array length must be same.";

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomTrebleNote(min: number, max: number) {
  const randomIndex = getRandomInt(min, max);
  return trebleNotes[randomIndex];
}
function getRandomBassNote(min: number, max: number) {
  const randomIndex = getRandomInt(min, max);
  return bassNotes[randomIndex];
}
function generateNoteXML(step: string, octave: number) {
  return `
        <note>
            <pitch>
            <step>${step}</step>
            <octave>${octave}</octave>
            </pitch>
            <duration>1</duration>
            <type>quarter</type>
        </note>`;
}
function generateNotesXML(clef: Clef, min: number, max: number) {
  let notesXML = "";
  const getRandomNote = clef === "treble" ? getRandomTrebleNote : getRandomBassNote;
  for (let i = 0; i < 4; i++) {
    const { step, octave } = getRandomNote(min, max);
    notesXML += generateNoteXML(step, octave);
  }
  return notesXML;
}
function generateMeasureXML(
  measureNumber: number,
  clef: Clef,
  withAttribute: boolean,
  min: number,
  max: number
) {
  const clefAttributes = {
    treble: {
      sign: "G",
      line: "2",
    },
    bass: {
      sign: "F",
      line: "4",
    },
  };

  if (!withAttribute) {
    return `
    <measure number="${measureNumber}">
        ${generateNotesXML(clef, min, max)}
    </measure>`;
  } else {
    const clefAttribute = clefAttributes[clef];
    return `
    <measure number="${measureNumber}">
        <attributes>
            <divisions>1</divisions>
            <time>
                <beats>4</beats>
                <beat-type>4</beat-type>
            </time>
            <clef>
                <sign>${clefAttribute.sign}</sign>
                <line>${clefAttribute.line}</line>
            </clef>
            <staff>1</staff>
        </attributes>
        ${generateNotesXML(clef, min, max)}
    </measure>`;
  }
}
export function generateMusicXML(setting: SettingState) {
  let measures = "";
  const measuresCount = 44;

  if (setting.clef !== "mixed") {
    for (let i = 0; i < measuresCount; i++) {
      measures += generateMeasureXML(i + 1, setting.clef, i == 0, setting.min, setting.max);
    }
  } else {
    function isOdd(num: number) {
      return num % 2;
    }

    const partCount = 4;
    const measurePartCount = measuresCount / partCount;
    let measureNumber = 1;
    for (let i = 0; i < partCount; i++) {
      const clef = isOdd(i) ? "bass" : "treble";
      for (let j = 0; j < measurePartCount; j++) {
        measures += generateMeasureXML(measureNumber++, clef, j == 0, setting.min, setting.max);
      }
    }
  }

  return `
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE score-partwise PUBLIC "-//Recordare//DTD MusicXML 3.1 Partwise//EN" "http://www.musicxml.org/dtds/partwise.dtd">
<score-partwise>
<part-list>
    <score-part id="P1">
    <part-name> </part-name>
    </score-part>
</part-list>
<part id="P1">
    ${measures}
</part>
</score-partwise>
    `;
}
