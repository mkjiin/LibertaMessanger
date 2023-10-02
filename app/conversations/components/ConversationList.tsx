"use client";

import { FullConverationType } from "@/app/types";
import { Conversation } from "@prisma/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useConversation from "@/app/hooks/useConversation";
import clsx from "clsx";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from "./ConversationBox";

interface ConversationListProps {
    initialItems: FullConverationType[];
}

const ConversationList: React.FC<ConversationListProps> = ({
    initialItems,
}) => {
    const [items, setItems] = useState(initialItems);

    const router = useRouter();

    const { conversationId, isOpen } = useConversation();

    return (
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
                    <div className="rounded-full p-2 bg-yellow-500 text-neutral-100 hover:opacity-75 transition">
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
    );
};

export default ConversationList;
