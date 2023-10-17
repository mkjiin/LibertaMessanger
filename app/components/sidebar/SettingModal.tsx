"use client";

import { useRouter } from "next/navigation";
import { User } from "@prisma/client";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { Modal } from "../Modal";
import { Input } from "../inputs/Input";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import { Button } from "../Button";

interface SettingModalProps {
    currentUser: User;
    isOpen?: boolean;
    onClose: () => void;
}

const SettingModal: React.FC<SettingModalProps> = ({
    currentUser,
    isOpen,
    onClose,
}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: currentUser?.name,
            image: currentUser?.image,
        },
    });

    const image = watch("image");
    const handleUpload = (result: any) => {
        setValue("image", result?.info?.secure_url, {
            shouldValidate: true,
        });
    };

    const onSumbit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        axios
            .post("/api/settings", data)
            .then(() => {
                router.refresh();
                onClose();
            })
            .catch(() => toast.error("Something went wrong!"))
            .finally(() => setIsLoading(false));
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit(onSumbit)}>
                <div className="space-y-3">
                    <div className="border-b border-gray-900/10 pb-4">
                        <h2 className="text-lg font-semibold leading-7 text-white">
                            Profile
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-yellow-500">
                            Edit your info
                        </p>
                        <div className="mt-6 flex flex-col gap-y-4">
                            <Input
                                disabled={isLoading}
                                label="Name"
                                id="name"
                                errors={errors}
                                required
                                register={register}
                                whiteLabel
                            />

                            <div>
                                <label className="block text-sm font-medium leading-6 text-white ">
                                    Photo
                                </label>
                                <div className="mt-2 flex items-center gap-x-3">
                                    <Image
                                        width="48"
                                        height="48"
                                        className="rounded-full"
                                        src={
                                            image ||
                                            currentUser?.image ||
                                            "/images/placeholder.jpg"
                                        }
                                        alt="ava"
                                    />
                                    <CldUploadButton
                                        options={{ maxFiles: 1 }}
                                        onUpload={handleUpload}
                                        uploadPreset="cj429id2"
                                    >
                                        <Button
                                            disabled={isLoading}
                                            type="button"
                                        >
                                            Change
                                        </Button>
                                    </CldUploadButton>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center justify-end gap-x-2">
                        <Button disabled={isLoading} onClick={onClose}>
                            {" "}
                            Cancel
                        </Button>
                        <Button disabled={isLoading} type="submit">
                            {" "}
                            Save
                        </Button>
                    </div>
                </div>
            </form>
        </Modal>
    );
};

export { SettingModal };
