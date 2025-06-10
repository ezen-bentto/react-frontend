import { useEffect, useState } from "react";
import { topBtn } from "../style/topBtn";
import { UpOutlined } from "@ant-design/icons";

const TopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      setVisible(scrollTop > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Scroll to top"
      className={topBtn({ hidden: !visible })}
    >
      <UpOutlined className="text-4xl !text-white " />
      <div className=""></div>
    </button>
  );
};

export default TopButton;
