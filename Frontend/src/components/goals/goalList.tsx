import React, { useEffect } from "react";
import { deleteAim } from "@/api/aimApi";
import useJwtToken from "@/hooks/useJwtToken";
import { AimProgressModel } from "@/types/models";
import { AimDateType, AimType } from "@/types/User/goals/goals";
import { useNavigate } from "react-router";
import HeatMap from "../heatmap/heatmap";

interface GoalListProps {
  goal: AimProgressModel[];
  setRefresh: (e: string) => void;
}

function GoalList({ goal, setRefresh }: GoalListProps) {
  // const { cards, spending } = useSelector<RootState, RootState>((state) => state);
  const { getToken } = useJwtToken();
  const navigate = useNavigate();

  useEffect(() => {}, []);

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

  return goal.map((x) => (
    <div>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h4>Цель: </h4>
          <span className="font-bold">{getAim(x.aim.type, x.aim.dateType, x.aim.amount, x.aim.finishDate)}</span>
        </div>
        <button type="button" onClick={() => handleDeleteGoal(x.aim.id as string)}>
          Удалить цель
        </button>
      </div>
      <h5>Ваш прогресс</h5>
      <div className="flex w-full">
        {goal.isMastered !== undefined ? (
          <div>
            <span>{getAimResult(x.aim.isMastered)}</span>
          </div>
        ) : (
          <>
            {x.aim.dateType === AimDateType.DailyCount && (
              <div className=" mx-auto h-[400px] w-[50000px]">
                {!x.aim.aimRecordings || x.aim.aimRecordings?.map((y) => y.date).length === 0 ? (
                  <span>Пока не было добавлено отметок о выполнении целей</span>
                ) : (
                  <HeatMap data={x.aim.aimRecordings.map((y) => y.date)} height={140} width={0} label={x.aim.name} />
                )}
              </div>
            )}
            {x.aim.dateType === AimDateType.DailyToDate && (
              <div className=" mx-auto h-[400px] w-[50000px]">
                {!x.aim.aimRecordings || x.aim.aimRecordings?.map((y) => y.date).length === 0 ? (
                  <span>Пока не было добавлено отметок о выполнении целей</span>
                ) : (
                  <HeatMap data={x.aim.aimRecordings.map((y) => y.date)} height={140} width={0} label={x.aim.name} />
                )}
              </div>
            )}
            {x.aim.dateType === AimDateType.ToDate && "pasasi"}
          </>
        )}
        {/* {data.length > 0 && (
              <div className="flex h-[500px] w-full">
                <MyResponsiveLine data={data} />
              </div>
            )} */}
      </div>
    </div>
  ));
}

export default GoalList;
