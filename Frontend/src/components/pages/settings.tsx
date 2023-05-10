import CoolLine from "@/elements/coolLine/coolLine";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfileThunk } from "@/store/thunks/user/userThunks";
import { UpdateUserProfileRequest } from "@/types/models";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../store/store";

function Settings() {
  const dispatch: AppDispatch = useDispatch();

  const [error, setError] = useState("");
  const userInfo = useSelector<RootState, UpdateUserProfileRequest>((state) => state.auth.user);

  const navigate = useNavigate();

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
    await dispatch(
      updateUserProfileThunk({
        setError,
        value: userChoices,
      })
    );
    // dispatch(getCardsThunk({ setError }));
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="mx-auto flex max-w-[36rem] flex-col p-5 md:my-28 md:h-screen">
      <h1 className=" px-1 pb-3 text-4xl font-bold text-indigo-800">Настройки</h1>
      <CoolLine />
      <span className="border-b border-indigo-800 px-2 py-2 text-lg">Общие</span>
      <div className="flex w-full flex-col">
        <div className="flex w-full flex-col items-start justify-between gap-1 border-b border-indigo-800 px-3 py-2 md:flex-row md:items-center md:gap-3">
          <span className="basis-1/4 text-sm text-indigo-500 md:text-lg">Имя</span>
          <div className="flex w-full basis-full md:basis-2/3 md:justify-end">
            <input
              type="text"
              className="focus: flex w-full rounded border-2 border-indigo-100 bg-indigo-100 py-2 px-3 font-bold outline-none transition hover:border-indigo-500 focus:border-indigo-800 md:w-auto
              md:min-w-[320px]"
              placeholder="Укажите имя"
              value={userChoices.firstName}
              onChange={(e) => handleUpdateFirstName(e.currentTarget.value)}
            />
          </div>
        </div>
        <div className="flex w-full flex-col items-start justify-between gap-1 border-b border-indigo-800 px-3 py-2 md:flex-row md:items-center md:gap-3">
          <span className="basis-1/4 text-sm text-indigo-500 md:text-lg">Фамилия</span>
          <div className="flex w-full basis-full md:basis-2/3 md:justify-end">
            <input
              type="text"
              className="focus: flex min-w-[320px] rounded border-2 border-indigo-100 bg-indigo-100 py-2 px-3 font-bold outline-none transition hover:border-indigo-500 focus:border-indigo-800"
              placeholder="Укажите фамилию"
              value={userChoices.lastName}
              onChange={(e) => handleUpdateLastName(e.currentTarget.value)}
            />
          </div>
        </div>
        <div className="flex w-full flex-col items-start justify-between gap-1 border-b border-indigo-800 px-3 py-2 md:flex-row md:items-center md:gap-3 ">
          <span className="basis-1/4 text-sm text-indigo-500 md:text-lg">Дата рождения</span>
          <div className="flex w-full basis-full md:basis-2/3 md:justify-end">
            <input
              type="date"
              className="focus: flex min-w-[320px] rounded border-2 border-indigo-100 bg-indigo-100 py-2 px-3 font-bold outline-none transition hover:border-indigo-500 focus:border-indigo-800"
              placeholder="Укажите дату рождения"
              value={userChoices.birthday?.toString()}
              onChange={(e) => handleUpdateBirthday(e.currentTarget.value)}
            />
          </div>
        </div>
        <div className="flex w-full flex-col items-start justify-between gap-1 border-b border-indigo-800 px-3 py-2 md:flex-row md:items-center md:gap-3">
          <span className="basis-1/4 text-sm text-indigo-500 md:text-lg">Email</span>
          <div className="flex w-full basis-full md:basis-2/3 md:justify-end">
            <input
              type="email"
              className="focus: flex min-w-[320px] rounded border-2 border-indigo-100 bg-indigo-100 py-2 px-3 font-bold outline-none transition hover:border-indigo-500 focus:border-indigo-800"
              value={userChoices.email}
              placeholder="Укажите адрес электронной почты"
              onChange={(e) => handleUpdateEmail(e.currentTarget.value)}
            />
          </div>
        </div>
        <div className="flex w-full flex-col items-start justify-between gap-1 border-b border-indigo-800 px-3 py-2 md:flex-row md:items-center md:gap-3">
          <span className="basis-1/4 text-sm text-indigo-500 md:text-lg">ID профиля</span>
          <div className="flex w-full basis-full md:basis-2/3 md:justify-end">
            <span
              className="focus: flex  rounded border-2 border-indigo-100 py-2 px-3 text-base outline-none  transition md:w-[320px] "
              placeholder="Укажите ID профиля"
            >
              b16f1218-d326-4fb4-a51f-aecad0c7c648
            </span>
          </div>
        </div>
      </div>
      <div className="my-12 flex  flex-col justify-between gap-5 md:flex-row">
        <button
          type="button"
          className=" w-full rounded bg-indigo-600 px-4 py-3 text-indigo-50 transition hover:bg-indigo-800 md:w-1/2"
          onClick={() => handleFinishEdit()}
        >
          Сохранить
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className=" w-full rounded bg-indigo-50 px-4 py-3 text-indigo-700 transition hover:bg-indigo-800 md:w-1/2"
        >
          Отменить
        </button>
      </div>
    </div>
  );
}

export default Settings;
