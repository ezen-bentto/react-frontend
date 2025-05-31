import { Link } from "react-router-dom";
import { card, type CardVariants } from "../style/card";
import Badge from "./Badge";

interface CardProps extends CardVariants {
  id: number;
  dday: string;
  img: string;
  title: string;
  text: string;
  className?: string;
}

const Card = ({ id, dday, img, title, text, size, intent, className }: CardProps) => {
  const combinedClass = `relative ${card({ size, intent })} ${className ?? ""}`.trim();

  return (
    <Link to={`/contest/${id}`}>
      <div className={combinedClass}>
        <div className="p-4 flex justify-end absolute w-full">
          <Badge intent="orange">{dday}</Badge>
        </div>
        <figure className="">
          <img
            src={img}
            alt={title}
            className="aspect-[4/3] w-full object-cover object-top overflow-hidden"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p>{text}</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
