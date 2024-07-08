import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

const Setting = () => {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings strokeWidth={1.6} className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DrawerTrigger>
      <DrawerContent
        showNotch={false}
        className="h-screen top-0 right-0 left-auto mt-0 w-[500px] rounded-none"
      >
        <ScrollArea className="h-screen">
          <div className="mx-auto w-full p-5">
            <DrawerHeader>
              <DrawerTitle>Theme Color Options</DrawerTitle>
              <DrawerDescription>
                * Selected option will be applied to all layout elements (navbar, toolbar, etc.).
                You can also create your own theme options and color schemes.
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0 space-y-4">
              <div className="bg-muted flex items-center justify-center rounded-lg h-32">
                <p>Image 1</p>
              </div>
              <div className="bg-muted flex items-center justify-center rounded-lg h-32">
                <p>Image 2</p>
              </div>
              <div className="bg-muted flex items-center justify-center rounded-lg h-32">
                <p>Image 3</p>
              </div>
              <div className="bg-muted flex items-center justify-center rounded-lg h-32">
                <p>Image 4</p>
              </div>
              <div className="bg-muted flex items-center justify-center rounded-lg h-32">
                <p>Image 4</p>
              </div>
              <div className="bg-muted flex items-center justify-center rounded-lg h-32">
                <p>Image 5</p>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};

export default Setting;
