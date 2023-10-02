import getCurrentUSer from "@/app/actions/getCurrentUser";
import DekstopSidebar from "./DekstopSidebar";
import MobileFooter from "./MobileFooter";
import getCurrentUser from "@/app/actions/getCurrentUser";

async function Sidebar({ children }: { children: React.ReactNode }) {
    const currentUser = await getCurrentUser();

    return (
        <div className="h-full">
            <DekstopSidebar currentUser={currentUser!} />
            <MobileFooter />
            <main className="h-full lg:pl-20 bg-neutral-600">{children}</main>
        </div>
    );
}

export default Sidebar;
