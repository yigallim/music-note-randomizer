import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import useSetting from "@/state/setting/hook";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { bassNotes, trebleNotes } from "@/utils/music-xml";

function getNoteLabel({ step, octave }: { step: string; octave: number }) {
  return step + octave;
}

const Setting = () => {
  const [setting, setSetting] = useSetting();
  const [localSetting, setLocalSetting] = useState(setting);

  useEffect(() => {
    setLocalSetting(setting);
  }, [setting]);

  const handleRangeChange = (range: number[]) => {
    const [min, max] = range;
    setLocalSetting({
      ...localSetting,
      min,
      max,
    });
  };

  const handleClefChange = (value: "treble" | "bass" | "mixed") => {
    setLocalSetting({
      ...localSetting,
      clef: value,
    });
  };

  const handleBpmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const bpm = Number(event.target.value);
    setLocalSetting({
      ...localSetting,
      bpm,
    });
  };

  const handleSave = () => {
    setSetting(localSetting);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="h-8 w-8 md:h-10 md:w-10">
          <Settings strokeWidth={1.6} className="h-[1rem] w-[1rem] md:h-[1.2rem] md:w-[1.2rem]" />
        </Button>
      </SheetTrigger>

      <SheetContent>
        <ScrollArea className="h-full">
          <SheetHeader>
            <SheetTitle>Music Note Randomiser Setting</SheetTitle>
            <SheetDescription>Make changes to your music note randomiser here.</SheetDescription>
          </SheetHeader>
          <div className="py-8 mx-2 pb-0 space-y-10 text-sm">
            <div className="pb-2">
              <div className="mb-2 flex justify-between items-end">
                <p className="font-medium">Note Ranges</p>
                <div className="flex space-x-4 text-xs">
                  <div>
                    <p>Treble Clef</p>
                    <p>Min: {getNoteLabel(trebleNotes[localSetting.min])}</p>
                    <p>Max: {getNoteLabel(trebleNotes[localSetting.max])}</p>
                  </div>
                  <div>
                    <p>Bass Clef</p>
                    <p>Min: {getNoteLabel(bassNotes[localSetting.min])}</p>
                    <p>Max: {getNoteLabel(bassNotes[localSetting.max])}</p>
                  </div>
                </div>
              </div>
              <Slider
                defaultValue={[localSetting.min, localSetting.max]}
                minStepsBetweenThumbs={0}
                max={16}
                min={0}
                step={1}
                onValueChange={handleRangeChange}
                className="w-full"
              />
            </div>

            <div className="grid items-center gap-3">
              <Label>Clef</Label>
              <RadioGroup defaultValue={localSetting.clef} onValueChange={handleClefChange}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="treble" id="treble" />
                  <Label htmlFor="treble">Treble</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="bass" id="bass" />
                  <Label htmlFor="bass">Bass</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mixed" id="mixed" />
                  <Label htmlFor="mixed">Mixed</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid items-center gap-1.5">
              <Label htmlFor="quantity">Beats Per Minute</Label>
              <Input
                type="number"
                id="quantity"
                value={localSetting.bpm}
                min="1"
                onChange={handleBpmChange}
              />
            </div>

            <div className="flex justify-end">
              <Button size="sm" className="text-xs" onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default Setting;
