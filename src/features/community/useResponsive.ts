import { useEffect, useState } from "react";
import { DARK_NOT_ITEM, LiGHT_NOT_ITEM } from "@/constants/ImageSrc";

export const useResponsive = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [imgSrc, setImgSrc] = useState(LiGHT_NOT_ITEM);

    // 모바일 감지
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // 다크모드 이미지 감지
    useEffect(() => {
        const root = document.documentElement;
        const updateThemeImage = () => {
            setImgSrc(root.classList.contains("dark") ? DARK_NOT_ITEM : LiGHT_NOT_ITEM);
        };
        updateThemeImage();
        const observer = new MutationObserver(updateThemeImage);
        observer.observe(root, { attributes: true, attributeFilter: ["class"] });
        return () => observer.disconnect();
    }, []);

    return { isMobile, imgSrc };
};
