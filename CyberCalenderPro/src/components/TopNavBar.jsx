import React from "react";

const TopNavBar = ({ children }) => {
  return (
    <nav className="flex w-full justify-end bg-thirdy p-2 h-[10%] shadow-lg absolute top-0 left-0 px-80">
      {children}
    </nav>
  );
};

export default TopNavBar;
