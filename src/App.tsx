import { Button } from "./components/ui/button";
import Setting from "./components/global/setting";
import StaffLines from "./components/global/staff-line";

const App = () => {
  return (
    <main className="flex flex-col items-center py-2">
      <div className="flex items-center border px-6 py-2.5 shadow-sm rounded-full space-x-1.5">
        <h1 className="font-medium text-sm mr-2.5">Music Note Randomiser</h1>
        <Button size="sm" className="ml-4 text-xs">
          Randomize
        </Button>
        <Setting />
      </div>

      <StaffLines className="mt-8" />
    </main>
  );
};

export default App;
