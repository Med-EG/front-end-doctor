function Hero({ title, onClick, button, src }) {
  return (
    <div className="flex lg:flex-row md:flex-col sm:flex-col xs-flex-col items-center justify-center p-10 ">
      <div className="bg-white lg:w-1/2 md:w-1/2 sm:w-full xs-width-full  rounded-l-3xl lg:aspect-w-2 aspect-h-1 lg:pl-16">
        <div className="flex flex-col lg:items-start items-center justify-center gap-10 pb-10">
          <h1 className="secondary-color primary-text-bold lg:text-start text-center lg:text-7xl md:text-6xl sm:text-5xl xs-text-xl">
            {title}
          </h1>

          <button
            className="offwhite gradient-background rounded-md lg:text-xl px-3 py-2"
            onClick={onClick}
          >
            {button}
          </button>
        </div>
      </div>
      <div className="lg:w-1/2 md:w-1/2 sm:w-full xs-width-full">
      <img
        src={src}
        alt=""
        className="w-full "
      />
      </div>
      
    </div>
  );
}

export default Hero;
