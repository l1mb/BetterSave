import React, { useState } from "react";
import { HashLoader } from "react-spinners";
import { Calendar, Radio } from "rsuite";
import moment from "moment";
import { createAim } from "@/api/aimApi";
import useJwtToken from "../../hooks/useJwtToken";
import { Aim, AimType } from "../../types/User/goals/goals";

interface AddGoalProps {
  goal?: Aim;
  setRefresh: (e: string) => void;
}

function AddGoal({ goal, setRefresh }: AddGoalProps) {
  const [userChoices, setUserChoices] = useState<Aim>({
    aimType: AimType.daily,
    name: "",
    amount: 0,
    userId: "",
    finishDate: new Date(),
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

  const setAimType = (e: AimType) => {
    setUserChoices((prev) => ({ ...prev, aimType: e }));
  };

  const handleAdd = async () => {
    const uid = decodeToken()?.UserId;

    if (uid) {
      const model: Aim = {
        finishDate:
          userChoices.aimType === AimType.daily
            ? (moment(new Date()).endOf("month").format("L") as unknown as Date)
            : (moment(userChoices.finishDate).format("L") as unknown as Date),
        userId: uid,
        aimType: userChoices.aimType,
        amount: userChoices.amount,
        name: userChoices.name,
      };
      console.log(model);
      setLoading(true);
      const res = await createAim(model);

      setTimeout(() => {
        setLoading(false);
      }, 1000);
      const t = await res.json();
      if (t) {
        setSucc("Success");
        setRefresh((Math.random() + 1).toString(36).substring(7));
      }
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <div className="flex flex-col gap-4">
          <div className="mt-5 flex flex-col">
            <span className="font-bold">Name your goal</span>
            <input type="text" className="w-40 rounded-md" onChange={(e) => handleUpdateName(e.target.value)} />
          </div>
          <div>
            <span className=" font-bold">What is your purpose</span>
            <div className=" flex flex-col gap-1 text-base">
              <Radio
                id="html"
                name="type"
                checked={userChoices.aimType === AimType.daily}
                onChange={() => setAimType(AimType.daily)}
              >
                <span>I want to spend no more than a certain amount per day</span>
              </Radio>
              <Radio
                id="react"
                name="type"
                defaultChecked
                checked={userChoices.aimType === AimType.saveToDate}
                onChange={() => setAimType(AimType.saveToDate)}
              >
                <span>I want to spend less than a certain amount by a certain date</span>{" "}
              </Radio>
            </div>
          </div>
          <div className="mb-4 flex flex-col">
            <span className=" font-bold">Amount</span>
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
            Start goal tracking
          </button>
        </div>
        {userChoices.aimType === AimType.saveToDate ? (
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
