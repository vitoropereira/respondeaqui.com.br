import { InputHTMLAttributes, ReactNode } from "react";
import SearchIcon from "@mui/icons-material/Search";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholderText: string;
  icon?: boolean;
}

export function Input({ placeholderText, icon, ...rest }: InputProps) {
  return (
    <div className="bg-light-background dark:bg-dark-background px-4 py-1 ">
      <div
        className={`bg-light-backgroundSecond dark:bg-dark-backgroundSecond h-10 rounded-[10px] flex items-center ${
          icon ? "px-2" : "pr-2"
        } py-0`}
      >
        {icon ? (
          <SearchIcon fontSize="small" style={{ color: "#919191" }} />
        ) : (
          ""
        )}
        <input
          type="search"
          className={`flex-1 border-0 outline-0 dark:border-0 dark:outline-0 rounded-[10px] -mr-2 bg-transparent
           text-light-text dark:text-dark-text`}
          placeholder={placeholderText}
          {...rest}
        />
      </div>
    </div>
  );
}
