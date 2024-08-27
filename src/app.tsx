import StaffLines from "./components/global/staff-line";
import Heading from "./components/global/heading";
import Play from "./components/global/play";

const App = () => {
  return (
    <main className="flex flex-col items-center py-2">
      <Heading />
      <Play />
      <StaffLines className="mt-2 md:mt-0 lg:-mt-2 xl:-mt-4 duration-300" />
    </main>
  );
};

export default App;
