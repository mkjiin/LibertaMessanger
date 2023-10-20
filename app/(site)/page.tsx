import Image from "next/image";
import { AuthForm } from "./components/AuthForm";

export default function Home() {
    return (
        <div
            className=" flex 
            min-h-full 
            flex-col 
            justify-center 
            py-12 
            sm:px-6 
            lg:px-8 
            bg-gradient-to-r 
            from-stone-950 
            to-neutral-700"
        >
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Image
                    alt="Logo"
                    height="150"
                    width="150"
                    className="mx-auto w-auto"
                    src="/images/ExtendLogo.png"
                    unoptimized={process.env.ENVIRONMENT !== "PRODUCTION"}
                />
                <h2
                    className="
                    mt-6
                    text-center
                    text-3xl
                    font-bold
                    tracking-tight
                    text-neutral-200
                "
                >
                    Enter the free world
                </h2>
            </div>
            <AuthForm />
        </div>
    );
}
