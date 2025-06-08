import { Link } from "react-router-dom";
interface TitleProps {
  linkSrc: string;
  titleText: string;
  className?: string;
}

const Title = ({ linkSrc, titleText, className }: TitleProps) => {
  const combinedClass = `text-xl font-semibold ${className}`.trim();
  return (
    <h2 className={combinedClass}>
      <Link to={linkSrc}>{titleText}</Link>
    </h2>
  );
};

export default Title;
