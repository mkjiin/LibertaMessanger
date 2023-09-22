import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn: "/",
    },
});

export const confing = {
    matcher: ["/users/:path*"],
};
