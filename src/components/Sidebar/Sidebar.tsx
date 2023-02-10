/* eslint-disable @next/next/no-img-element */

"use client";

import { SidebarConstants } from "@ui/constants";
import { useCollection } from "react-firebase-hooks/firestore";
import { signOut, useSession } from "next-auth/react";
import { collection, orderBy, query } from "firebase/firestore";

import db from "@ui/utils/firebase/firebase";
import Button from "../Button";
import NewChat from "../NewChat";
import SidebarChats from "../SidebarChats";

const Sidebar = () => {
  const { data: session } = useSession();
  // eslint-disable-next-line no-unused-vars
  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session?.user?.email!, "chats"),
        orderBy("createdAt", "asc")
      )
  );
  return (
    <div className="relative hidden h-screen min-w-[18vw] max-w-xs flex-col overflow-y-scroll bg-gray-700 lg:flex">
      <NewChat />

      <div className="my-2 flex flex-col space-y-2">
        {loading && (
          <div className="animate-pulse text-center">
            <p>Loading Chats...</p>
          </div>
        )}

        {chats?.docs?.map((chat) => (
          <SidebarChats key={chat.id} id={chat.id} />
        ))}
      </div>
      {session && (
        <div className="absolute bottom-5 left-1/2 my-4 flex translate-x-[-50%] items-center justify-center space-x-4">
          <Button
            type="button"
            aria-roledescription="sign out image"
            onClick={() => signOut()}
          >
            <img
              className="rounded-md hover:brightness-75"
              height={50}
              width={50}
              src={session.user?.image!}
              alt="user"
            />
          </Button>
          <div className=" flex flex-col text-start text-sm">
            <p>{session.user?.name}</p>
            <p>{session.user?.email}</p>
            <Button
              type="button"
              style={{ textAlign: "inherit" }}
              onClick={() => signOut()}
            >
              <p aria-roledescription="sign out text">
                {SidebarConstants.sign_out}
              </p>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Sidebar;
