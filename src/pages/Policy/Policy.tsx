import SelectInput from "@/components/shared/SelectInput";

export default function Policy() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-20">
      {/* filter component */}
      <section>{/* search component */}</section>
      <section>
        <SelectInput
          options={["최신순", "인기순"]}
          placeholder="정렬기준 선택"
          defaultValue="최신순"
          // onChange={(v) => setSort(v)}
          intent="default"
          size="sm"
        />
      </section>
      <section></section>
    </div>
  );
}
