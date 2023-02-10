import { Chat, ChatInput } from "@ui/components";

type Props = {
  params: {
    id: string;
  };
};

const ChatPage = ({ params: { id } }: Props) => (
  <div className="flex h-screen flex-col overflow-hidden">
    <Chat chatId={id} />
    <ChatInput chatId={id} />
  </div>
);
export default ChatPage;
