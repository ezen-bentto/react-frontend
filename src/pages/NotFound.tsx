import { DARKIMG, LIGHTIMG } from "@/constants/ImageSrc";
import { useThemeStore } from "@/features/common/themeStore";
import { useEffect, useState } from "react";

const NotFound = () => {
  const [imgSrc, setImgSrc] = useState(LIGHTIMG);
  const { theme } = useThemeStore();

  useEffect(() => (theme === "light" ? setImgSrc(LIGHTIMG) : setImgSrc(DARKIMG)), [theme]);
  return (
    <div className="flex items-center flex-col md:flex-row justify-center mt-19 md:mt-20">
      <div className="w-1/2">
        <img src={imgSrc} alt="404 페이지" />
      </div>
      <div className="flex items-start flex-col">
        <h1 className="text-3xl font-bold">페이지를 찾을 수가 없습니다.</h1>
        <p>
          존재하지 않는 주소를 입력하였거나
          <br />
          요청하신 페이지의 주소가 변경되었습니다.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
