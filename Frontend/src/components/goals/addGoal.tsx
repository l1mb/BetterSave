import React, { useState } from "react";
import { HashLoader } from "react-spinners";
import { Calendar, Form, Radio, RadioGroup } from "rsuite";
import { createAim } from "@/api/aimApi";
import { Aim, CreateAim } from "@/types/models";
import { toast } from "react-toastify";
import useWindowSize from "@/hooks/useWindowSizeHook";
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

  const { isMobile } = useWindowSize();

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
      {/* <HeatMap
        height={140}
        width={400}
        label="Приколь"
        data={[
          "2023-04-26T00:00:00.000Z",
          "2023-05-28T00:00:00.000Z",
          "2023-05-29T00:00:00.000Z",
          "2023-05-30T00:00:00.000Z",
          "2023-05-01T00:00:00.000Z",
          "2023-05-02T00:00:00.000Z",
          "2023-05-03T00:00:00.000Z",
          "2023-05-04T00:00:00.000Z",
          "2023-05-05T00:00:00.000Z",
          "2023-05-06T00:00:00.000Z",
          "2023-05-07T00:00:00.000Z",
          "2023-05-08T00:00:00.000Z",
          "2023-05-09T00:00:00.000Z",
          "2023-05-10T00:00:00.000Z",
          "2023-05-11T00:00:00.000Z",
          "2023-05-12T00:00:00.000Z",
          "2023-05-13T00:00:00.000Z",
          "2023-05-14T00:00:00.000Z",
          "2023-05-15T00:00:00.000Z",
          "2023-05-16T00:00:00.000Z",
          "2023-05-17T00:00:00.000Z",
          "2023-05-18T00:00:00.000Z",
          "2023-05-19T00:00:00.000Z",
          "2023-05-20T00:00:00.000Z",
          "2023-05-21T00:00:00.000Z",
          "2023-05-22T00:00:00.000Z",
          "2023-05-23T00:00:00.000Z",
          "2023-05-24T00:00:00.000Z",
          "2023-05-25T00:00:00.000Z",
          "2023-05-26T00:00:00.000Z",
          "2023-05-27T00:00:00.000Z",
        ]}
      /> */}

      <div className="flex flex-col justify-between md:flex-row">
        <div className="flex flex-col gap-4">
          <div className="mt-5 flex flex-col">
            <span className="mb-2 font-bold">Введите название вашей цели</span>
            <input
              type="text"
              className="w-full rounded-md md:w-40"
              onChange={(e) => handleUpdateName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-[4px]">
            <span className="font-bold ">Тип цели:</span>
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
          </div>
          <div>
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
                  {!isMobile && (
                    <Form.HelpText tooltip>
                      Цель будет проверяться каждый день,
                      <br /> Выполнена, когда подойдет срок
                    </Form.HelpText>
                  )}
                </Radio>
                <Radio value={AimDateType.ToDate}>
                  До определенной даты
                  {!isMobile && (
                    <Form.HelpText tooltip>
                      Когда придет время, мы проверим,
                      <br /> выполнили ли вы свою цель
                    </Form.HelpText>
                  )}
                </Radio>
              </RadioGroup>
            </div>
          </div>
          {/* {userChoices.dateType === AimDateType.DailyToDate || userChoices.dateType === AimDateType.ToDate ? (
            <div className="mb-4 flex flex-col md:hidden">
              <DatePicker oneTap style={{ width: 200 }} />
            </div>
          ) : null} */}
          <div className="mb-4 flex flex-col gap-[4px]">
            <span className=" font-bold ">Сумма</span>
            <input
              type="number"
              className="w-full rounded-md md:w-40 "
              onChange={(e) => handleUpdateAmount(Number(e.currentTarget.value))}
            />
          </div>
        </div>
        {userChoices.dateType === AimDateType.DailyToDate || userChoices.dateType === AimDateType.ToDate ? (
          <div style={{ minWidth: 350, width: isMobile ? 350 : 400 }}>
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
      <button
        type="button"
        className="w-full rounded bg-indigo-600 px-4 py-3 text-indigo-50 transition hover:bg-indigo-800 md:w-[328px]"
        onClick={() => handleAdd()}
      >
        Начать отслеживание цели
      </button>

      <div className="text-viole  mx-auto mt-10 w-8">
        {loading ? <HashLoader loading color="#6d28d9" /> : <span>{succ}</span>}
      </div>
    </div>
  );
}
export default AddGoal;
