import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface IParams {
    conversationId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
    try {
        const currUser = await getCurrentUser();
        const { conversationId } = params;

        if (!currUser?.id || !currUser?.email) {
            return new NextResponse("Unauthorize", { status: 401 });
        }

        // Find the existing conversation

        const conversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId,
            },
            include: {
                messages: {
                    include: {
                        seen: true,
                    },
                },
                users: true,
            },
        });

        if (!conversation) {
            return new NextResponse("Invalid ID", { status: 400 });
        }

        //Find last message

        const lastMessage =
            conversation.messages[conversation.messages.length - 1];

        if (!lastMessage) {
            return NextResponse.json(conversation);
        }

        // Update senn of last message

        const updatedMessage = await prisma.message.update({
            where: {
                id: lastMessage.id,
            },
            include: {
                sender: true,
                seen: true,
            },
            data: {
                seen: {
                    connect: {
                        id: currUser.id,
                    },
                },
            },
        });

        return NextResponse.json(updatedMessage);
    } catch (error: any) {
        console.log(error, "ERROR_MESSAGE_SEEN");
        return new NextResponse("Internal Erorr", { status: 500 });
    }
}
