"use client";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Conversation, Message, User } from "@prisma/client";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import { FullConverationType } from "@/app/types";
import useOtherUser from "@/app/hooks/useOtherUser";
import Avatar from "@/app/components/Avatar";
import { AvatarGroup } from "@/app/components/AvatarGroup";

interface ConversationBoxProps {
    data: FullConverationType;
    selected?: boolean;
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
    data,
    selected,
}) => {
    const otherUser = useOtherUser(data);
    const session = useSession();
    const router = useRouter();

    const handleClick = useCallback(() => {
        router.push(`/conversations/${data.id}`);
    }, [data.id, router]);

    const lastMessage = useMemo(() => {
        const messages = data.messages || [];

        return messages[messages.length - 1];
    }, [data.messages]);

    const sessionUserEmail = useMemo(() => {
        return session?.data?.user?.email;
    }, [session?.data?.user?.email]);

    const hasSeen = useMemo(() => {
        if (!lastMessage) {
            return false;
        }
        if (!sessionUserEmail) {
            return false;
        }
        const seenArray = lastMessage.seen || [];

        return (
            seenArray.filter((user) => user.email === sessionUserEmail)
                .length !== 0
        );
    }, [sessionUserEmail, lastMessage]);

    const lastMessageText = useMemo(() => {
        if (lastMessage?.image) {
            return "Sent an image";
        }

        if (lastMessage?.body) {
            return lastMessage.body;
        }

        return "Started a conversation";
    }, [lastMessage]);

    return (
        <div
            className={clsx(
                `
                rounded-lg
                border border-neutral-600
                w-full
                relative
                flex
                items-center
                space-x-3
                p-3
                bg-neutral-600
                hover:bg-neutral-700
                transition
                cursor-pointer
                `,
                selected ? "bg-neutral-700" : "bg-neutral-600"
            )}
            onClick={handleClick}
        >
            {data.isGroup ? (
                <AvatarGroup users={data.users} />
            ) : (
                <Avatar user={otherUser} />
            )}
            <div className="min-w-0 flex-1">
                <div className="focus:outline-none">
                    <div className="flex justify-between items-center mb-1">
                        <p className="text-md font-medium text-white">
                            {data.name || otherUser.name}
                        </p>
                        {lastMessage?.createdAt && (
                            <p className="text-xs text-gray-400 font-light">
                                {format(new Date(lastMessage.createdAt), "p")}
                            </p>
                        )}
                    </div>
                    <p
                        className={clsx(
                            `
                        truncate
                        text-sm

                    `,
                            hasSeen
                                ? "text-yellow-500 font-extralight"
                                : "text-yellow-500 font-normal"
                        )}
                    >
                        {lastMessageText}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ConversationBox;
