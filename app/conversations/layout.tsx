import getConversations from "../actions/getConversations";
import Sidebar from "../components/sidebar/CapitalSidebar";
import ConversationList from "./components/ConversationList";

export default async function ConversationLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const conversations = await getConversations();

    return (
        <Sidebar>
            <ConversationList initialItems={conversations} />
            <div className="h-full">{children}</div>
        </Sidebar>
    );
}
