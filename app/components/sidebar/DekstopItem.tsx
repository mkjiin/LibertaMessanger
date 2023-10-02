"use client";

import clsx from "clsx";
import Link from "next/link";

interface DekstopItemProps {
    label: string;
    icon: any;
    href: string;
    onClick?: () => void;
    active?: boolean;
}

const DekstopItem: React.FC<DekstopItemProps> = ({
    label,
    icon: Icon,
    href,
    onClick,
    active,
}) => {
    const handleClick = () => {
        if (onClick) {
            return onClick();
        }
    };

    return (
        <li onClick={handleClick}>
            <Link
                href={href}
                className={clsx(
                    `
                group
                flex
                gap-x-3
                rounded-md
                p-3
                text-sm
                leading-6
                font-semibold
                text-white
                hover:bg-yellow-500
                hover:bg-opacity-75
                transition
            `,
                    active && "bg-yellow-500 text-white"
                )}
            >
                <Icon className="h-6 w-6 shrink-0" />
                <span className="sr-only">{label}</span>
            </Link>
        </li>
    );
};

export default DekstopItem;
