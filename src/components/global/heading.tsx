import { Button } from "@/components/ui/button";
import Setting from "./setting";
import pubSub from "@/lib/pubsub";

const Heading = () => {
  const randomize = () => {
    pubSub.publish("randomize-notes-event");
  };

  return (
    <div className="flex items-center border px-4 py-2 md:px-6 md:py-2.5 shadow-sm rounded-full space-x-1 md:space-x-1.5 max-md:ml-auto max-md:mr-2">
      <h1 className="font-medium text-xs md:text-sm mr-1.5 md:mr-2.5">Music Note Randomiser</h1>
      <Button
        onClick={randomize}
        className="ml-4 h-8 md:h-10 text-[0.65rem] md:text-xs px-2 md:px-4"
      >
        Randomize
      </Button>
      <Setting />
    </div>
  );
};

export default Heading;
