import CoolLine from "@/elements/coolLine/coolLine";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfileThunk } from "@/store/thunks/user/userThunks";
import { UpdateUserProfileRequest } from "@/types/models";
import { AppDispatch, RootState } from "../../store/store";

function Settings() {
  const dispatch: AppDispatch = useDispatch();

  const [error, setError] = useState("");
  const userInfo = useSelector<RootState, UpdateUserProfileRequest>((state) => state.auth.user);

  const [userChoices, setUserChoices] = useState({
    email: userInfo.email || "",
    firstName: userInfo.firstName || "",
    lastName: userInfo.lastName || "",
    birthday: userInfo.birthday || null,
  });

  useEffect(() => {
    setUserChoices({
      email: userInfo.email || null,
      firstName: userInfo.firstName || "",
      lastName: userInfo.lastName || "",
      birthday: userInfo.birthday || null,
    });
    console.log(userChoices);
  }, [userInfo]);

  const handleUpdateFirstName = (e: string) => {
    setUserChoices({ ...userChoices, firstName: e });
  };

  const handleUpdateLastName = (e: string) => {
    setUserChoices({ ...userChoices, lastName: e });
  };

  const handleUpdateEmail = (e: string) => {
    setUserChoices({ ...userChoices, email: e });
  };

  const handleUpdateBirthday = (e: Date) => {
    setUserChoices({ ...userChoices, birthday: e });
  };

  const handleFinishEdit = async () => {
    console.log(userChoices);
    await dispatch(
      updateUserProfileThunk({
        setError,
        value: userChoices,
      })
    );
    // dispatch(getCardsThunk({ setError }));
  };

  return (
    <div className="mx-auto my-28 flex max-w-2xl flex-col">
      <h1 className=" px-1 pb-3 text-4xl font-bold text-indigo-800">Настройки</h1>
      <CoolLine />
      <span className="border-b border-indigo-800 px-2 py-2 text-lg">Общие</span>
      <div className="flex w-full flex-col">
        <div className="flex w-full items-center gap-3 border-b border-indigo-800 px-3 py-2">
          <span className="basis-1/4 text-lg">Имя</span>
          <div className="basis-2/3">
            <input
              type="text"
              className="focus: flex min-w-[320px] rounded border-2 border-indigo-100 bg-indigo-100 py-2 px-3 font-bold outline-none transition hover:border-indigo-500 focus:border-indigo-800"
              placeholder="Укажите имя"
              value={userChoices.firstName}
              onChange={(e) => handleUpdateFirstName(e.currentTarget.value)}
            />
          </div>
        </div>
        <div className="flex w-full items-center gap-3 border-b border-indigo-800 px-3 py-2">
          <span className="basis-1/4 text-lg">Фамилия</span>
          <div className="basis-2/3">
            <input
              type="text"
              className="focus: flex min-w-[320px] rounded border-2 border-indigo-100 bg-indigo-100 py-2 px-3 font-bold outline-none transition hover:border-indigo-500 focus:border-indigo-800"
              placeholder="Укажите фамилию"
              value={userChoices.lastName}
              onChange={(e) => handleUpdateLastName(e.currentTarget.value)}
            />
          </div>
        </div>
        <div className="flex w-full items-center gap-3 border-b border-indigo-800  px-3 py-2">
          <span className="basis-1/4 text-lg">Дата рождения</span>
          <div className="basis-2/3">
            <input
              type="date"
              className="focus: flex min-w-[320px] rounded border-2 border-indigo-100 bg-indigo-100 py-2 px-3 font-bold outline-none transition hover:border-indigo-500 focus:border-indigo-800"
              placeholder="Укажите дату рождения"
              value={userChoices.birthday?.toString()}
              onChange={(e) => handleUpdateBirthday(e.currentTarget.value)}
            />
          </div>
        </div>
        <div className="flex w-full items-center gap-3 border-b border-indigo-800  px-3 py-2">
          <span className="basis-1/4 text-lg">Email</span>
          <div className="basis-2/3">
            <input
              type="email"
              className="focus: flex min-w-[320px] rounded border-2 border-indigo-100 bg-indigo-100 py-2 px-3 font-bold outline-none transition hover:border-indigo-500 focus:border-indigo-800"
              value={userChoices.email}
              placeholder="Укажите адрес электронной почты"
              onChange={(e) => handleUpdateEmail(e.currentTarget.value)}
            />
          </div>
        </div>
        <div className="flex w-full items-center gap-3  px-3 py-2">
          <span className="basis-1/4 text-lg">ID профиля</span>
          <div className="basis-2/3">
            <span
              className="focus: flex min-w-[320px] rounded border-2 border-indigo-100 bg-indigo-100 py-2 px-3 text-base  outline-none transition hover:border-indigo-500 focus:border-indigo-800"
              placeholder="Укажите ID профиля"
            >
              b16f1218-d326-4fb4-a51f-aecad0c7c648
            </span>
          </div>
        </div>
      </div>
      <div className="my-12 flex flex-row justify-between gap-5">
        <button
          type="button"
          className=" w-1/2 rounded bg-indigo-600 px-4 py-3 text-indigo-50 transition hover:bg-indigo-800"
          onClick={() => handleFinishEdit()}
        >
          Сохранить
        </button>
        <button
          type="button"
          className=" w-1/2 rounded bg-indigo-600 px-4 py-3 text-indigo-50 transition hover:bg-indigo-800"
        >
          Отменить
        </button>
      </div>
    </div>
  );
}

export default Settings;
