import React from "react";

function Secondary({ src, title, description, onClick, button }) {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between py-20">
      {/* Hide the image on screens smaller than large */}
      <img
        src={src}
        alt=""
        className="hidden lg:block w-full lg:w-auto lg:pl-16"
      />

      <div className="gradient-background p-8 gap-7 w-full sm:p-14 lg:p-16 lg:rounded-l-3xl lg:max-w-2xl flex flex-col items-center lg:items-start justify-center lg:gap-10 sm:gap-7">
        <h1 className="text-white secondary-text-bold text-4xl lg:text-6xl sm:max-w-lg lg:max-w-3xl text-center lg:text-start">
          {title}
        </h1>
        <h4 className="text-white secondary-text-medium text-sm lg:text-base sm:max-w-xs lg:max-w-xl text-center lg:text-start ">
          {description}
        </h4>
        <button
          className="offwhite rounded-md px-3 py-2 outline outline-1"
          onClick={onClick}
        >
          {button}
        </button>
      </div>
    </div>
  );
}

export default Secondary;
