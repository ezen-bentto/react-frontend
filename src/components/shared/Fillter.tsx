import { useCallback, useEffect, useState } from "react";
import Button from "./Button";
import SearchInput from "./SearchInput";
import { ReloadOutlined } from "@ant-design/icons";
import FilterGroupSection from "./FilterGroupSection";
import TreeFilterGroupSection, {
  type TreeFilterGroup,
} from "@/features/Policy/TreeFilterGroupSection";

/**
 *
 * Fillter 컴포넌트
 * 공모전 등 다양한 필터 조건을 UI로 선택할 수 있게 해주는 필터 컴포넌트
 * 각 필터 그룹은 단일 선택 또는 다중 선택이 가능하며,
 * 선택된 필터는 하단에 버튼 형태로 노출되고 클릭 시 해제할 수 있음.
 * 검색 버튼을 통해 필터 조건으로 검색 실행 가능.
 *
 * @function Fillter.tsx
 * @date 2025/06/09
 * @history
 * -------------------------------------------------------
 *           변경일             작성자             변경내용
 * -------------------------------------------------------
 *
 *        2025/06/09           이철욱           신규작성
 *        2025/06/21           이철욱           태그 추가 고정 레이아웃
 *        2025/06/21           이철욱           리팩토링
 *        2025/06/24           김수연           뎁스2 필터 적용
 *
 * @param filters 필터 그룹 배열. 그룹마다 라벨, 이름, 옵션, 다중선택 여부 포함
 * @param onFilterChange 필터 선택 변경 시 호출되는 콜백 (groupName, selectedValues[])
 * @param onSearchSubmit 검색 버튼 클릭 시 호출되는 콜백
 *
 */

export interface FilterOptionBase {
  label: string;
  value: string;
}

export interface TreeFilterOption extends FilterOptionBase {
  children?: TreeFilterOption[];
}

export type FilterOption = FilterOptionBase | TreeFilterOption;

export interface FilterGroup {
  name: string;
  label: string;
  options: FilterOption[];
  multiSelect?: boolean;
}

interface FilteProps {
  filters: FilterGroup[];
  // eslint-disable-next-line no-unused-vars
  onFilterChange: (type: string, selected: string[]) => void;
  // eslint-disable-next-line no-unused-vars
  onSearchSubmit: (value: string) => void;
  onResetFilters?: () => void;
}

