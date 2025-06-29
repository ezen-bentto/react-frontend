import { Link } from "react-router-dom";
import { card, type CardVariants } from "../style/card";
import Badge from "./Badge";
import { useEffect, useState } from "react";
import { NOT_IMAGE } from "@/constants/ImageSrc";
import { blobToBase64 } from "@/utils/blobToBase64";
import type { FileJson } from "@/types/contestType";
import { bufferJsonToBlob } from "@/utils/bufferJsonToBlob";

/**
 *
 * Card 컴포넌트
 * 공모전 등의 정보를 보여주는 카드 UI 컴포넌트
 * 제목, 설명, 이미지, 디데이 뱃지를 표시하며, 클릭 시 상세 페이지로 이동한다.
 * `size`, `intent` 속성을 받아 스타일을 유연하게 조정할 수 있다.
 *
 * @function Card.tsx
 * @date 2025/05/31
 * @history
 * -------------------------------------------------------
 *           변경일             작성자             변경내용
 * -------------------------------------------------------
 *
 *        2025/05/31           이철욱               신규작성
 *        2025/06/19           이철욱               img 스켈레톤 UI 적용
 *        2025/06/20           이철욱               day Badge z-index
 *
 * @param id 공모전 고유 ID로, 해당 값을 링크 경로로 사용
 * @param dday 마감일까지 남은 기간을 나타내는 문자열 (예: "D-3")
 * @param img 카드에 표시할 썸네일 이미지 경로
 * @param title 카드 제목
 * @param text 카드 설명
 * @param size 카드 크기 설정 값 (예: sm, md, lg)
 * @param intent 카드의 색상 테마 설정 값 ("neutral" | "primary" | "warning")
 * @param className 외부에서 전달받은 추가 클래스 이름
 */

interface CardProps extends CardVariants {
  id: number;
  dday: string;
  img?: string | FileJson;
  title: string;
  text: string;
  className?: string;

  intent?: "neutral" | "primary";
  size?: "sm" | "md" | "lg";
}

const Card = ({ id, dday, img, title, text, size, intent, className }: CardProps) => {
  const combinedClass =
    `relative w-full h-full ${card({ size, intent })} ${className ?? ""}`.trim(); // 👉 w-full, h-full 강제

  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>(NOT_IMAGE);

  useEffect(() => {
    const processImage = async () => {
      if (typeof img === "string") {
        setImageSrc(img);
      } else if (img && img.type === "Buffer" && Array.isArray(img.data)) {
        // FileJson 형태인 경우
        const blob = bufferJsonToBlob(img, "image/png");
        const base64 = await blobToBase64(blob);
        setImageSrc(base64);
      } else {
        setImageSrc(NOT_IMAGE);
      }
    };

    processImage();
  }, [img]);

  return (
    <Link to={`/contest/${id}`}>
      <div className={combinedClass}>
        <div className="p-4 flex justify-end absolute w-full z-2">
          <Badge intent="default">D-{dday}</Badge>
        </div>
        <figure className="relative w-full aspect-[4/3]">
          {!isImageLoaded && (
            <div className="absolute top-0 left-0 w-full h-full bg-gray-200 animate-pulse rounded" />
          )}
          {
            <img
              src={imageSrc}
              alt={title}
              loading="lazy"
              onLoad={() => setIsImageLoaded(true)}
              className={`absolute top-0 left-0 w-full h-full object-cover object-top transition-opacity duration-300 ${
                isImageLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
          }
        </figure>

        <div className="card-body w-full">
          <h2 className="font-black text-xl truncate">{title}</h2>
          <div className="flex-default">
            <p className="truncate">{text}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default Card;
