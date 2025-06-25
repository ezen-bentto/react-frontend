import React from "react";
import Button from "@/components/shared/Button";

interface TreeFilterOption {
  label: string;
  value: string;
  children?: TreeFilterOption[];
}

export interface TreeFilterGroup {
  name: string;
  label: string;
  options: TreeFilterOption[];
}

interface TreeFilterProps {
  group: TreeFilterGroup;
  selectedParent: string | null;
  selectedChildren: string[];
  // eslint-disable-next-line no-unused-vars
  onParentSelect: (value: string) => void;
  // eslint-disable-next-line no-unused-vars
  onChildToggle: (value: string) => void;
}

const TreeFilterGroupSection = ({
  group,
  selectedParent,
  selectedChildren,
  onParentSelect,
  onChildToggle,
}: TreeFilterProps) => {
  const activeParent = group.options.find(opt => opt.value === selectedParent) || group.options[0];

  return (
    <fieldset>
      <div className="flex flex-wrap items-center gap-4">
        <span className="font-semibold">{group.label}</span>

        {/* 부모 & 1뎁스 */}
        <ul className="flex flex-wrap gap-2">
          {group.options.map(option => (
            <Button
              key={option.value}
              type="button"
              onClickFnc={() => {
                if (option.children) {
                  onParentSelect(option.value);
                } else {
                  // 자식 없는 Flat 버튼이면 FilterGroupSection 방식처럼 선택 적용
                  onChildToggle(option.value);
                }
              }}
              intent={
                selectedParent === option.value || selectedChildren.includes(option.value)
                  ? "orange"
                  : "fillter"
              }
            >
              {option.label}
            </Button>
          ))}
        </ul>

        {activeParent.children && (
          <ul className="flex flex-wrap gap-2 mt-2">
            {activeParent.children.map(child => (
              <Button
                key={child.value}
                type="button"
                onClickFnc={() => onChildToggle(child.value)}
                intent={selectedChildren.includes(child.value) ? "orange" : "fillter"}
              >
                {child.label}
              </Button>
            ))}
          </ul>
        )}
      </div>
    </fieldset>
  );
};

export default React.memo(TreeFilterGroupSection);
