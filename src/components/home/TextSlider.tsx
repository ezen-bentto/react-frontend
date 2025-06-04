interface props {
  image: string;
  bgColor: string;
  duration: string;
  title: string;
  summary: string;
}

const TextSlider = ({ slides, activeIndex }: { slides: props[]; activeIndex: number }) => {
  return (
    <div className="absolute max-w-[1400px] inset-0 flex-default m-auto px-50">
      <div key={activeIndex} className="text-white animate-fadeSlide w-full flex  flex-col">
        <p className="text-xl">{slides[activeIndex].duration}</p>
        <h2 className="text-4xl font-bold leading-snug whitespace-pre-line">
          {slides[activeIndex].title}
        </h2>
        <p className="text-sm mt-2">{slides[activeIndex].summary}</p>
      </div>
    </div>
  );
};

export default TextSlider;
