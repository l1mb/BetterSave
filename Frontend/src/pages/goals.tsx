import React, { useEffect, useState } from "react";
import AddGoal, { Aim } from "../components/goals/addGoal";
import GoalList from "../components/goals/goalList";
import useJwtToken from "../hooks/useJwtToken";
import styles from "../styles/loans.module.scss";
import { getUserAims } from "./api/aimApi";

enum SelectedSubPage {
  AddGoals,
  List,
}

const goals = () => {
  const [activePage, setActivePage] = useState(SelectedSubPage.AddGoals);
  const { decodeToken } = useJwtToken();
  const [loading, setLoading] = useState(false);
  const [goal, setGoal] = useState<Aim>();

  const goToAdd = () => {
    setActivePage(SelectedSubPage.AddGoals);
  };

  async function fetchGoal() {
    const uid = decodeToken()?.UserId;
    if (uid) {
      setLoading(true);
      const result = await getUserAims(uid);
      const dto = await result.json();
      setGoal(dto);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchGoal();
  }, []);

  const goToGive = () => {
    setActivePage(SelectedSubPage.List);
  };

  return (
    <div className={` w-full ${styles.page}`}>
      <div className={`${styles.pageContent}  my-12 h-full p-14 shadow-xl`}>
        <h3>Your goals</h3>
        {!goal && (
          <div className="flex gap-3">
            <button
              type="button"
              onClick={goToAdd}
              className="rounded-md bg-violet-700 py-2 px-4 text-violet-50 transition hover:bg-violet-800"
            >
              Add loan
            </button>
            <button
              type="button"
              onClick={goToGive}
              className="rounded-md bg-transparent py-2 px-4  text-violet-900 transition hover:bg-violet-700 hover:text-violet-50"
            >
              Watch all loans
            </button>
          </div>
        )}
        <div>
          {activePage === SelectedSubPage.AddGoals && !goal ? (
            <AddGoal />
          ) : (
            <GoalList goal={goal} />
          )}
        </div>
      </div>
    </div>
  );
};

export default goals;
