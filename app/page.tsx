import LinkInput from "@/components/LinkInput";
import { Chip } from "@nextui-org/react";
import { BiSolidBellRing } from "react-icons/bi";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col relative">
      <div className="absolute h-[10rem] w-[10rem] md:w-[40rem] top-32 left-40 blur-[5rem] md:blur-[10rem] bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"></div>
      <div className="absolute h-[10rem] w-[10rem] md:w-[40rem] bottom-32 right-40 blur-[5rem] md:blur-[10rem] bg-gradient-to-l from-pink-500 via-red-500 to-yellow-500"></div>
      <Chip
        variant="flat"
        className="py-1 px-2 ring-2 scale-75 md:scale-100"
        color="default"
        size="sm"
        startContent={<BiSolidBellRing className="mx-1 h-4 w-4" />}
      >
        Shorten your links quickly, easily and for free!
      </Chip>
      <div className="mt-8 md:mt-10 flex flex-col items-center">
        <h1 className=" text-3xl md:text-7xl font-extrabold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text">{`Gavin Belson's`}</h1>
        <p className="md:text-xl text-sm text-gray-300">(stolen)</p>
        <h1 className=" md:text-3xl text-sm font-semibold">{`middle-out link compression`}</h1>
      </div>

      <LinkInput />
    </div>
  );
};

export default Home;
