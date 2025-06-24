import ListItem from "@/components/shared/ListItem";
import { type PolicyType } from "@/features/Policy/types";
import { getPolicyLink } from "@/features/Policy/getPolicyLink";
import { DARK_NOT_ITEM, LiGHT_NOT_ITEM } from "@/constants/ImageSrc";
import { useEffect, useState } from "react";
import { useThemeStore } from "@/features/common/themeStore";

interface PolicyListProps {
  policies: PolicyType[];
}

export default function PolicyList({ policies }: PolicyListProps) {
  const { theme } = useThemeStore();
  const [imgSrc, setImgSrc] = useState(LiGHT_NOT_ITEM);

  useEffect(
      () => (theme === "light" ? setImgSrc(LiGHT_NOT_ITEM) : setImgSrc(DARK_NOT_ITEM)),
      [theme]
    );

  // 리스트에 들어오는 데이터가 없는 경우
  if (policies.length === 0) {
    return (
      <div className="flex items-center justify-center w-full">
        <img src={imgSrc} alt="검색 결과 없음" className="w-100" />
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 min-w-[360px]">
      {policies.map(item => {
        const linkHref = getPolicyLink(item.region, item.link);
        const category = item.category ?  item.category : "분류없음";
        
        return (
          <ListItem
            key={item.link}
            type="policy"
            region={item.region}
            linkSrc={linkHref}
            comment={0}
            description={item.description}
            category={category}
            likes={0}
            title={item.title}
            writer="청년정책과"
            intent="default"
            size="min"
          />
        );
      })}
    </div>
  );
}
