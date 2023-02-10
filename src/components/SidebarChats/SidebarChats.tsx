"use client";

import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/solid";
import db from "@ui/utils/firebase/firebase";

import { collection, deleteDoc, doc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

const SidebarChats = ({ id }: { id: string }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [active, setActive] = useState<boolean>(false);

  const [messages] = useCollection(
    collection(db, "users", session?.user?.email!, "chats", id, "messages")
  );

  useEffect(() => {
    if (!pathname) return;
    setActive(pathname.includes(id));
  }, [id, pathname]);

  const removeChat = async () => {
    await deleteDoc(doc(db, "users", session?.user?.email!, "chats", id));
    router.replace("/");
  };

  return (
    <Link
      className={`relative mx-auto flex w-[95%] items-center justify-start space-x-2 rounded py-3 px-4 ${
        active ? "bg-gray-500" : ""
      }`}
      href={`/chat/${id}`}
    >
      <ChatBubbleLeftIcon className="w-5 hover:text-gray-900" />
      <p className="relative hidden max-w-[100px] truncate duration-100 ease-linear before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 before:bg-gray-900 before:transition-all hover:before:w-full md:inline-flex">
        {/* eslint-disable-next-line no-unsafe-optional-chaining */}
        {messages?.docs[messages?.docs.length - 1]?.data().text || "Chat"}
      </p>
      <TrashIcon
        onClick={removeChat}
        className="absolute right-4 w-5 cursor-pointer hover:text-gray-900"
      />
    </Link>
  );
};
export default SidebarChats;
