"use client";

import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

interface InputProps {
    label: string;
    id: string;
    type?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    disabled?: boolean;
    whiteLabel?: boolean;
}

const Input: React.FC<InputProps> = ({
    label,
    id,
    type,
    register,
    required,
    errors,
    disabled,
    whiteLabel,
}) => {
    return (
        <div>
            <label
                className={clsx(
                    "block text-sm font-medium leading-6 text-gray-900",
                    whiteLabel && "text-white"
                )}
                htmlFor={id}
            >
                {label}
            </label>
            <div className="mt-2">
                <input
                    id={id}
                    type={type}
                    autoComplete={id}
                    disabled={disabled}
                    {...register(id, {
                        required: required,
                        minLength: id === "password" ? 6 : 2,
                        pattern:
                            id === "email"
                                ? /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                                : /./,
                    })}
                    className={clsx(
                        `
                            form-input
                            block
                            w-full
                            rounded-md
                            border-0
                            py-1.5
                            text-gray-900
                            shadow-sm
                            ring-1
                            ring-inset
                            ring-gray-300
                            placegolder:text-gray-400
                            focus:ring-2
                            focus:ring-inset
                            focus:ring-yellow-400
                            sm:text-sm
                            sm:leading-6
                        `,
                        errors[id] && "ring-rose-500", // Додати червоний обведений контур
                        // errors[id] && "bg-rose-500", // Додати червоний фон для невалідних полів
                        disabled && "opacity-50 cursor-default"
                    )}
                />
            </div>
        </div>
    );
};

export { Input };
