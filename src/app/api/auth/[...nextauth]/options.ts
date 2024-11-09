import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

const options: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks:{
        async jwt({ token, user, account }) {
            if (user && account) {
                token.id = user.id
                token.idToken = account.id_token!
                token.accessToken = account.access_token!
            }
            return token
        },
        async session({ session, token }) {
            //console.log("session",session,token,user)
            session.user.idToken = token.idToken as string;
            return session
        },
    }
}

export default options;