import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Formik } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";
import HashLoader from "react-spinners/HashLoader";
import mountain from "../../public/backgrounds/mountain-04.jpg";
import styles from "../styles/login.module.scss";
import BetterSaveLogo from "../../public/logos/BetterSaveLogo.svg";
import CoolLine from "../elements/coolLine/coolLine";
import FormikInput from "../elements/formikInput/formikInput";
import signInDto from "../types/auth/signInDto";
import authApi from "./api/auth/authApi";
import colors from "../styles/colors";

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(
    "Please, enter your credentials"
  );

  const signInHandle = async (values: signInDto) => {
    setLoading(true);
    const result = await authApi.signIn(values);
    const token = await result.json();
    console.log();
    setLoading(false);
  };

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
          <div className="h-vh flex w-4/12  items-baseline justify-center">
            <div className="w-full">
              <div className="m-auto flex w-8/12 flex-col gap-1  text-2xl font-bold text-blueberry-600">
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

                <button
                  type="submit"
                  className={` border-purple-200 hover:border-blue-700 mt-6 rounded-md border py-2 font-semibold transition duration-150 ease-in-out  hover:border-blueberry-800 hover:bg-blueberry-200 hover:text-blueberry-100
                  `}
                >
                  {!loading ? (
                    "Login"
                  ) : (
                    <div className="flex justify-center">
                      <HashLoader
                        loading={loading}
                        size={30}
                        color={colors["blueberry-600"]}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    </div>
                  )}
                </button>

                <span className=" text-right text-xs text-blueberry-800">
                  Or you may want to{" "}
                  <Link href="/register">
                    <span className="cursor-pointer text-blueberry-600">
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
