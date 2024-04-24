import frame from "../../assets/heroImage.svg";

function Main({ title, button, src, onClick, className ,mobileClassName}) {
  return (
    <section className="lg:w-5/6 md:w-5/6 sm:w-full m-auto flex lg:flex-row md:flex-col sm:flex-col xs-flex-col items-center justify-center p-3 gap-10">
      <div className="w-3/4 lg:order-1 md:order-2  sm:order-2 xs-order-2">
         <div className="flex flex-col justify-center lg:items-start md:items-center sm:items-center xs-items-center">
          <h2 className="lg:text-7xl md:text-6xl sm:text-5xl xs-text-xl primary-text-bold pb-10 text-blue-800 lg:text-start md:text-center sm:text-center xs-text-center ">{title}</h2>
          <button className={className} onClick={onClick}>{button}</button>
         </div>
      </div>
      <div className="w-1/2 lg:order-2 md:order-1  sm:order-1 xs-order-1">
        <img src={src} alt="" className={`${mobileClassName?mobileClassName:"w-full"}`} />
      </div>
    </section>
    // <div className=" w-5/6 m-auto flex justify-between">
    //   <div className="flex justify-between w-1/2 bg-white items-center">
    //     <div className="w-full">
    //       <img
    //         className=" w-full aspect-square transform -translate-y-1/2 left-0  object-contain  "
    //         src={frame}
    //         alt="frame"
    //       />
    //     </div>

    //     <div className="flex flex-col gap-6 sm:items-center lg:items-start w-full">
    //       <div className="tracking-wide secondary-color primary-text-bold sm:text-3xl md:text-4xl lg:text-5xl lg:max-w-lg">
    //         {title}
    //       </div>
    //       {/* Use onClick prop passed from parent component */}
    //       <button onClick={onClick} className={className}>
    //         {button}
    //       </button>
    //     </div>
    //     <div className="w-1/2">
    //     <img src={src} className="w-full" alt="" />
    //     </div>
        
    //   </div>
    // </div>
  );
}

export default Main;
