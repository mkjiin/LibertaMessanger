"use client";

import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { HiChevronLeft, HiEllipsisVertical } from "react-icons/hi2";
import Avatar from "@/app/components/Avatar";
import { ProfilerDrawler } from "./ProfilerDrawler";
import { AvatarGroup } from "@/app/components/AvatarGroup";
import { useActiveList } from "@/app/hooks/useActiveList";

interface Props {
    conversation: Conversation & {
        users: User[];
    };
}

const Header: React.FC<Props> = ({ conversation }) => {
    const otherUser = useOtherUser(conversation);
    const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);
    const { members } = useActiveList();
    const isActive = members.indexOf(otherUser?.email!) !== -1;

    const statusText = useMemo(() => {
        if (conversation.isGroup) {
            return `${conversation.users.length} members`;
        }

        return isActive ? "Online" : "Offline";
    }, [conversation, isActive]);

    return (
        <>
            <ProfilerDrawler
                data={conversation}
                isOpen={isDrawerOpen}
                onClose={() => setDrawerOpen(false)}
            />
            <div
                className="
       bg-neutral-600
        w-full
        flex
        border-l-[1px]
        border-neutral-800
        sm:px-4
        py-1.5
        px-1.5
        rounded-b-lg
        lg:px-4
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
                    {conversation.isGroup ? (
                        <AvatarGroup users={conversation.users} />
                    ) : (
                        <Avatar user={otherUser} />
                    )}
                    <div className="flex flex-col text-white">
                        <div>{conversation.name || otherUser.name}</div>
                        <div className="text-xs font-light text-yellow-500">
                            {statusText}
                        </div>
                    </div>
                </div>
                <HiEllipsisVertical
                    size={32}
                    onClick={() => setDrawerOpen(true)}
                    className="text-yellow-500 cursor-pointer hover:bg-opacity-75 transition"
                />
            </div>
        </>
    );
};

export { Header };
