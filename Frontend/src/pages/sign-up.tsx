import React from "react";
import Image from "next/image";
import styles from "../styles/sign-up.module.scss";
import img from "../../public/sign-up.jpg";
import InputElement from "../elements/inputElements/inputElement";
import "../styles/variables.module.scss";

const SignUp = () => (
  <div className="main">
    <div className={`${styles.formContainer} border border-gray-700`}>
      <div>
        <Image src={img} layout="fill" objectFit="cover" />
        <div className={styles.backdrop} />
      </div>
      <div>
        <form action="/api/sign-up" className=" flex w-auto flex-col p-8">
          <div className="grid gap-6 md:grid-cols-2">
            <InputElement
              placeholder="Yan"
              type="text"
              htmlFor="first_name"
              label="First name"
            />
            <InputElement
              required
              placeholder="Korzun"
              type="text"
              htmlFor="last_name"
              label="Last name"
            />
          </div>
          <InputElement
            required
            placeholder="Yan.Korzun@gmail.com"
            type="email"
            htmlFor="email"
            label="Email"
          />
          <InputElement
            required
            label="Phone number"
            type="text"
            htmlFor="phone"
            placeholder="+375 25 124 55 77"
          />
          <InputElement
            required
            placeholder="•••••••••"
            type="password"
            htmlFor="password"
            label="Password"
          />
          <InputElement
            required
            placeholder="•••••••••"
            type="password"
            htmlFor="confirm_password"
            label="Confirm password"
          />
          <button
            type="submit"
            className=" rounded-md border border-purple-200 py-2 font-semibold transition duration-150 ease-in-out hover:border-blue-700 hover:text-blue-700"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  </div>
);

export default SignUp;
