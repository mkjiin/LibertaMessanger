import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";

export async function POST(request: Request) {
    try {
        const currUser = await getCurrentUser();
        const body = await request.json();
        const { message, image, conversationId } = body;

        if (!currUser?.id || !currUser?.email) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const newMessage = await prisma.message.create({
            data: {
                body: message,
                image: image,
                conversation: {
                    connect: {
                        id: conversationId,
                    },
                },
                sender: {
                    connect: {
                        id: currUser.id,
                    },
                },
                seen: {
                    connect: {
                        id: currUser.id,
                    },
                },
            },
            include: {
                seen: true,
                sender: true,
            },
        });

        const updatedConversatoin = await prisma.conversation.update({
            where: {
                id: conversationId,
            },
            data: {
                lastMessageAt: new Date(),
                messages: {
                    connect: {
                        id: newMessage.id,
                    },
                },
            },
            include: {
                users: true,
                messages: {
                    include: {
                        seen: true,
                    },
                },
            },
        });

        await pusherServer.trigger(conversationId, "messages:new", newMessage);

        const lastMessage =
            updatedConversatoin.messages[
                updatedConversatoin.messages.length - 1
            ];

        updatedConversatoin.users.map((user) => {
            pusherServer.trigger(user.email!, "conversation:uptade", {
                id: conversationId,
                messages: [lastMessage],
            });
        });

        return NextResponse.json(newMessage);
    } catch (error: any) {
        console.log(error, "ERROR_MESS");
        return new NextResponse("InternalError", { status: 500 });
    }
}
