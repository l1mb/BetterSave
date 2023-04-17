import React, { useState } from "react";
import { HashLoader } from "react-spinners";
import { Calendar, Form, Radio, RadioGroup } from "rsuite";
import { createAim } from "@/api/aimApi";
import { Aim, CreateAim } from "@/types/models";
import { toast } from "react-toastify";
import useJwtToken from "../../hooks/useJwtToken";
import { AimDateType, AimType } from "../../types/User/goals/goals";

interface AddGoalProps {
  goal?: Aim;
  setRefresh: (e: string) => void;
}

function AddGoal({ goal, setRefresh }: AddGoalProps) {
  const [userChoices, setUserChoices] = useState<CreateAim>({
    name: "",
    amount: 0,
    userId: "",
    finishDate: new Date(),
    creationDate: new Date(),
    dateType: AimDateType.DailyCount,
    type: AimType.ExpenseLess,
  });

  const { decodeToken } = useJwtToken();
  const [loading, setLoading] = useState(false);
  const [succ, setSucc] = useState("");

  const handleUpdateName = (e: string) => {
    setUserChoices({ ...userChoices, name: e });
  };

  const handleUpdateAmount = (e: number) => {
    if (e.toString().length < 6) {
      setUserChoices((prev) => ({ ...prev, amount: e }));
    }
  };

  const [dateType, setDateType] = useState<AimDateType>(AimDateType.DailyCount);

  const setAimDateType = (e: AimDateType) => {
    setUserChoices((prev) => ({
      ...prev,
      dateType: e,
    }));
  };

  const setAimType = (e: AimType) => {
    setUserChoices((prev) => ({
      ...prev,
      type: e,
    }));
  };

  const handleAdd = async () => {
    const uid = decodeToken()?.UserId;

    if (uid) {
      const model: CreateAim = {
        amount: userChoices.amount,
        name: userChoices.name,
        finishDate: userChoices.finishDate,
        creationDate: new Date(),
        type: userChoices.type,
        dateType: userChoices.dateType,
        userId: uid,
      };

      setLoading(true);
      const res = await createAim(model);

      setTimeout(() => {
        setLoading(false);
      }, 1000);
      const t = await res.json();
      if (t) {
        toast.success("Success");
        setRefresh((Math.random() + 1).toString(36).substring(7));
      }
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <div className="flex flex-col gap-4">
          <div className="mt-5 flex flex-col">
            <span className="font-bold">Введите название вашей цели</span>
            <input type="text" className="w-40 rounded-md" onChange={(e) => handleUpdateName(e.target.value)} />
          </div>
          <div>
            <span className=" font-bold">Тип цели:</span>
            <div className=" flex flex-col gap-1 text-base">
              <RadioGroup
                name="radioList"
                className=" flex justify-center p-2"
                appearance="picker"
                value={userChoices.type}
                onChange={(e) => setAimType(e)}
              >
                <span className="px-2"> </span>
                <Radio value={AimType.ExpenseLess}>Тратить меньше</Radio>
                <Radio value={AimType.IncreaseIncome}>Получать больше доходов</Radio>
              </RadioGroup>
            </div>{" "}
            <span className=" font-bold">Периодичность цели: </span>
            <div className=" mt-2 flex flex-col gap-1 text-base">
              <RadioGroup
                name="radioList"
                className=" p-2"
                appearance="picker"
                value={userChoices.dateType}
                onChange={(e) => setAimDateType(e)}
              >
                <span className="px-2">Тип цели: </span>
                <Radio value={AimDateType.DailyCount}>Ежедневно</Radio>
                <Radio className="flex items-center" value={AimDateType.DailyToDate}>
                  Ежедневно, до определенной даты{" "}
                  <Form.HelpText tooltip>
                    Цель будет проверяться каждый день,
                    <br /> Выполнена, когда подойдет срок
                  </Form.HelpText>
                </Radio>
                <Radio value={AimDateType.ToDate}>
                  До определенной даты
                  <Form.HelpText tooltip>
                    Когда придет время, мы проверим,
                    <br /> выполнили ли вы свою цель
                  </Form.HelpText>
                </Radio>
              </RadioGroup>
            </div>
          </div>
          <div className="mb-4 flex flex-col">
            <span className=" font-bold">Сумма</span>
            <input
              type="number"
              className="w-40 rounded-md"
              onChange={(e) => handleUpdateAmount(Number(e.currentTarget.value))}
            />
          </div>
          <button
            type="button"
            className=" w-[328px] rounded bg-indigo-600 px-4 py-3 text-indigo-50 transition hover:bg-indigo-800"
            onClick={() => handleAdd()}
          >
            Начать отслеживание цели
          </button>
        </div>
        {userChoices.dateType === AimDateType.DailyToDate || userChoices.dateType === AimDateType.ToDate ? (
          <div style={{ minWidth: 350, width: 400 }}>
            <Calendar
              bordered
              compact
              format="YYYY-MM-DD HH:mm:ss"
              value={new Date(userChoices.finishDate)}
              onChange={(value) =>
                setUserChoices({
                  ...userChoices,
                  finishDate: value,
                })
              }
            />
          </div>
        ) : null}
      </div>

      <div className="text-viole  mx-auto mt-10 w-8">
        {loading ? <HashLoader loading color="#6d28d9" /> : <span>{succ}</span>}
      </div>
    </div>
  );
}
export default AddGoal;
