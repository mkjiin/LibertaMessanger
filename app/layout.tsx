import AuthContext from "./context/AuthContenxt";
import ToasterContext from "./context/ToasterContext";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Liberta",
    description: "Liberta",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <AuthContext>
                    <ToasterContext />
                    {children}
                </AuthContext>
            </body>
        </html>
    );
}
