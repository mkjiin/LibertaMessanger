"use client";

import { User } from "@prisma/client";
import Image from "next/image";

interface AvatarProps {
    user: User;
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
    return (
        <div className="relative ">
            <div
                className="
                relative 
                inline-block 
                rounded-full 
                overflow-hidden 
                h-8 
                w-8 
                md:h-9 
                md:w-9"
            >
                <Image
                    alt="Avatar"
                    src={user?.image || "/images/placeholder.jpg"}
                    fill
                />
            </div>
            <span
                className="
                absolute
                block
                rounded-full
                bg-yellow-500
                ring-2
                ring-white
                top-0
                right-0
                h-1
                w-1
                md:h-2
                md:w-2
            "
            />
        </div>
    );
};

export default Avatar;
