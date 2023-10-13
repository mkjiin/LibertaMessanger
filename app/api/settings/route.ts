import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
    try {
        const currUser = await getCurrentUser();
        const body = await request.json();
        const { name, image } = body;

        if (!currUser?.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: currUser?.id,
            },
            data: {
                image,
                name,
            },
        });

        return NextResponse.json(updatedUser);
    } catch (er: any) {
        console.log(er, "ERROR_SETTINGS");
        return new NextResponse("Internal Server", { status: 500 });
    }
}
