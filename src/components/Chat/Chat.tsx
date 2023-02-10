"use client";

import { ArrowDownCircleIcon } from "@heroicons/react/24/solid";
import db from "@ui/utils/firebase/firebase";
import { collection, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { RefObject, useEffect, useRef } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "../Message";

const Chat = ({ chatId }: { chatId: string }) => {
  const { data: session } = useSession();
  const [messages] = useCollection(
    session &&
      query(
        collection(
          db,
          "users",
          session?.user?.email!,
          "chats",
          chatId,
          "messages"
        ),
        orderBy("createdAt", "asc")
      )
  );
  const chatContainerRef: RefObject<HTMLDivElement> = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  return (
    <div
      ref={chatContainerRef}
      className="my-10 flex-1 overflow-x-hidden overflow-y-scroll"
    >
      {messages?.empty && (
        <>
          <p className="mt-10 text-center ">Type a prompt to get started</p>
          <ArrowDownCircleIcon className="mx-auto mt-5 w-10 animate-bounce" />
        </>
      )}
      {messages?.docs.map((message) => (
        <Message key={message.id} message={message.data()} />
      ))}
    </div>
  );
};
export default Chat;
