import Image from "next/image";
import Link from "next/link";
import { HashLoader } from "react-spinners";
import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import mountain from "../../public/backgrounds/mountain-04.jpg";
import styles from "../styles/login.module.scss";
import BetterSaveLogo from "../../public/logos/BetterSaveLogo.svg";
import CoolLine from "../elements/coolLine/coolLine";
import signUpDto from "../types/auth/signUpDto";
import FormikInput from "../elements/formikInput/formikInput";
import authApi from "./api/auth/authApi";
import colors from "../styles/colors";
import { StatusCodes } from "./api/codes";
import ErrorDto from "../types/auth/errorDto";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");
  const signUpHandle = async (values: signUpDto) => {
    setLoading(true);
    const result = await authApi.signUp(values);
    const body = await result.json();
    if (result.status !== StatusCodes.Created) {
      setError((body as ErrorDto).errorMessage);
    } else {
      router.push("/continue");
    }
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
        const res = await signUpHandle(values);

        // if (res && res.url) router.push(res.url);
        setSubmitting(false);
      }}
    >
      {(formik) => (
        <div className={`${styles.login_wrapper} flex w-full `}>
          <div className="h-vh  flex w-4/12 items-center justify-center">
            <div className="w-full min-w-[325px] ">
              <div className="m-auto flex w-8/12 flex-col gap-1  text-2xl font-bold text-violet-600">
                <Image src={BetterSaveLogo} alt="Logo" objectFit="fill" />
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
                {loading ? (
                  <div className="mt-6 flex justify-center py-2">
                    <HashLoader
                      loading={loading}
                      size={26}
                      color={colors["violet-600"]}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  </div>
                ) : (
                  <button
                    type="submit"
                    className={` mt-6 rounded-md border border-purple-200 py-2 font-semibold transition duration-150 ease-in-out hover:border-violet-700  hover:border-violet-800 hover:bg-violet-800 hover:text-violet-100
                  `}
                  >
                    Register
                  </button>
                )}

                <span className=" text-right text-xs text-violet-800">
                  Or you may want to{" "}
                  <Link href="/login">
                    <span className="cursor-pointer text-violet-600">
                      login
                    </span>
                  </Link>{" "}
                  instead
                </span>

                <span
                  className={`${
                    error
                      ? "max-h-min text-red-600 opacity-100"
                      : "max-h-0 opacity-0"
                  } absolute  bottom-0 mt-8 text-sm transition-all`}
                >
                  {error}
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

export default Register;
