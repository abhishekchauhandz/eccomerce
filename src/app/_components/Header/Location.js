import { FaLocationCrosshairs } from "react-icons/fa6";

export default function Location() {
  return (
    <div className="flex items-center gap-2  min-w-fit">
      <div className="bg-primary text-white ">
        <FaLocationCrosshairs  className="text-3xl md:text-4xl p-2"/>
      </div>

      <div className="flex flex-col">
        <button className="text-foreground  text-[0.75rem] sm:text-sm flex items-center gap-1">
          Add your location
        </button>
        <span className="text-[0.50rem] sm:text-xs  text-gray-400">
          To see items in your area
        </span>
      </div>
    </div>
  );
}