const Fillter = ({ filters, onFilterChange, onSearchSubmit, onResetFilters }: FilteProps) => {
  const [searchText, setSearchText] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<Record<string, Record<string, boolean>>>(
    {}
  );

  const [selectedParentRegion, setSelectedParentRegion] = useState<string | null>(null);
  const [selectedChildRegions, setSelectedChildRegions] = useState<string[]>([]);

  useEffect(() => {
    // 모든 그룹의 선택 상태가 바뀔 때마다 콜백 실행
    Object.entries(selectedFilters).forEach(([groupName, valueObj]) => {
      const selectedValues = Object.keys(valueObj).filter(k => valueObj[k]);
      onFilterChange(groupName, selectedValues);
    });
  }, [selectedFilters]);

  // 청년 정책 자식 노드 관련 useEffet
  useEffect(() => {
    const selected = [selectedParentRegion, ...selectedChildRegions].filter(Boolean);
    onFilterChange("regionParent", selected as string[]);
  }, [selectedParentRegion, selectedChildRegions]);

  const handleFilterClick = (groupName: string, value: string, multiSelect = false) => {
    setSelectedFilters(prev => {
      const currentGroup = prev[groupName] || {};

      let updatedGroup: Record<string, boolean>;

      if (multiSelect) {
        updatedGroup = {
          ...currentGroup,
          [value]: !currentGroup[value],
        };
      } else {
        // 단일 선택은 이전 값 전부 false 처리 후 해당 값만 true
        updatedGroup = {
          [value]: !currentGroup[value],
        };
      }

      const updated = {
        ...prev,
        [groupName]: updatedGroup,
      };

      // 선택된 값들만 배열로 추출해서 콜백 호출
      // const selectedValues = Object.keys(updatedGroup).filter(k => updatedGroup[k]);
      // onFilterChange(groupName, selectedValues);

      return updated;
    });
  };

  // 청년 정책 부모 노드 선택 핸들러
  const handleParentRegionSelect = (parent: string) => {
    setSelectedParentRegion(parent);
    setSelectedChildRegions([]); // 부모 변경 시 자식 초기화
  };

  // 청년 정책 자식 노드 선택 핸들러
  const handleChildRegionToggle = (child: string) => {
    setSelectedChildRegions(prev =>
      prev.includes(child) ? prev.filter(c => c !== child) : [...prev, child]
    );
  };

  const createRemoveHandler = useCallback(
    (groupName: string, value: string) => {
      const multiSelect = filters.find(f => f.name === groupName)?.multiSelect ?? false;
      return () => handleFilterClick(groupName, value, multiSelect);
    },
    [filters, handleFilterClick]
  );

  return (
    <form
      className="p-4 space-y-6 box-border-black"
      onSubmit={e => {
        e.preventDefault();
        onSearchSubmit(searchText);
      }}
    >
      {/* 각 필드 내에 속성들 뿌리기 */}
      {filters.map(group => {
        // children 가진 region인지 확인
        const isTreeGroup = group.options.some(
          opt => "children" in opt && opt.children && opt.children.length > 0
        );

        if (group.name === "regionFlat" && isTreeGroup) {
          return (
            <TreeFilterGroupSection
              key={group.name}
              group={group as TreeFilterGroup}
              selectedParent={selectedParentRegion}
              selectedChildren={selectedChildRegions}
              onParentSelect={handleParentRegionSelect}
              onChildToggle={handleChildRegionToggle}
            />
          );
        } else {
          return (
            <FilterGroupSection
              key={group.name}
              group={group}
              selected={selectedFilters[group.name] || {}}
              onClick={(value: string) => handleFilterClick(group.name, value, group.multiSelect)}
            />
          );
        }
      })}

      {/* 적용된 태그 나열 */}
      <div className="flex flex-wrap gap-2 mt-4 items-center min-h-[48px]">
        <span>적용된 검색조건</span>
        <ReloadOutlined
          onClick={() => {
            setSelectedFilters({});
            setSelectedParentRegion(null); // ✅ 트리 상태도 초기화!
            setSelectedChildRegions([]);
            onResetFilters?.();
          }}
          className="text-xl cursor-pointer"
        />

        {Object.entries(selectedFilters).some(([, values]) =>
          Object.values(values).some(Boolean)
        ) ||
        selectedParentRegion ||
        selectedChildRegions.length ? (
          <>
            {/* Flat 상태 표시 */}
            {Object.entries(selectedFilters).map(([groupName, values]) =>
              Object.entries(values).map(([value, isSelected]) => {
                if (!isSelected) return null;

                const optionLabel =
                  filters.find(f => f.name === groupName)?.options.find(opt => opt.value === value)
                    ?.label || value;

                return (
                  <Button
                    key={`${groupName}-${value}`}
                    type="button"
                    intent="orange"
                    onClickFnc={createRemoveHandler(groupName, value)}
                  >
                    {optionLabel} ✕
                  </Button>
                );
              })
            )}

            {/* ✅ 트리 상태 표시 */}
            {selectedParentRegion && (
              <Button
                type="button"
                intent="orange"
                onClickFnc={() => setSelectedParentRegion(null)}
              >
                {selectedParentRegion} ✕
              </Button>
            )}
            {selectedChildRegions.map(child => (
              <Button
                key={`region-${child}`}
                type="button"
                intent="orange"
                onClickFnc={() => setSelectedChildRegions(prev => prev.filter(c => c !== child))}
              >
                {child} ✕
              </Button>
            ))}
          </>
        ) : (
          <div className="w-24 h-8 ml-2 rounded bg-muted animate-pulse opacity-30" />
        )}
      </div>

      {/* 버튼 */}
      <div className="flex items-center gap-2 mt-4">
        <SearchInput size={"lg"} value={searchText} onChange={e => setSearchText(e.target.value)} />
        <Button type="submit" intent="fillter" onClickFnc={() => {}}>
          검색
        </Button>
      </div>
    </form>
  );
};

export default Fillter;
