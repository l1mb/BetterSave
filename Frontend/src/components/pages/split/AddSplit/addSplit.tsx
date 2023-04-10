import ModalWrapper from "@/components/modals/modalWrapper";
import React, { useState } from "react";
import { Button, Header, Input } from "rsuite";

type Person = {
  name: string;
};

function AddSplit() {
  const [people, setPeople] = useState<Person[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSpendingOpen, setIsSpendingOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const [editableUser, setEditableUser] = useState<Person>();

  const addPerson = () => {
    console.log(people, editableUser);
    setPeople((prev) => {
      if (editableUser) {
        prev.push(editableUser);
      }
      return prev;
    });
    // setPeople(prev => )
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const openAddUserModal = () => {
    setIsOpen(true);
  };

  const handleAddUser = () => {
    addPerson();
    handleClose();
  };

  function setActiveUser(index: number) {
    setActiveIndex(index);
  }

  const updateUserName = (value: string) => {
    console.log(value);
    setEditableUser({ name: value });
  };

  const openAddSpending = () => {
    setIsSpendingOpen(true);
  };
  const handleCloseSpending = () => {
    setIsSpendingOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Header>
        {people.length > 0 ? (
          <span className="font-bold ">Участники</span>
        ) : (
          <span
            className="font-bold
        "
          >
            Участников пока нет
          </span>
        )}
      </Header>
      <div className="my-4 flex gap-2">
        {people.map((x, index: number) => (
          <button
            className={`rounded-full  border border-indigo-700 px-3 py-1 ${
              activeIndex === index ? "animate-pulse bg-indigo-700 text-indigo-50" : "bg-white text-indigo-700"
            }`}
            type="button"
            onClick={() => setActiveUser(index)}
          >
            {x.name}
          </button>
        ))}
      </div>
      <ModalWrapper
        size="xs"
        open={isOpen}
        backdrop="static"
        handleClose={handleClose}
        handleProceed={handleAddUser}
        title="Введите имя нового участника"
        cancelLabel="Назад"
        okLabel="Добавить"
      >
        <div className=" p-1">
          <Input placeholder="Например, Артем" onChange={updateUserName} />
        </div>
      </ModalWrapper>

      <ModalWrapper
        size="xs"
        open={isSpendingOpen}
        backdrop="static"
        handleClose={handleCloseSpending}
        handleProceed={handleAddUser}
        title="Расходы"
        cancelLabel="Назад"
        okLabel="Добавить"
      >
        <div className=" p-1">
          <div className="flex flex-col items-center justify-center gap-3">
            <h2>Сумма</h2>
            <div className="w-1/2">
              <Input className="w-1/2" placeholder="15,99" type="number" onChange={updateUserName} />
            </div>
            <div>
              <h3>Выберите категорию</h3>
            </div>
          </div>
        </div>
      </ModalWrapper>

      <div className="flex gap-2">
        <Button appearance="primary" onClick={openAddUserModal}>
          Добавить участника
        </Button>
        <Button appearance="primary" onClick={openAddSpending}>
          Добавить трату
        </Button>
      </div>
    </div>
  );
}

export default AddSplit;
