"use client";

import { FullConverationType } from "@/app/types";
import { Conversation, User } from "@prisma/client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import useConversation from "@/app/hooks/useConversation";
import clsx from "clsx";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from "./ConversationBox";
import { GroupChatModal } from "./GroupChatModal";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";

interface ConversationListProps {
    initialItems: FullConverationType[];
    users: User[];
}

const ConversationList: React.FC<ConversationListProps> = ({
    initialItems,
    users,
}) => {
    const session = useSession();
    const [items, setItems] = useState(initialItems);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const router = useRouter();

    const { conversationId, isOpen } = useConversation();

    const pusherKey = useMemo(() => {
        return session.data?.user?.email;
    }, [session.data?.user?.email]);

    useEffect(() => {
        if (!pusherKey) {
            return;
        }

        pusherClient.subscribe(pusherKey);

        const newHandler = (conversation: FullConverationType) => {
            setItems((currentConversations) => {
                if (find(currentConversations, { id: conversation.id })) {
                    return currentConversations;
                }

                return [conversation, ...currentConversations];
            });
        };

        const updateHadler = (conversation: FullConverationType) => {
            setItems((currentConversations) =>
                currentConversations.map((currentConversation) => {
                    if (currentConversation.id === conversation.id) {
                        return {
                            ...currentConversation,
                            messages: conversation.messages,
                        };
                    }

                    return currentConversation;
                })
            );
        };

        const removeHandler = (conversation: FullConverationType) => {
            setItems((current) => {
                return [
                    ...current.filter((conv) => conv.id !== conversation.id),
                ];
            });

            if (conversation.id === conversationId) {
                router.push("/conversations");
            }
        };

        pusherClient.bind("conversation:new", newHandler);
        pusherClient.bind("conversation:update", updateHadler);
        pusherClient.bind("conversation:remove", removeHandler);

        return () => {
            pusherClient.unsubscribe(pusherKey);
            pusherClient.unbind("conversation:new", newHandler);
            pusherClient.unbind("conversation:update", updateHadler);
            pusherClient.unbind("conversation:remove", removeHandler);
        };
    }, [pusherKey, conversationId, router]);

    return (
        <>
            <GroupChatModal
                users={users}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
            <aside
                className={clsx(
                    `
            fixed
            inset-y-0
            pb-20
            lg:pb-20
            lg:left-20
            lg:w-80
            lg:block
            overflow-y-auto

        `,
                    isOpen ? "hidden" : "block w-full left-0"
                )}
            >
                <div className="px-3">
                    <div className="flex justify-between mb-4 pt-4">
                        <div className="text-2xl font-bold text-neutral-100">
                            Messages
                        </div>
                        <div
                            className="rounded-full p-2 bg-yellow-500 text-neutral-100 hover:opacity-75 transition"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <MdOutlineGroupAdd size={20} />
                        </div>
                    </div>
                </div>
                {items.map((el) => (
                    <ConversationBox
                        key={el.id}
                        data={el}
                        selected={conversationId === el.id}
                    />
                ))}
            </aside>
        </>
    );
};

export default ConversationList;
