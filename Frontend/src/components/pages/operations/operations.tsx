import { BaseProps } from "@/types/props/defaultProps";
import checkSwitchStatementDefaultCase from "@/utils/switchCheck";
import React, { useEffect, useState } from "react";
import PlusButton from "@/elements/plusButton/plusButton";
import ModalWrapper from "@/components/modals/modalWrapper";
import { Form, Radio, RadioGroup } from "rsuite";
import { AccountModel, CreateOperationModel, OperationType } from "@/types/models";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getAccountsByUserId } from "@/api/account/accountApi";
import DatePicker from "./datePicker/datePicker";
import OperationList from "./operationList/operationList";
import OperationTypeLabel, { OperaionTypeProps } from "./operationType/operationType";
import styles from "./styles.module.scss";
import getAccountsThunk from "@/store/thunks/account/accountThunk";

type OperationProps = BaseProps;
type OperationTypeHeader = "income" | "outcome" | "balance";

function Operations({}: OperationProps) {
  const [operationType, setOperationType] = useState<OperationTypeHeader>("outcome");
  const [isAddOperationOpen, setIsAddOperationOpen] = useState(false);

  const [addOperationModel, setAddOperationModel] = useState<Partial<CreateOperationModel>>({});

  const onChangeOperationModel = (value: number | string, key: keyof CreateOperationModel) => {
    setAddOperationModel((prev) => ({ ...prev, [key]: value }));
  };

  const accounts = useSelector<RootState, AccountModel[]>((x) => x.accounts);
  const dispatch: AppDispatch = useDispatch();

  const onChangeType = (e: string) => {
    onChangeOperationModel(Number(e), "type");
  };

  useEffect(() => {
    console.log(addOperationModel);
  }, [addOperationModel]);

  const onChangeValue = () => {};

  const onChangeDescription = () => {};

  const onChangeSubCategory = () => {};

  const onChangeAccountId = () => {};

  const clearOperationModel = () => {
    setAddOperationModel({});
  };

  const [arr, setArr] = useState([]);

  // dates
  const [date, setDate] = useState(new Date());

  const handleIncrement = () => {
    setDate((prevState) => {
      const t = prevState;
      t.setMonth(t.getMonth() + 1);
      return new Date(t);
    });
  };

  const handleDecrement = () => {
    setDate((prevState) => {
      const t = prevState;
      t.setMonth(t.getMonth() - 1);
      return new Date(t);
    });
  };

  // income amount
  // outcome amount

  function getOpeartionArray() {
    // if (operationType === "income") {
    //   setArr(incomeArr);
    // } else {
    //   setArr(outcomeArr.reverse());
    // }
  }

  useEffect(() => {
    dispatch(getAccountsThunk());

    console.log(operationType);
    getOpeartionArray();
    console.log(operationType);
  }, [operationType]);

  function getOperationName(type: OperationTypeHeader) {
    switch (type) {
      case "income":
        return "Доходы";
      case "outcome":
        return "Расходы";
      case "balance":
        return "Баланс";
      default:
        checkSwitchStatementDefaultCase(type);
        return "";
    }
  }

  function selectActiveIncome() {
    setOperationType("income");
  }
  function selectActiveOutcome() {
    setOperationType("outcome");
  }

  const closeAddOperation = () => {
    setIsAddOperationOpen(false);
    clearOperationModel();
  };

  const openAddOperation = () => {
    setIsAddOperationOpen(true);
  };

  const onAddOperation = () => {
    openAddOperation();
  };

  const hanldeAddOperation = () => {};

  const handleCloseOperation = () => {
    closeAddOperation();
  };

  const headerLine: OperaionTypeProps[] = [
    {
      label: "Расходы",
      onSelect: () => setOperationType("outcome"),
    },
    {
      label: "Доходы",
      onSelect: () => setOperationType("income"),
    },
    {
      label: "Баланс",
      onSelect: () => setOperationType("balance"),
    },
  ];
  return (
    <div className="mx-auto flex h-screen w-[566px]  flex-col py-24">
      {/* Header line */}
      <div className=" flex justify-evenly gap-4">
        {headerLine.map((x, index) => (
          <>
            <OperationTypeLabel label={x.label} onSelect={x.onSelect} />
            {index !== headerLine.length - 1 && <span className="w-[1px] rounded bg-gray-700" />}
          </>
        ))}
      </div>
      <div className="my-16 flex justify-center">
        <DatePicker
          start={date}
          end={new Date(new Date(date).getTime() + 30 * 24 * 60 * 60 * 1000)}
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
        />
      </div>
      <div className="my-16 flex flex-col items-center justify-center">
        <div className="flex">
          <span className="flex grow">
            Сейчас отображаются:{" "}
            <span className={`${styles.operationDropdown}`}>
              <span className="font-bold">{getOperationName(operationType)}</span>
              <div className="rounded px-2 py-1 shadow">
                {operationType === "income" && (
                  <button type="button" onClick={selectActiveOutcome}>
                    Расходы
                  </button>
                )}
                {operationType === "outcome" && (
                  <button type="button" onClick={selectActiveIncome}>
                    Доходы
                  </button>
                )}
              </div>
            </span>
          </span>
          <PlusButton onClick={onAddOperation} />
        </div>
        <OperationList list={arr} />

        <ModalWrapper
          title="Давайте добавим новую операцию"
          open={isAddOperationOpen}
          backdrop="static"
          handleClose={handleCloseOperation}
          handleProceed={hanldeAddOperation}
          cancelLabel="Назад"
          okLabel="Добавить"
          size="xs"
        >
          <div>
            <Form>
              <Form.Group>
                <RadioGroup
                  className="w-full items-center"
                  appearance="picker"
                  inline
                  value={addOperationModel.type}
                  onChange={(e) => onChangeType(e)}
                >
                  <span className="py-1 px-2">Тип операции</span>
                  <Radio value={OperationType.Income}>Доходы</Radio>
                  <Radio value={OperationType.Expense}>Расходы</Radio>
                </RadioGroup>
              </Form.Group>
              <Form.Group controlId="description">
                <Form.ControlLabel>Описание</Form.ControlLabel>
                <Form.Control name="description" type="text" />
              </Form.Group>
            </Form>
          </div>
        </ModalWrapper>
      </div>
    </div>
  );
}

export default Operations;
