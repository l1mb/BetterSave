import React from "react";
import CoolLine from "../elements/coolLine/coolLine";

function Settings() {
  return (
    <div className="mx-auto my-28 flex max-w-2xl flex-col">
      <h1 className=" px-1 pb-3 text-4xl font-bold text-indigo-800">Settings</h1>
      <CoolLine />
      <span className="border-b border-indigo-800 px-2 py-2 text-lg">General</span>
      <div className="flex w-full flex-col">
        <div className="flex w-full items-center gap-3 border-b border-indigo-800 px-3 py-2">
          <span className="basis-1/4 text-lg">First name</span>
          <div className="basis-2/3">
            <input
              type="text"
              className="focus: flex min-w-[320px] rounded border-2 border-indigo-100 bg-indigo-100 py-2 px-3 font-bold outline-none transition hover:border-indigo-500 focus:border-indigo-800"
              placeholder="Add first name"
            />
          </div>
        </div>
        <div className="flex w-full items-center gap-3 border-b border-indigo-800 px-3 py-2">
          <span className="basis-1/4 text-lg">Last name</span>
          <div className="basis-2/3">
            <input
              type="text"
              className="focus: flex min-w-[320px] rounded border-2 border-indigo-100 bg-indigo-100 py-2 px-3 font-bold outline-none transition hover:border-indigo-500 focus:border-indigo-800"
              placeholder="Add last name"
            />
          </div>
        </div>
        <div className="flex w-full items-center gap-3 border-b border-indigo-800  px-3 py-2">
          <span className="basis-1/4 text-lg">Birthday date</span>
          <div className="basis-2/3">
            <input
              type="date"
              className="focus: flex min-w-[320px] rounded border-2 border-indigo-100 bg-indigo-100 py-2 px-3 font-bold outline-none transition hover:border-indigo-500 focus:border-indigo-800"
              placeholder="Add last name"
            />
          </div>
        </div>
        <div className="flex w-full items-center gap-3  px-3 py-2">
          <span className="basis-1/4 text-lg">Profile ID</span>
          <div className="basis-2/3">
            <span
              className="focus: flex min-w-[320px] rounded border-2 border-indigo-100 bg-indigo-100 py-2 px-3 text-base  outline-none transition hover:border-indigo-500 focus:border-indigo-800"
              placeholder="Add last name"
            >
              b16f1218-d326-4fb4-a51f-aecad0c7c648
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
