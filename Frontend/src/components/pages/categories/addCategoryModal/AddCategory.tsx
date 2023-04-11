import ModalWrapper from "@/components/modals/modalWrapper";
import React, { useState } from "react";
import { Input } from "rsuite";
import { TypeAttributes } from "rsuite/esm/@types/common";
import CategoryPicker from "../CategoryPicker/categoryPicker";

interface AddCategoryProps {
  isOpen: boolean;
  handleClose: () => void;
  handleProceed: (param: { icon: string; name: string; color: TypeAttributes.Color }) => void;
}

function AddCategory({ isOpen, handleClose, handleProceed }: AddCategoryProps) {
  const [name, setName] = useState("");
  const [activeColor, setActiveColor] = useState<TypeAttributes.Color>("blue");
  const [activeIcon, setActiveIcon] = useState<string>("");

  const onChangeIcon = (color: TypeAttributes.Color, icon: string) => {
    setActiveColor(color);
    setActiveIcon(icon);
  };

  const onCLickProceed = () => {
    handleProceed({
      icon: activeIcon,
      name,
      color: activeColor,
    });
  };

  const onChangeName = (value: string) => {
    setName(value);
  };
  return (
    <ModalWrapper
      open={isOpen}
      backdrop="static"
      handleClose={handleClose}
      handleProceed={onCLickProceed}
      title="Давайте добавим категорию"
      cancelLabel="Назад"
      okLabel="Добавить
      "
      size="xs"
    >
      <div className="flex gap-2 py-1 px-2">
        <div className="flex flex-col">
          <CategoryPicker onChange={onChangeIcon} />
        </div>
        <Input value={name} onChange={onChangeName} />
      </div>
    </ModalWrapper>
  );
}

export default AddCategory;
