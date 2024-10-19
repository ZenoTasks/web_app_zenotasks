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
        async session({ session, token, user }) {
            //console.log("session",session,token,user)
            session.user = user;
            return session
        },
        async jwt({ token, user, profile, account }) {
            //console.log("jwt",token,user,profile,account)
            if (user) {
                token.id = user.id
            }
            return token
        }
    }
}

export default options;