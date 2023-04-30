import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import HashLoader from "react-spinners/HashLoader";
import { useDispatch, useSelector } from "react-redux";
import BetterSaveLogo from "images/logos/BetterSaveLogo.svg";
import { Link, useNavigate } from "react-router-dom";
import mountain from "images/backgrounds/mountain-04.jpg";
import authApi from "@/api/auth/authApi";
import styles from "./login.module.scss";
import CoolLine from "../../../elements/coolLine/coolLine";
import FormikInput from "../../../elements/formikInput/formikInput";
import signInDto from "../../../types/auth/signInDto";
import colors from "../../../styles/colors";
import loginThunk from "../../../store/thunks/auth/authThunks";
import { AppDispatch, RootState } from "../../../store/store";
import { AuthState } from "../../../store/slices/authSlice";

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const authState = useSelector<RootState, AuthState>((state) => state.auth);

  const [error, setError] = useState<string | null>(null);

  const signInHandle = async (values: signInDto) => {
    setLoading(true);

    const result = await authApi.signIn(values);
    const json = await result.json();

    if (result.status !== 200) {
      setError(json.errorMessage);
    }

    dispatch(loginThunk({ body: values, setError }));
    setLoading(false);
  };

  useEffect(() => {
    if (authState.authStatus === "authenticated") {
      navigate("/");
    }
  }, [window.location.pathname, authState.authStatus]);

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
        const res = await signInHandle(values);

        // if (res && res.url) router.push(res.url);
        setSubmitting(false);
      }}
    >
      {(formik) => (
        <div className={`${styles.login_wrapper} flex w-full `}>
          <div className="h-vh flex w-4/12  items-center justify-center">
            <div className="w-full">
              <div className="m-auto flex w-8/12 flex-col gap-1  text-2xl font-bold text-indigo-600">
                <img src={BetterSaveLogo} alt="Logo" />
                <CoolLine />
              </div>

              <form
                action="/api/sign-up"
                className={`${styles.form} m-auto flex  w-8/12 flex-col rounded  pt-12 pb-8`}
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

                {error && <span className="text-sm text-red-600">{error}</span>}
                <button
                  type="submit"
                  className={` mt-6 rounded-md border border-purple-200 bg-indigo-50 py-2 font-semibold text-indigo-700 transition  duration-150 ease-in-out
                  hover:border-indigo-800 hover:bg-indigo-700 hover:text-indigo-50
                  `}
                >
                  {!loading ? (
                    "Войти"
                  ) : (
                    <div className="flex justify-center">
                      <HashLoader
                        loading={loading}
                        size={30}
                        color={colors["indigo-600"]}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    </div>
                  )}
                </button>

                <span className=" text-right text-xs text-indigo-800">
                  Или вы можете{" "}
                  <Link to="/register">
                    <span className="cursor-pointer text-indigo-600">зарегистрироваться</span>
                  </Link>{" "}
                  вместо этого
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

export default Login;
