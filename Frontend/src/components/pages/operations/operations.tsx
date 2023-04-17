import { BaseProps } from "@/types/props/defaultProps";
import checkSwitchStatementDefaultCase from "@/utils/switchCheck";
import React, { useEffect, useState } from "react";
import PlusButton from "@/elements/plusButton/plusButton";
import ModalWrapper from "@/components/modals/modalWrapper";
import { Form, IconButton, InputNumber, Radio, RadioGroup } from "rsuite";
import { AccountModel, CreateOperationModel, NivoPieSegment, OperationModel, OperationType } from "@/types/models";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import getAccountsThunk from "@/store/thunks/account/accountThunk";
import fetchAllUserOperations, { createOperation, fetchUserOperationPie } from "@/api/operations/operationApi";
import useJwtToken from "@/hooks/useJwtToken";
import { getCategories } from "@/store/thunks/category/categoryThunk";
import { toast } from "react-toastify";
import ErrorDto from "@/types/auth/errorDto";
import DatePicker from "./datePicker/datePicker";
import OperationList from "./operationList/operationList";
import OperationTypeLabel, { OperaionTypeProps } from "./operationType/operationType";
import styles from "./styles.module.scss";
import AccountPicker from "./accountPicker/accountPicker";
import CategoryList from "../split/categoryList/categoryList";
import OperationPie from "./operationsPie/operationPie";

type OperationProps = BaseProps;
type OperationTypeHeader = "income" | "outcome" | "balance";

function Operations({}: OperationProps) {
  const [operationType, setOperationType] = useState<OperationTypeHeader>("outcome");
  const [allOperations, setAllOperations] = useState<OperationModel[]>([]);
  const [isAddOperationOpen, setIsAddOperationOpen] = useState(false);
  const [operationValue, setOperationValue] = useState(0);

  const [pie, setPie] = useState<NivoPieSegment[]>([]);

  const [addOperationModel, setAddOperationModel] = useState<Partial<CreateOperationModel>>({});

  const onChangeOperationModel = (value: number | string, key: keyof CreateOperationModel) => {
    setAddOperationModel((prev) => ({ ...prev, [key]: value }));
  };

  const [activeAccount, setActiveAccount] = useState<AccountModel>();

  const { accounts, category } = useSelector<RootState, RootState>((x) => x);
  const dispatch: AppDispatch = useDispatch();

  const onChangeType = (e: string) => {
    onChangeOperationModel(Number(e), "type");
  };

  const { getUserId } = useJwtToken();
  const fetchOperations = async () => {
    const uid = getUserId();
    const result = await fetchAllUserOperations(uid);
    const pies = await fetchUserOperationPie(
      uid,
      operationType === "income" ? OperationType.Income : OperationType.Expense
    );
    setAllOperations(result);
    setPie(pies);
  };

  useEffect(() => {
    fetchOperations();
  }, [operationType]);

  const onChangeValue = () => {};

  const onChangeDescription = () => {};

  const onChangeSubCategory = () => {};

  const onChangeAccountId = () => {};

  const clearOperationModel = () => {
    setAddOperationModel({});
  };

  const [selectedCategoryId, setSelectedCategoryId] = useState("");

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
    dispatch(getCategories());

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
    setOperationType(operationType);
  };

  const openAddOperation = () => {
    setIsAddOperationOpen(true);
  };

  const onAddOperation = () => {
    openAddOperation();
  };

  const handleCloseOperation = () => {
    closeAddOperation();
  };
  const hanldeAddOperation = async () => {
    debugger;
    if (activeAccount?.id) {
      const model: CreateOperationModel = {
        type: addOperationModel.type || 0,
        value: operationValue,
        description: "",
        subCategoryId: selectedCategoryId,
        accountId: activeAccount?.id,
      };

      const result = await createOperation(model);
      if ((result as unknown as ErrorDto).errorMessage) {
        toast.error((result as unknown as ErrorDto).errorMessage);
      } else {
        toast.success("Добавлено успешно");
        setAllOperations((prev) => [...prev, result]);
      }
    } else {
      toast.warning("Пожалуйста, выберите счет");
    }
    handleCloseOperation();
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

  const getSubcategory = (id: string) => category.flatMap((x) => x.subcategories).find((x) => x.id === id);
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
      <div className="flex justify-center">
        <AccountPicker
          activeAccount={activeAccount}
          allAccounts={accounts}
          setActiveAccount={(e) => setActiveAccount(accounts.find((x) => x.id === e))}
        />
      </div>
      <div className="my-16 flex justify-center">
        <DatePicker
          start={date}
          end={new Date(new Date(date).getTime() + 30 * 24 * 60 * 60 * 1000)}
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
        />
      </div>
      <OperationPie data={pie} />
      <div className="my-16 flex flex-col items-center justify-center">
        <div className="flex gap-2">
          <span className="flex grow items-center gap-2">
            Сейчас отображаются:{" "}
            <span className={`${styles.operationDropdown}`}>
              <span className="font-bold">{getOperationName(operationType)}</span>
              <div className="gap-2 rounded px-2 py-1 shadow">
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

        <OperationList
          list={
            operationType === "income"
              ? allOperations.filter((x) => OperationType[x.type.toString()] === OperationType.Income)
              : allOperations.filter((x) => OperationType[x.type.toString()] === OperationType.Expense)
          }
          getSubcategory={category.flatMap((x) => x.subcategories).find((x) => x.id === selectedCategoryId)}
        />

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
          <div className="p-1">
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
              {/* <Form.Group controlId="description">
                <Form.ControlLabel>Описание</Form.ControlLabel>
                <Form.Control name="description" type="text" />
              </Form.Group> */}
              <Form.Group>
                <Form.ControlLabel>Значение</Form.ControlLabel>
                <Form.Control
                  className="flex flex-grow"
                  name="numder"
                  value={operationValue}
                  accepter={InputNumber}
                  onChange={(e) => setOperationValue(e)}
                />
              </Form.Group>
              <Form.Group>
                <Form.ControlLabel>
                  Выбранная категория:{" "}
                  <IconButton
                    icon={
                      <span className={` material-symbols-outlined`}>
                        {category.flatMap((x) => x.subcategories).find((x) => x.id === selectedCategoryId)?.icon}
                      </span>
                    }
                    circle
                    ripple={false}
                    appearance="primary"
                    color={category.flatMap((x) => x.subcategories).find((x) => x.id === selectedCategoryId)?.color}
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                    size="xs"
                  />
                </Form.ControlLabel>
                <CategoryList list={category} onSelectActive={(e) => setSelectedCategoryId(e)} />
              </Form.Group>
            </Form>
          </div>
        </ModalWrapper>
      </div>
    </div>
  );
}

export default Operations;
