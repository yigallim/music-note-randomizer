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

const Setting = () => {
  const [setting, setSetting] = useSetting();

  const handleRangeChange = (range: number[]) => {
    const [min, max] = range;
    setSetting({
      ...setting,
      min,
      max,
    });
  };
  const handleClefChange = (value: "treble" | "bass" | "mixed") => {
    setSetting({
      ...setting,
      clef: value,
    });
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
              <div className="mb-2 flex justify-between items-center">
                <p className="font-medium">Note Ranges</p>
                <div>
                  <p>Min: {setting.min}</p>
                  <p>Max: {setting.max}</p>
                </div>
              </div>
              <Slider
                defaultValue={[setting.min, setting.max]}
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
              <RadioGroup defaultValue={setting.clef} onValueChange={handleClefChange}>
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
              <Input type="number" id="quantity" defaultValue="60" min="1" />
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default Setting;
