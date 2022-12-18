import React, { useState } from "react";
import { HashLoader } from "react-spinners";
import { Calendar, Radio } from "rsuite";
import moment from "moment";
import useJwtToken from "../../hooks/useJwtToken";
import { createAim } from "../../pages/api/aimApi";

enum AimType {
  daily,
  saveToDate,
}

export interface Aim {
  aimType: AimType;
  name: string;
  userId: string;
  amount: number;
  finishDate: string;
}

interface AddGoalProps {
  goal?: Aim;
}

const AddGoal: React.FC<AddGoalProps> = ({ goal }) => {
  const [userChoices, setUserChoices] = useState<Aim>({
    aimType: AimType.daily,
    name: "",
    amount: 0,
    userId: "",
    finishDate: "",
  });

  const { decodeToken } = useJwtToken();
  const [loading, setLoading] = useState(false);
  const [succ, setSucc] = useState("");

  const handleUpdateName = (e: string) => {
    console.log(e);

    setUserChoices((prev) => ({ ...prev, e }));
  };

  const handleUpdateAmount = (e: number) => {
    setUserChoices((prev) => ({ ...prev, e }));
  };

  const setAimType = (e: AimType) => {
    setUserChoices((prev) => ({ ...prev, aimType: e }));
  };

  const handleAdd = async () => {
    const uid = decodeToken()?.UserId;

    if (uid) {
      const model: Aim = {
        ...userChoices,
        finishDate:
          userChoices.aimType === AimType.daily
            ? moment(new Date()).endOf("month").format("L")
            : userChoices.finishDate,
        userId: uid,
      };
      setLoading(true);
      const res = await createAim(model);

      setTimeout(() => {
        setLoading(true);
      }, 1000);
      const t = await res.json();
      if (t) {
        setSucc("Success");
      }
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <div className="flex flex-col gap-4">
          <div className="mt-5 flex flex-col">
            <span className="font-bold">Name your goal</span>
            <input
              type="text"
              className="w-40 rounded-md"
              onChange={(e) => handleUpdateName(e.target.value)}
            />
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
                <span>
                  I want to spend no more than a certain amount per day
                </span>
              </Radio>
              <Radio
                id="react"
                name="type"
                defaultChecked
                checked={userChoices.aimType === AimType.saveToDate}
                onChange={() => setAimType(AimType.saveToDate)}
              >
                <span>
                  I want to spend less than a certain amount by a certain date
                </span>{" "}
              </Radio>
            </div>
          </div>
          <div className="mb-4 flex flex-col">
            <span className=" font-bold">Amount</span>
            <input
              type="number"
              className="w-40 rounded-md"
              onChange={(e) =>
                handleUpdateAmount(Number(e.currentTarget.value))
              }
            />
          </div>
          <button
            type="button"
            className=" w-[328px] rounded bg-violet-600 px-4 py-3 text-violet-50 transition hover:bg-violet-800"
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
                setUserChoices({ ...userChoices, finishDate: value.toString() })
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
};
export default AddGoal;
