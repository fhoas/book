import React from "react";

const Header = () => {
  return (
    <div className="text-white sticky top-0 py-4 px-8 backdrop-blur-1 bg-gray8 flex items-center gap-1">
      <img className="w-[50px] h-[50px]" src="./assets/books.svg" alt="logo" />
      <span className="text-xl">BookBase</span>
    </div>
  );
};

export default Header;
