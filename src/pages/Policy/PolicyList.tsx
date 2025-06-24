import ListItem from "@/components/shared/ListItem";
import { type PolicyType } from "@/features/Policy/types";
import { getPolicyLink } from "@/features/Policy/getPolicyLink";

interface PolicyListProps {
  policies: PolicyType[];
}

export default function PolicyList({ policies }: PolicyListProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 min-w-[360px]">
      {policies.map(item => {
        const linkHref = getPolicyLink(item.region, item.link);
        const category = item.category ?  item.category : "분류없음";
        
        // console.log(item)
        // console.log(`linkHref: ${linkHref} | category: ${category} | region: ${region}`)
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
            size="md"
          />
        );
      })}
    </div>
  );
}
