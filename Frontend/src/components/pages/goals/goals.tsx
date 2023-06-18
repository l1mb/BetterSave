import useJwtToken from "@/hooks/useJwtToken";
import React, { useEffect, useState } from "react";
import { getProgress } from "@/api/aimApi";
import { AimProgressModel } from "@/types/models";
import AddGoal from "../../goals/addGoal";
import GoalList from "../../goals/goalList";
import styles from "./loans.module.scss";

enum SelectedSubPage {
  AddGoals,
  List,
}

function Goals() {
  const { getToken } = useJwtToken();
  const [activePage, setActivePage] = useState(SelectedSubPage.AddGoals);
  const { decodeToken } = useJwtToken();
  const [loading, setLoading] = useState(false);
  const [goal, setGoal] = useState<AimProgressModel[]>([]);
  const [refreshToken, setRefresh] = useState("");

  const goToAdd = () => {
    setActivePage(SelectedSubPage.AddGoals);
  };

  async function fetchGoal() {
    const token = getToken();
    const uid = decodeToken()?.UserId;
    if (token) {
      setLoading(true);
      const result = await getProgress(token);
      setGoal(result);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchGoal();
  }, [refreshToken]);

  const goToGive = () => {
    setActivePage(SelectedSubPage.List);
  };

  return (
    <div className={` w-full ${styles.page} h-full md:h-screen`}>
      <div className={`${styles.content} h-full p-4 md:my-12 md:p-14`}>
        <h3>Ваши цели</h3>
        {!goal && (
          <div className="flex gap-3">
            {goal && (
              <>
                <button
                  type="button"
                  onClick={goToAdd}
                  className="rounded-md bg-indigo-700 py-2 px-4 text-indigo-50 transition hover:bg-indigo-800"
                >
                  Добавить цель
                </button>
                <button
                  type="button"
                  onClick={goToGive}
                  className="rounded-md bg-transparent py-2 px-4  text-indigo-900 transition hover:bg-indigo-700 hover:text-indigo-50"
                >
                  Просмотреть все цели
                </button>
              </>
            )}
          </div>
        )}
        <div>
          <AddGoal setRefresh={setRefresh} />
          {goal && <GoalList goal={goal} setRefresh={setRefresh} />}
        </div>
      </div>
    </div>
  );
}

export default Goals;
