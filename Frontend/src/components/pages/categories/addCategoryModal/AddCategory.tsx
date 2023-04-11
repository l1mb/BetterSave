import ModalWrapper from "@/components/modals/modalWrapper";
import React, { useState } from "react";
import { Input } from "rsuite";
import CategoryPicker from "../CategoryPicker/categoryPicker";

interface AddCategoryProps {
  isOpen: boolean;
  handleClose: () => void;
  handleProceed: ({ icon: string, name: string }) => void;
}

function AddCategory({ isOpen, handleClose, handleProceed }: AddCategoryProps) {
  const [name, setName] = useState("");

  const onCLickProceed = () => {
    handleProceed({
      icon: "test",
      name,
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
          <CategoryPicker />
        </div>
        <Input value={name} onChange={onChangeName} />
      </div>
    </ModalWrapper>
  );
}

export default AddCategory;
