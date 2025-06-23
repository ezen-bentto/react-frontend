import { useEffect } from "react";
import { usePolicyStore } from "@/features/Policy/store.ts";
import ListItem from "@/components/shared/ListItem";

export default function PolicyList() {
  const { policies, fetchPolicies, isLoading, error } = usePolicyStore();

  useEffect(() => {
    fetchPolicies();
  }, []);

  if (isLoading) return <p>불러오는 중입니다...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {policies.map(item => (
        <ListItem
          key={item.link}
          type="policy"
          region={item.region}
          linkSrc={`/policy/${item.link}`}
          comment={0}
          description={item.description}
          category={item.category}
          likes={0}
          title={item.title}
          writer="청년정책과"
          intent="default"
          size="md"
        />
      ))}
    </div>
  );
}
