"use client";

import { User } from "@prisma/client";
import UserBox from "./UserBox";

interface UsersListProps {
    users: User[];
}

const UsersList: React.FC<UsersListProps> = ({ users }) => {
    return (
        <aside
            className="
            fixed
            inset-y-0
            pb-20
            lg:pb-20
            lg:left-20
            lg:w-80
            lg:block
            overflow-y-auto
            block
            w-full
            left-0
        "
        >
            <div className="flex-col">
                <div
                    className="
                        text-2xl
                        font-bold
                        text-neutral-100
                        py-4
                        px-3
                    "
                >
                    People
                </div>
                {users.map((el) => (
                    <UserBox key={el.id} data={el} />
                ))}
            </div>
        </aside>
    );
};

export default UsersList;
