import { RootState } from "@/store/store";
import { OperationModel } from "@/types/models";
import { BaseProps } from "@/types/props/defaultProps";
import React from "react";
import { useSelector } from "react-redux";
import { IconButton } from "rsuite";

interface OperationListProps extends BaseProps {
  list: OperationModel[];
}

function OperationList({ list }: OperationListProps) {
  const { category } = useSelector<RootState, RootState>((x) => x);

  return (
    <div className="my-2 flex w-full flex-col items-center justify-center gap-1">
      {list.map((sub) => (
        <div className="w-1/2">
          <div className="flex  w-full items-center justify-between gap-3">
            <div className="mt-1 flex flex-col items-center gap-1">
              <IconButton
                icon={
                  <span className={` material-symbols-outlined`}>
                    {category.flatMap((x) => x.subcategories).find((x) => x.id === sub.subCategoryId)?.icon}
                  </span>
                }
                circle
                ripple={false}
                appearance="primary"
                color={category.flatMap((x) => x.subcategories).find((x) => x.id === sub.subCategoryId)?.color}
                onClick={(e) => {
                  e.preventDefault();
                }}
                size="xs"
              />
              <span>{category.flatMap((x) => x.subcategories).find((x) => x.id === sub.subCategoryId)?.name}</span>
            </div>
            <span className="flex">
              <span className="text-lg font-bold">{sub.value} BYN</span>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OperationList;
