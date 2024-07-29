import axios from "axios";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'CustomGoogleProvider',
            credentials: {},
            authorize: async (credentials: any): Promise<any> => {
                const { code } = credentials;
                console.log("Code received: ", code);
                try {
                    const response = await axios.post(`${process.env.NEXT_SERVER_URL}/auth/google/callback`, { code });
                    if (!response.data) {
                        throw new Error("User Not Found");
                    }
                    // console.log("Ye raha response", response.data)
                    const user = {
                        name: response.data.profile.name,
                        email: response.data.profile.email,
                        accessToken: response.data.token,
                        image: response.data.profile.picture
                    }
                    console.log(user);
                    return user;

                } catch (error) {
                    console.log("Error next-auth: ", error);
                    throw new Error("Invalid Access Code from next-auth");
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.name = user.name;
                token.email = user.email;
                token.accessToken = user.accessToken;
                token.image = user.image;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.accessToken = token.accessToken;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.image = token.image;
            }
            return session;
        }
    },
    pages: {
        signIn: '/sign-in',
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
}