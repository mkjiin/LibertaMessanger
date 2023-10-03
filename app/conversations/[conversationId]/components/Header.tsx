"use client";

import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import { useMemo } from "react";
import Link from "next/link";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";
import Avatar from "@/app/components/Avatar";

interface Props {
    conversation: Conversation & {
        users: User[];
    };
}

const Header: React.FC<Props> = ({ conversation }) => {
    const otherUser = useOtherUser(conversation);

    const statusText = useMemo(() => {
        if (conversation.isGroup) {
            return `${conversation.users.length} members`;
        }

        return `Online`;
    }, [conversation]);

    return (
        <div
            className="
       bg-neutral-600
        w-full
        flex
        border-l-[1px]
        border-neutral-800
        rounded-b-lg
        sm:px-4
        py-3
        px-3
        lg:px-
        justify-between
        items-center
        shadow:sm
    "
        >
            <div className="flex gap-3 items-center">
                <Link
                    href="/conversations"
                    className="lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer"
                >
                    <HiChevronLeft size={32} />
                </Link>
                <Avatar user={otherUser} />
                <div className="flex flex-col text-white">
                    <div>{conversation.name || otherUser.name}</div>
                    <div className="text-xs font-light text-yellow-500">
                        {statusText}
                    </div>
                </div>
            </div>
            <HiEllipsisHorizontal
                size={32}
                onClick={() => {}}
                className="text-yellow-500 cursor-pointer hover:bg-opacity-75 transition"
            />
        </div>
    );
};

export { Header };
