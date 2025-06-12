interface props {
  image: string;
  bgColor: string;
  duration: string;
  title: string;
  summary: string;
  textColor: string;
}

const TextSlider = ({ slides, activeIndex }: { slides: props[]; activeIndex: number }) => {
  return (
    <div className="flex-default w-full order-2 md:order-1">
      <div
        key={activeIndex}
        className={`text-${slides[activeIndex].textColor} animate-fadeSlide flex flex-col`}
      >
        <p className="text-xl md:text-2xl">{slides[activeIndex].duration}</p>
        <h2 className="text-4xl md:text-5xl font-bold leading-snug whitespace-pre-line break-words line-clamp-3">
          {slides[activeIndex].title}
        </h2>
        <p className="text-md mt-2 whitespace-pre-line break-words line-clamp-2">
          {slides[activeIndex].summary}
        </p>
      </div>
    </div>
  );
};

export default TextSlider;
