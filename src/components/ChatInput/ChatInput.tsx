"use client";

import React, { useRef, FormEvent } from "react";
import useSWR from "swr";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { Message } from "@ui/typings";
import db from "@ui/utils/firebase/firebase";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import Button from "../Button";

const ChatInput = ({ chatId }: { chatId: string }) => {
  const promptRef = useRef<HTMLInputElement>(null);
  const { data: session } = useSession();

  // useSWR for model
  const { data: model } = useSWR("model", {
    fallbackData: "text-davinci-003",
  });

  const sendPrompt = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!promptRef.current?.value) return;

    const input = promptRef.current.value.trim();
    promptRef.current.value = "";
    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email,
        name: session?.user?.name,
        avatar:
          session?.user?.image ||
          `https://ui-avatars.com/api/?name=${session?.user?.image}`,
      },
    };
    await addDoc(
      collection(
        db,
        "users",
        session?.user?.email!,
        "chats",
        chatId,
        "messages"
      ),
      message
    );
    const notification = toast.loading("ChatGPT is thinking...");
    await fetch(`http://localhost:3000/api/askQuestion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input,
        chatId,
        model,
        session,
      }),
    }).then(() => {
      toast.success("ChatGPT has responded", {
        id: notification,
      });
    });
  };

  return (
    <div className="mx-auto mb-[1.5%] w-[90%] rounded-lg bg-gray-600/50 p-4 text-sm">
      <form onSubmit={sendPrompt} className="flex space-x-5 p-3" action="">
        <input
          ref={promptRef}
          className="flex-1 bg-transparent px-4 py-2 text-lg outline-none focus:outline-none disabled:cursor-not-allowed disabled:text-gray-500"
          type="text"
          placeholder="Type your message here..."
        />

        <Button
          className="rounded bg-gray-900 px-4 py-2 hover:bg-gray-900/50 disabled:cursor-not-allowed disabled:text-gray-500"
          disabled={!prompt}
          type="submit"
        >
          <PaperAirplaneIcon className="w-5 -rotate-45" />
        </Button>
      </form>
    </div>
  );
};
export default ChatInput;
