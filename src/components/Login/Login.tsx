"use client";

import { ChatGptLogo } from "@ui/assets/icons";
import { LoginConstants } from "@ui/constants";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Button from "../Button";

const Login = () => (
  <div className="flex h-screen flex-col items-center justify-center bg-[#10a37f]">
    <Image height={300} width={300} src={ChatGptLogo} alt="logo" />
    <Button
      type="button"
      onClick={() => signIn("google")}
      className="animate-pulse text-3xl font-bold text-white"
    >
      {LoginConstants.login}
    </Button>
  </div>
);
export default Login;
