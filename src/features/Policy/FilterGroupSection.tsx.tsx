import React from "react";
import Button from "@/components/shared/Button";
import type { FilterGroup } from "@/components/shared/Fillter";

interface Props {
  group: FilterGroup;
  selected: Record<string, boolean>;
  // eslint-disable-next-line no-unused-vars
  onClick: (value: string) => void;
}

const FilterGroupSection = ({ group, selected, onClick }: Props) => {
  return (
    <fieldset>
      <div className="flex items-center gap-4">
        <span className="font-semibold">{group.label}</span>
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