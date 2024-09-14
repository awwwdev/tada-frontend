'use client';



const Footer = () => {


  return (
    <>
      <div className="h-20"></div>
      <footer className="px-4 relative isolate ">
        
        <div className=" max-w-page mx-auto "></div>
        <div className="max-w-page mx-auto">
          <div className="b-t-1 b-base4 mt-4 pt-8 pb-8 text-sm c-base11">
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

function DotGrid({ rows, cols }) {
  return (
    <div
      className="grid aspect-ratio-1/1  justify-items-center fade-y w-full min-w-50rem opacity-10"
      style={{
        gridTemplateColumns: `repeat(${cols} , 1fr)`,
        gridTemplateRows: `repeat(${rows} , 1fr)`,
        // gap: `calc((100% - ${rows} * 0.25rem) / ${rows - 1})`,
        maskImage: "linear-gradient(to top, black 0%, black 20%,  transparent 60%)",
        WebkitMaskImage: "linear-gradient(to top, black  0%, black 20%, transparent 60%)",
      }}
    >
      {Array.from(Array(rows * cols).keys()).map((i) => {
        return (
          <div key={`dot-${i}`} className={`rd-full  w-1 h-1 `}>
            +
          </div>
        );
      })}
    </div>
  );
}
