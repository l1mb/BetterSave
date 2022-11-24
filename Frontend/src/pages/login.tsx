import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";
import HashLoader from "react-spinners/HashLoader";
import { useDispatch, useSelector } from "react-redux";
import mountain from "../../public/backgrounds/mountain-04.jpg";
import styles from "../styles/login.module.scss";
import BetterSaveLogo from "../../public/logos/BetterSaveLogo.svg";
import CoolLine from "../elements/coolLine/coolLine";
import FormikInput from "../elements/formikInput/formikInput";
import signInDto from "../types/auth/signInDto";
import colors from "../styles/colors";
import loginThunk from "../store/thunks/auth/authThunks";
import { AppDispatch, RootState } from "../store/store";
import { AuthState } from "../store/slices/authSlice";
import authApi from "./api/auth/authApi";

const Login = () => {
  const router = useRouter();
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
      router.push("/");
    }
  }, [router.pathname, authState.authStatus]);

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={Yup.object({
        email: Yup.string()
          .max(30, "Must be 30 characters or less")
          .email("Invalid email address")
          .required("Please enter your email"),
        password: Yup.string().required("Please enter your password"),
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
              <div className="m-auto flex w-8/12 flex-col gap-1  text-2xl font-bold text-violet-600">
                <Image src={BetterSaveLogo} alt="Logo" objectFit="fill" />
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
                    ariaLabel="Enter your email"
                    ariaRequired
                    type="email"
                    error={formik.errors.email}
                  />
                  <FormikInput
                    htmlFor="password"
                    label="Password"
                    ariaLabel="Enter your password"
                    ariaRequired
                    type="password"
                    error={formik.errors.password}
                  />
                </div>

                {error && <span className="text-sm text-red-600">{error}</span>}
                <button
                  type="submit"
                  className={` mt-6 rounded-md border border-purple-200 bg-violet-50 py-2 font-semibold text-violet-700 transition  duration-150 ease-in-out
                  hover:border-violet-800 hover:bg-violet-700 hover:text-violet-50
                  `}
                >
                  {!loading ? (
                    "Login"
                  ) : (
                    <div className="flex justify-center">
                      <HashLoader
                        loading={loading}
                        size={30}
                        color={colors["violet-600"]}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    </div>
                  )}
                </button>

                <span className=" text-right text-xs text-violet-800">
                  Or you may want to{" "}
                  <Link href="/register">
                    <span className="cursor-pointer text-violet-600">
                      register
                    </span>
                  </Link>{" "}
                  instead
                </span>
              </form>
            </div>
          </div>
          <div className="h-vh relative w-8/12">
            <Image
              src={mountain}
              alt="Mountain background"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      )}
    </Formik>
  );
};

export default Login;
