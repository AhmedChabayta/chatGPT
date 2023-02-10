"use client";

import { Children } from "@ui/Types/General";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

interface IProps {
  children: Children;
  session: Session | null;
}

const ServerProvider = ({ children, session }: IProps) => (
  <SessionProvider session={session}>{children}</SessionProvider>
);
export default ServerProvider;
