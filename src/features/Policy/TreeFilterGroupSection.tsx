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
  onParentSelect: (value: string) => void;
  onChildToggle: (value: string) => void;
}

const TreeFilterGroupSection = ({
  group,
  selectedParent,
  selectedChildren,
  onParentSelect,
  onChildToggle,
}: TreeFilterProps) => {
    console.log("✅ TreeFilterGroupSection rendering!");
    console.log("group.options:", group.options);
    console.log("selectedParent:", selectedParent);
    console.log("selectedChildren:", selectedChildren);

  return (
    <fieldset>
      <div className="flex flex-col gap-2">
        <span className="font-semibold">{group.label}</span>
        <ul className="flex flex-wrap gap-2">
          {group.options.map(option => (
            <li key={option.value} className="flex flex-col gap-1">
              <Button
                type="button"
                onClickFnc={() => {
                    console.log("✅ Parent clicked:", option.value);
                    onParentSelect(option.value)
                }}
                intent={selectedParent === option.value ? "orange" : "fillter"}
              >
                {option.label}
              </Button>

              {option.children?.length && selectedParent === option.value && (
                <ul className="flex flex-wrap gap-1 ml-4">
                  {option.children.map(child => (
                    <li key={child.value}>
                      <label className="flex items-center gap-1">
                        <input
                          type="checkbox"
                          checked={selectedChildren.includes(child.value)}
                          onChange={() => {
                            console.log("✅ Child toggled:", child.value);
                            onChildToggle(child.value)
                        }}
                        />
                        <span>{child.label}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </fieldset>
  );
};

export default React.memo(TreeFilterGroupSection);