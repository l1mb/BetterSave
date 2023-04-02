import Hint from "@/elements/hintMessage/hint";
import React from "react";

function Split() {
  return (
    <div className="mx-auto flex h-screen w-[566px] flex-col py-24 ">
      <h3 className="py-5 text-center">Кто кому должен?</h3>
      <div className="mx-auto w-1/2 text-center">
        <Hint message="Разбивка показывает, кто за что заплатил, и как соблюсти справедливость" />
      </div>
      <div className="mx-auto my-2 flex w-1/2 flex-row justify-evenly gap-4">
        <span>Сергей 🤴</span>
        <span>Лиза 👸</span>
      </div>
      <div className="my-4 mx-auto flex w-1/2 justify-center gap-3">
        <button
          className=" rounded
         bg-indigo-700 px-4 py-2  uppercase text-indigo-50"
          type="button"
        >
          Урегулировать долги
        </button>
        <button
          className="rounded border
         border-indigo-700 px-4 py-2  uppercase "
          type="button"
        >
          Добавить
        </button>
      </div>
    </div>
  );
}

export default Split;
