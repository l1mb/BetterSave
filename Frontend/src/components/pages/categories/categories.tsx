import { AppDispatch, RootState } from "@/store/store";
import { addCategory, addSubcategory, getCategories } from "@/store/thunks/category/categoryThunk";
import { Category } from "@/types/models";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Divider, IconButton } from "rsuite";
import PlusButton from "@/elements/plusButton/plusButton";
import AddCategory from "./addCategoryModal/AddCategory";

function Categories() {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector<RootState, Category[]>((x) => x.category);
  const [show, setShow] = useState(false);
  const [parentId, setParentId] = useState<string>();

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const onClickAddCategory = () => {
    setShow(true);
  };
  const onClickAddSubcategory = (x: string) => {
    setShow(true);
    setParentId(x);
  };

  const handleCancel = () => {
    setShow(false);
    setParentId(undefined);
  };

  const handleProceed = (value: { name: string; icon: string; color: string }) => {
    if (parentId) {
      dispatch(addSubcategory({ ...value, categoryId: parentId }));
    } else {
      dispatch(addCategory(value));
    }
    setShow(false);
    setParentId(undefined);
  };

  return (
    <div className="mx-auto py-6 md:h-screen md:w-[700px] md:py-24">
      {categories && categories.length > 0 ? (
        <div className="flex flex-col px-5">
          <div className="flex items-center justify-between">
            <h2>Категории</h2>
            <PlusButton onClick={onClickAddCategory} />
          </div>
          <div>
            {categories.map((category) => (
              <div className="flex flex-col">
                <Divider />
                <div className="mt-2 flex flex-col">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <IconButton
                        icon={<span className={` material-symbols-outlined`}>{category.icon}</span>}
                        circle
                        ripple={false}
                        appearance="primary"
                        color={category.color}
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                        size="xs"
                      />
                      <Divider vertical />
                      <h5 className="">{category.name}</h5>
                    </div>
                    <div>
                      <PlusButton onClick={() => onClickAddSubcategory(category.id)} />
                    </div>
                  </div>
                  <Divider />
                  <div className="flex gap-3 ">
                    {category.subcategories.map((subcategory) => (
                      <div className="flex flex-col items-center justify-center" key={subcategory.id}>
                        <IconButton
                          icon={<span className=" material-symbols-outlined flex max-w-min">{subcategory.icon}</span>}
                          circle
                          ripple={false}
                          appearance="primary"
                          color={subcategory.color}
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                          size="xs"
                        />
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
        <>
          <h2>Пока не были добавлены никакие категории</h2> <PlusButton onClick={onClickAddCategory} />
        </>
      )}
      <AddCategory isOpen={show} handleClose={handleCancel} handleProceed={handleProceed} />
    </div>
  );
}

export default Categories;
