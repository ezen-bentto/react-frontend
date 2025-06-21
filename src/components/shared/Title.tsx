import React from "react";
import { Link } from "react-router-dom";
interface TitleProps {
  linkSrc?: string;
  titleText: string;
  className?: string;
}

const Title = ({ linkSrc, titleText, className }: TitleProps) => {
  const combinedClass = `text-2xl font-semibold ${className}`.trim();
  return (
    <h2 className={combinedClass}>{linkSrc ? <Link to={linkSrc}>{titleText}</Link> : titleText}</h2>
  );
};

export default React.memo(Title);
