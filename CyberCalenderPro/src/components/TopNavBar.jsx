import React from "react";

const TopNavBar = ({ align, children }) => {
  return (
    <nav
      className={`flex w-full justify-${align} bg-thirdy p-2 h-fit shadow-lg px-80 `}
    >
      {children}
    </nav>
  );
};

export default TopNavBar;
