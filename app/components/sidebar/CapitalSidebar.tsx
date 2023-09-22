import DekstopSidebar from "./DekstopSidebar";
import MobileFooter from "./MobileFooter";

async function Sidebar({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-full">
            <DekstopSidebar />
            <MobileFooter />
            <main className="h-full lg:pl-20 bg-neutral-600">{children}</main>
        </div>
    );
}

export default Sidebar;
