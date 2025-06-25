import React from "react";
import Button from "./Button";
import type { FilterGroup } from "./Fillter";

/**
 *
 * FilterGroupSection 컴포넌트
 * 하나의 필터 그룹(라벨 + 옵션 목록)을 렌더링하며, 각 옵션은 버튼 형태로 출력됨.
 * 각 버튼은 선택 여부에 따라 스타일이 달라지고, 클릭 시 상위에서 전달받은 핸들러를 호출함.
 * React.memo를 적용하여 불필요한 리렌더링을 방지함.
 *
 * @function FilterGroupSection.tsx
 * @date 2025/06/20
 * @history
 * -------------------------------------------------------
 *           변경일             작성자             변경내용
 * -------------------------------------------------------
 *        2025/06/20           이철욱             모듈화, useMemo
 *
 * @param group 필터 그룹 객체. 라벨, 옵션 목록, 다중 선택 여부 포함
 * @param selected 현재 선택된 값 객체. key는 option의 value, value는 boolean
 * @param onClick 옵션 클릭 시 실행할 콜백 함수. 클릭된 value 전달
 *
 */

interface Props {
  group: FilterGroup;
  selected: Record<string, boolean>;
  // eslint-disable-next-line no-unused-vars
  onClick: (value: string) => void;
}

const FilterGroupSection = ({ group, selected, onClick }: Props) => {
  return (
    <fieldset>
      <div className="flex flex-wrap items-center gap-4 ">
        <span className="font-semibold whitespace-nowrap">{group.label}</span>
        <ul className="flex flex-wrap gap-2">
          {group.options.map(option => (
            <li key={option.value}>
              <Button
                type="button"
                onClickFnc={() => onClick(option.value)}
                intent={selected?.[option.value] ? "orange" : "fillter"}
              >
                {option.label}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </fieldset>
  );
};

export default React.memo(FilterGroupSection);
