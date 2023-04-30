import { HashLoader } from "react-spinners";
import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import mountain from "images/backgrounds/mountain-04.jpg";
import BetterSaveLogo from "images/logos/BetterSaveLogo.svg";
import { Link, useNavigate } from "react-router-dom";
import CoolLine from "@/elements/coolLine/coolLine";
import FormikInput from "@/elements/formikInput/formikInput";
import ErrorDto from "@/types/auth/errorDto";
import signUpDto from "@/types/auth/signUpDto";
import authApi from "@/api/auth/authApi";
import { StatusCodes } from "@/api/codes";
import colors from "../../../styles/colors";
import styles from "../login/login.module.scss";

function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const signUpHandle = async (values: signUpDto) => {
    setLoading(true);
    const result = await authApi.signUp(values);
    const body = await result.json();
    if (result.status !== StatusCodes.Created) {
      setError((body as ErrorDto).errorMessage);
    } else {
      navigate("/continue");
    }
    setLoading(false);
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={Yup.object({
        email: Yup.string()
          .max(30, "Максимум 30 символов")
          .email("Неверный email адрес")
          .required("Пожалуйста, введите email"),
        password: Yup.string().required("Пожалуйста, введите пароль"),
      })}
      onSubmit={async (values, { setSubmitting, validateForm }) => {
        setSubmitting(true);
        validateForm();
        const res = await signUpHandle(values);

        // if (res && res.url) router.push(res.url);
        setSubmitting(false);
      }}
    >
      {(formik) => (
        <div className={`${styles.login_wrapper} flex w-full `}>
          <div className="h-vh  flex w-4/12 items-center justify-center">
            <div className="w-full min-w-[325px] ">
              <div className="m-auto flex w-8/12 flex-col gap-1  text-2xl font-bold text-indigo-600">
                <img src={BetterSaveLogo} alt="Logo" />
                <CoolLine />
              </div>

              <form
                action="/api/sign-up"
                className={`${styles.form} relative m-auto  flex w-8/12 flex-col  rounded pt-12 pb-8`}
                onSubmit={formik.handleSubmit}
              >
                <div className="flex flex-col gap-2">
                  <FormikInput
                    htmlFor="email"
                    label="Email"
                    ariaLabel="введите свой адрес электронной почты"
                    ariaRequired
                    type="email"
                    error={formik.errors.email}
                  />
                  <FormikInput
                    htmlFor="password"
                    label="Пароль"
                    ariaLabel="введите свой пароль"
                    ariaRequired
                    type="password"
                    error={formik.errors.password}
                  />
                </div>
                {loading ? (
                  <div className="mt-6 flex justify-center py-2">
                    <HashLoader
                      loading={loading}
                      size={26}
                      color={colors["indigo-600"]}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  </div>
                ) : (
                  <button
                    type="submit"
                    className={` mt-6 rounded-md border border-purple-200 py-2 font-semibold transition duration-150 ease-in-out hover:border-indigo-700  hover:border-indigo-800 hover:bg-indigo-800 hover:text-indigo-100
                  `}
                  >
                    Зарегистрироваться
                  </button>
                )}

                <span className=" text-right text-xs text-indigo-800">
                  Или вы можете{" "}
                  <Link to="/login">
                    <span className="cursor-pointer text-indigo-600">войти в аккаунт</span>
                  </Link>{" "}
                  вместо этого
                </span>

                <span
                  className={`${
                    error ? "max-h-min text-red-600 opacity-100" : "max-h-0 opacity-0"
                  } absolute  bottom-0 mt-8 text-sm transition-all`}
                >
                  {error}
                </span>
              </form>
            </div>
          </div>
          <div className="h-vh relative w-8/12">
            <img src={mountain} alt="Mountain background" className="h-full w-full object-cover" />
          </div>
        </div>
      )}
    </Formik>
  );
}

export default Register;
