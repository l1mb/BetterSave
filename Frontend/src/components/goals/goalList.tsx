import React, { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../../store/store";
import getCardsThunk from "../../store/thunks/cardThunk";
import getSpendingThunk from "../../store/thunks/spendingThunks";
import MyResponsiveLine from "../../elements/nivoLine/responsiveLine";
import { SpendingReportDto } from "../../types/User/Spending/spending";
import { Aim, AimType } from "../../types/User/goals/goals";
import { deleteAim } from "../pages/api/aimApi";

interface GoalListProps {
  goal: Aim;
  setRefresh: (e: string) => void;
}

function GoalList({ goal, setRefresh }: GoalListProps) {
  const { cards, spending } = useSelector<RootState, RootState>((state) => state);

  const [data, setData] = useState<
    {
      id: string;
      color: string;
      data: { x: number; y: number }[];
    }[]
  >([]);
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);

  const dispatch: AppDispatch = useDispatch();

  const generateData = (spendings: SpendingReportDto[]) => {
    const initData = spendings;
    console.log(initData);
    if (spendings.length === 0) {
      return;
    }
    const result: Array<{ date: string; coast: number; id: string }> = [];
    // сгруппировать по дате
    const t = initData.reduce((groups: { [key: string]: SpendingReportDto[] }, item) => {
      const date = item.date.split("T")[0];
      if (!groups[date]) {
        // eslint-disable-next-line no-param-reassign
        groups[date] = [];
      }
      groups[date].push(item);
      return groups;
    }, {});
    const groupArrays = Object.keys(t).map((date) => ({
      date,
      spenings: t[date],
    }));

    const prik = groupArrays.map((item) => ({
      x: moment(item.date).date(),
      y: item.spenings.reduce(
        (accumulator: number, currentValue: SpendingReportDto) => accumulator + currentValue.coast,
        0
      ),
    }));

    let t1 = moment(new Date()).date() - 7;
    const beginDate = t1 < 1 ? 1 : t1;
    t1 = moment(new Date()).date() + 7;
    const endDate = t1 > 31 ? 31 : t1;

    const mergeArr = [];

    for (let index = beginDate; index < endDate; index++) {
      const ind = prik.findIndex((item) => item.x === index);
      if (goal.aimType === AimType.saveToDate) {
        const temp: number[] = mergeArr.length === 0 ? [0] : mergeArr.map((prop) => prop.y);

        mergeArr.push({
          x: index,
          y: Math.max(...temp) + (prik[ind]?.y || 0),
        });
        console.log(mergeArr);
      } else {
        mergeArr.push({
          x: index,
          y: 0,
        });
      }
    }
    let merged = [];
    if (goal.aimType === 0) {
      merged = [...mergeArr, ...prik].sort((q, w) => {
        const z = new Date(q.x).getTime() - new Date(w.x).getTime();
        return z;
      });
    } else {
      merged = mergeArr;
    }
    const baseline = merged.map((item) => ({ x: item.x, y: goal.amount }));

    const dataObject = [
      {
        id: "Spendings",
        color: "#6a51a3",
        data: merged,
      },
      {
        id: "Baseline",
        color: "hsl(84, 100%, 70%)",
        data: baseline,
      },
    ];
    setData(dataObject);
  };

  useEffect(() => {
    dispatch(
      getCardsThunk({
        setError: () => {
          console.log();
        },
      })
    );
  }, []);

  useEffect(() => {
    const card = cards.cards[selectedCardIndex];
    if (card && card?.id) {
      dispatch(
        getSpendingThunk({
          cardId: card.id,
          beginDate: "1990-01-01",
        })
      );
    }
  }, [selectedCardIndex, cards]);
  useEffect(() => {
    if (spending.length > 0) {
      generateData(spending);
    }
  }, [spending]);

  function handleCardClick(index: number): void {
    setSelectedCardIndex(index);
  }

  const handleDeleteGoal = async (id: string) => {
    await deleteAim(id);
    setRefresh((Math.random() + 1).toString(36).substring(7));
  };

  return (
    <div>
      {cards.cards.length > 0 ? (
        <>
          <div className="flex justify-between">
            <h4>
              Task is:{" "}
              <span>
                save {goal.amount} {goal.aimType === 0 ? "each day" : `untill ${moment(goal.finishDate).format("l")}`}
              </span>
            </h4>
            <button type="button" onClick={() => handleDeleteGoal(goal.id as string)}>
              Delete goal
            </button>
          </div>
          <h5>Your progress</h5>
          <div className="flex">
            {data.length > 0 && (
              <div className="flex h-[500px] w-full">
                <MyResponsiveLine data={data} />
              </div>
            )}
            <div className="flex">
              {" "}
              <div className="mt-20 max-h-80 w-52 overflow-x-auto rounded border-2 p-6">
                {cards.cards.map((card, index) => (
                  <button
                    type="button"
                    onClick={() => handleCardClick(index)}
                    key={card.id}
                    className="flex w-full  flex-col rounded border-b-2 bg-white p-2 pb-2 transition hover:cursor-pointer hover:bg-slate-50 
                "
                  >
                    <span className="text-lg font-bold">{card.name}</span>
                    <span>
                      {card.balance} {card.currency}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>
          <h2>We support your will to achive something, but we need to start from tracking your cards</h2>
          <Link to="/cards">You can start here</Link>
        </div>
      )}
    </div>
  );
}

export default GoalList;
