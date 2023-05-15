import { Category } from "@/types/models";
import React from "react";
import { Divider, IconButton } from "rsuite";

interface CategoryListProps {
  list: Category[];
  onSelectActive: (subCategoryId: string) => void;
}

function CategoryList({ list, onSelectActive }: CategoryListProps) {
  return (
    <div>
      {list.map((x) => (
        <>
          <div>
            <div className="flex items-center gap-1 border-b  border-indigo-50 pb-2">
              <IconButton
                icon={<span className={` material-symbols-outlined`}>{x.icon}</span>}
                circle
                ripple={false}
                appearance="primary"
                color={x.color}
                onClick={(e) => {
                  e.preventDefault();
                }}
                size="xs"
                disabled
              />
              <span>{x.name}</span>
            </div>
            {x.subcategories.map((sub) => (
              <div className="mt-1 flex items-center gap-1">
                <IconButton
                  icon={<span className={` material-symbols-outlined`}>{sub.icon}</span>}
                  circle
                  ripple={false}
                  appearance="primary"
                  color={sub.color}
                  onClick={() => {
                    onSelectActive(sub.id);
                  }}
                  size="xs"
                />
                <span>{sub.name}</span>
              </div>
            ))}
          </div>
          <Divider />
        </>
      ))}
    </div>
  );
}

export default CategoryList;
