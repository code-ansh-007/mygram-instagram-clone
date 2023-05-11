import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    // ! this option of pages is for the customization of the signin page or any other page which we can customize according to our requirement
    signIn: "/auth/signin",
  },
  secret: process.env.NEXT_PUBLIC_SECRET,
  callbacks: {
    async session({ session, token, user }) {
      session.user.username = session.user.name // * in this code block if the name of the user in the object sent by google is separated by spaces, we are first spliting the string at the space and then re joining it with all the lowercase letters of the name
        .split(" ")
        .join("")
        .toLocaleLowerCase();
      session.user.uid = token.sub;
      return session;
    },
  },
});
