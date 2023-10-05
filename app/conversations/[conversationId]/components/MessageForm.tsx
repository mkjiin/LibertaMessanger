"use client";

import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPhoto, HiPaperAirplane } from "react-icons/hi2";
import { MessageInput } from "./MessageInput";
import { CldUploadButton } from "next-cloudinary";

const MessageForm = () => {
    const { conversationId } = useConversation();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            message: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setValue("message", "", { shouldValidate: true });

        axios.post("/api/messages", {
            ...data,
            conversationId,
        });
    };

    const handleUpload = (result: any) => {
        axios.post("/api/messages", {
            image: result?.info?.secure_url,
            conversationId,
        });
    };

    return (
        <div className="py-4 px-4 bg-neutral-600 flex items-center gap-2 lg:gap-4 w-full border-l-[1px] border-neutral-800 text-white">
            <CldUploadButton
                options={{ maxFiles: 1 }}
                onUpload={handleUpload}
                uploadPreset="cj429id2"
            >
                <HiPhoto size={26} className="text-yellow-500" />
            </CldUploadButton>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex items-center gap-2 lg:gap-4 w-full"
            >
                <MessageInput
                    id="message"
                    register={register}
                    errors={errors}
                    required
                    placeholder="Write a message"
                />
                <button
                    type="submit"
                    className="rounded-2xl p-2 bg-yellow-500 cursor-pointer hover:capacity-75 transition"
                >
                    <HiPaperAirplane size={18} />
                </button>
            </form>
        </div>
    );
};

export { MessageForm };
