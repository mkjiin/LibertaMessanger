import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";
import EmptyState from "@/app/components/EmptyState";
import { Header } from "./components/Header";
import { Body } from "./components/Body";
import { MessageForm } from "./components/MessageForm";
import { FullMessageType } from "@/app/types";

type Props = {
    params: {
        conversationId: string;
    };
};

const ConversationId = async ({ params: { conversationId } }: Props) => {
    const conversation = await getConversationById(conversationId);
    const messages = (await getMessages(conversationId)) as FullMessageType[];

    if (!conversation) {
        return (
            <div className="lg:pl-80 h-full">
                <div className="h-full flex flex-col">
                    <EmptyState />
                </div>
            </div>
        );
    }

    return (
        <div className="lg:pl-80 h-full">
            <div className="h-full flex flex-col bg-neutral-800">
                <Header conversation={conversation} />
                <Body initialMessages={messages} />
                <MessageForm />
            </div>
        </div>
    );
};

export default ConversationId;
