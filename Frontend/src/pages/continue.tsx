/* eslint-disable jsx-a11y/anchor-is-valid */
import { NextPage } from "next";
import Link from "next/link";
import React from "react";
import Content from "../elements/content/Content";

const Continue: NextPage = () => (
  <Content>
    <div className="mx-auto my-36 max-w-2xl">
      <h1 className="text-4xl font-bold">Great! You are almost in!</h1>
      <p className="my-5 mx-1 text-xl">
        Please, visit your mailbox and confirm your account
      </p>
      <Link href="/login">
        <a className="  rounded rounded-b-none border-b  py-2 px-2  pb-2 transition-all hover:bg-violet-800 hover:text-violet-100">
          Go to login
        </a>
      </Link>
    </div>
  </Content>
);

export default Continue;
