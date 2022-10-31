import React from "react";
import Button from "../elements/Button";
import Content from "../elements/content/Content";
import ImageContainer from "../elements/ImageContainer";

const Profile = () => {
  const user = {
    profilePic:
      "https://img2.joyreactor.cc/pics/post/Disco-Elysium-%D0%98%D0%B3%D1%80%D1%8B-%D0%93%D0%B0%D1%80%D1%80%D1%8C%D0%B5-%D0%94%D1%8E%D0%B1%D1%83%D0%B0-%D1%85%D0%B0%D1%81%D0%B1%D0%B8%D0%BA-7654859.jpeg",
    firstName: "Yan",
    lastname: "Korzun",
    birthday: "11.12.2005",
  };
  return (
    <div className="w-full">
      <Content>
        <div className="flex w-full gap-3 pt-8">
          <div className=" border-r border-r-blueberry-800 pr-6">
            <ImageContainer
              width="w-96"
              height="h-96"
              src={user.profilePic}
              alt="Avatar"
            />
          </div>
          <div className="w-full">
            <div className="w-full">
              <div className="w-full border-b border-blueberry-800 pb-3">
                <span className=" text-2xl font-bold text-blueberry-800">{`${user.firstName} ${user.lastname}`}</span>
              </div>
              <div>
                <div className="flex gap-2 text-lg text-blueberry-800">
                  <span>Birthday date:</span>
                  <span className="font-bold">{user.birthday}</span>
                </div>
                <div className="flex w-64 flex-col gap-2">
                  <Button label="Change profile info" onClick={console.log} />
                  <Button label="Change password" onClick={console.log} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Content>
    </div>
  );
};

export default Profile;
