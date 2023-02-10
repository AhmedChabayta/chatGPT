import { DocumentData } from "firebase/firestore";
import Image from "next/image";

interface IProps {
  message: DocumentData;
}

const Message = ({ message }: IProps) => {
  const isChatGPT = message?.user?.name === "ChatGPT";
  const date = message.createdAt.toDate().toLocaleString();
  const dateString = date.toLocaleString();

  return (
    <div
      className={`flex flex-col items-center justify-between py-5 pr-10 lg:flex-row ${
        isChatGPT ? "bg-gray-800" : ""
      }`}
    >
      <div className="flex max-w-2xl space-x-5 px-10">
        <Image
          className="rounded object-contain"
          width={50}
          height={50}
          src={message?.user?.avatar}
          alt=""
        />
        <p className="pt-1 text-base">{message.text}</p>
      </div>
      <p className="text-[8px] lg:hover:scale-150">{dateString}</p>
    </div>
  );
};
export default Message;
