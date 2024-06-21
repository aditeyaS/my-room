import { useTheme } from "../../context/ThemeContext";
import { Afternoon } from "./Afternoon";
import { Evening } from "./Evening";
import { Morning } from "./Morning";
import { Night } from "./Night";

export const ThemeChanger = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex justify-center pt-4 gap-2 md:gap-4">
      <div className="flex flex-col items-center">
        <button
          className={`rounded-full p-1 ${
            theme === "morning" ? "bg-base-200" : "bg-base-100"
          }`}
          onClick={() => setTheme("morning")}
        >
          <Morning />
        </button>
        <span
          className={`text-xs md:text-lg ${
            theme === "morning" && "text-accent"
          }`}
        >
          Morning
        </span>
      </div>
      <div className="flex flex-col items-center">
        <button
          className={`rounded-full p-1 ${
            theme === "afternoon" ? "bg-base-200" : "bg-base-100"
          }`}
          onClick={() => setTheme("afternoon")}
        >
          <Afternoon />
        </button>
        <span
          className={`text-xs md:text-lg ${
            theme === "afternoon" && "text-accent"
          }`}
        >
          Afternoon
        </span>
      </div>
      <div className="flex flex-col items-center">
        <button
          className={`rounded-full p-1 ${
            theme === "evening" ? "bg-base-200" : "bg-base-100"
          }`}
          onClick={() => setTheme("evening")}
        >
          <Evening />
        </button>
        <span
          className={`text-xs md:text-lg ${
            theme === "evening" && "text-accent"
          }`}
        >
          Evening
        </span>
      </div>
      <div className="flex flex-col items-center">
        <button
          className={`rounded-full p-1 ${
            theme === "night" ? "bg-base-200" : "bg-base-100"
          }`}
          onClick={() => setTheme("night")}
        >
          <Night />
        </button>
        <span
          className={`text-xs md:text-lg ${theme === "night" && "text-accent"}`}
        >
          Night
        </span>
      </div>
    </div>
  );
};
