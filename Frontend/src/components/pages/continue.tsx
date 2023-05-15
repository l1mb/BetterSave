/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from "react-router-dom";
import Content from "../../elements/content/Content";

function Continue() {
  return (
    <Content>
      <div className="mx-auto my-36 max-w-2xl">
        <h1 className="text-4xl font-bold">Замечательно! Почти готово...</h1>
        <p className="my-5 mx-1 text-xl">Пожалуйста, проверьте свой email и подтвердите аккаунт</p>
        <Link to="/login">
          <span className="  rounded rounded-b-none border-b  py-2 px-2  pb-2 transition-all hover:bg-indigo-800 hover:text-indigo-100">
            Вернуться на страницу входа
          </span>
        </Link>
      </div>
    </Content>
  );
}

export default Continue;
