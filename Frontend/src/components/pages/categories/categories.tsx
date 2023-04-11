import { AppDispatch, RootState } from "@/store/store";
import getCategories from "@/store/thunks/category/categoryThunk";
import { Category } from "@/types/models";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Divider } from "rsuite";
import PlusButton from "@/elements/plusButton/plusButton";
import AddCategory from "./addCategoryModal/AddCategory";

function Categories() {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector<RootState, Category[]>((x) => x.category);
  const [show, setShow] = useState(false);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const onClickAddCategory = () => {
    setShow(true);
  };

  const handleCancel = () => {
    setShow(false);
  };

  const handleProceed = (value: { name: string; icon: string }) => {
    console.log(value);
  };

  return (
    <div className="mx-auto h-screen w-[700px] py-24">
      {categories && categories.length > 0 ? (
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <h2>Категории</h2>
            <PlusButton onClick={onClickAddCategory} />
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
      <AddCategory isOpen={show} handleClose={handleCancel} handleProceed={handleProceed} />
    </div>
  );
}

export default Categories;
