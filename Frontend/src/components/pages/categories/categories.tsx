import { AppDispatch, RootState } from "@/store/store";
import getCategories from "@/store/thunks/category/categoryThunk";
import { Category } from "@/types/models";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Divider, IconButton } from "rsuite";
import PlusIcon from "@rsuite/icons/Plus";

function Categories() {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector<RootState, Category[]>((x) => x.category);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <div className="mx-auto h-screen w-[700px] py-24">
      {categories && categories.length > 0 ? (
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <h2>Категории</h2>
            <IconButton icon={<PlusIcon />} circle />
          </div>
          <Divider />
          <div>
            {categories.map((category) => (
              <div className="flex flex-col">
                <div className="flex flex-col">
                  <span className="flex items-center">
                    <span>{category.icon}</span>
                    <Divider vertical />
                    <h5>{category.name}</h5>
                  </span>
                  <Divider />
                  <div>
                    {category.subcategories.map((subcategory) => (
                      <div className="flex flex-col" key={subcategory.id}>
                        <span>{subcategory.icon}</span>
                        <span>{subcategory.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <h2>Пока не были добавлены никакие категории</h2>
      )}
    </div>
  );
}

export default Categories;
