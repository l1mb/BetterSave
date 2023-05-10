import React, { useEffect, useState } from "react";
import { deleteAim, getProgress } from "@/api/aimApi";
import useJwtToken from "@/hooks/useJwtToken";
import { toast } from "react-toastify";
import { Aim, AimProgressModel } from "@/types/models";
import { AimDateType, AimType } from "@/types/User/goals/goals";
import getFormatedString from "@/utils/getNivoFormatedString";
import { useNavigate } from "react-router";
import NivoCalendar from "../NivoCalendar/nivoCalendar";

interface GoalListProps {
  goal: Aim;
  setRefresh: (e: string) => void;
}

function GoalList({ goal, setRefresh }: GoalListProps) {
  // const { cards, spending } = useSelector<RootState, RootState>((state) => state);
  const [progress, setProgress] = useState<AimProgressModel>({ percent: 0, aimRecords: [] });
  const { getToken } = useJwtToken();
  const navigate = useNavigate();

  const loadProgress = async () => {
    const token = getToken();
    if (token) {
      const result = await getProgress(token);
      setProgress(result);
    } else {
      toast.error("Токен не валиден");
    }
  };

  useEffect(() => {
    loadProgress();
  }, []);

  const handleDeleteGoal = async (id: string) => {
    await deleteAim(id);
    navigate("/goals");
    setRefresh((Math.random() + 1).toString(36).substring(7));
  };

  const getAim = (type: AimType, dateType: AimDateType, amount: number, finishDate: Date) => {
    let aim = "";

    if (type === AimType.ExpenseLess) {
      aim += "Тратить меньше";
    } else {
      aim += "Получать больше";
    }
    aim += ` ${amount} BYN `;
    if (dateType === AimDateType.DailyCount) {
      aim += "ежедневно";
    } else if (dateType === AimDateType.DailyToDate) {
      aim += `ежедневно до ${new Date(finishDate).toLocaleDateString()}`;
    }
    if (dateType === AimDateType.ToDate) {
      aim += `суммарно до ${new Date(finishDate).toLocaleDateString()}`;
    }
    return aim;
  };

  const getAimResult = (isMastered?: boolean) => {
    let aim = "";
    if (isMastered === false) {
      aim += "К сожалению, вы провалили цель";
    } else {
      aim += "Поздравляем, вы успешно выполнили цель!";
    }
    return aim;
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h4>Цель: </h4>
          <span className="font-bold">{getAim(goal.type, goal.dateType, goal.amount, goal.finishDate)}</span>
        </div>
        <button type="button" onClick={() => handleDeleteGoal(goal.id as string)}>
          Удалить цель
        </button>
      </div>
      <h5>Ваш прогресс</h5>
      <div className="flex w-full">
        {goal.isMastered !== undefined ? (
          <div>
            <span>{getAimResult(goal.isMastered)}</span>
          </div>
        ) : (
          <>
            {goal.dateType === AimDateType.DailyCount && (
              <div className=" mx-auto h-[400px] w-[50000px]">
                <NivoCalendar
                  data={progress.aimRecords.map((x) => ({ value: 1, day: getFormatedString(new Date(x.date)) }))}
                  createDate={goal.creationDate}
                />
              </div>
            )}
            {goal.dateType === AimDateType.DailyToDate && (
              <div className=" mx-auto h-[400px] w-[50000px]">
                <NivoCalendar
                  data={progress.aimRecords.map((x) => ({ value: 1, day: getFormatedString(new Date(x.date)) }))}
                  createDate={goal.creationDate}
                />
              </div>
            )}
            {goal.dateType === AimDateType.ToDate && "pasasi"}
          </>
        )}
        {/* {data.length > 0 && (
              <div className="flex h-[500px] w-full">
                <MyResponsiveLine data={data} />
              </div>
            )} */}
      </div>
    </div>
  );
}

export default GoalList;
