import React from "react";
import moment from "moment";
import { Aim } from "./addGoal";

interface GoalListProps {
  goal: Aim;
}

const GoalList: React.FC<GoalListProps> = ({ goal }) => (
  <div>
    <h4>
      Task is:{" "}
      <span>
        save {goal.amount}{" "}
        {goal.aimType === 0
          ? "each day"
          : `untill ${moment(goal.finishDate).format("l")}`}
      </span>
    </h4>
    <h5>Your progress</h5>
  </div>
);

export default GoalList;
