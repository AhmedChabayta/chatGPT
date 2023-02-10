import { PlusIcon } from "@heroicons/react/24/solid";
import { SidebarConstants } from "@ui/constants";
import db from "@ui/utils/firebase/firebase";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "../Button";

const NewChat = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const addNewChat = async () => {
    const doc = await addDoc(
      collection(db, "users", session?.user?.email!, "chats"),
      {
        userId: session?.user?.email!,
        createdAt: serverTimestamp(),
      }
    );
    router.push(`/chat/${doc.id}`);
  };
  return (
    <Button
      onClick={addNewChat}
      type="button"
      className="m-2 flex items-center space-x-4 rounded-lg border border-gray-600 p-4 hover:bg-gray-600 active:scale-[0.95]"
    >
      <PlusIcon className="w-5 text-white" />
      <p className="whitespace-nowrap">{SidebarConstants.new_chat}</p>
    </Button>
  );
};
export default NewChat;
