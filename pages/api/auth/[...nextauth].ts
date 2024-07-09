
import NextAuth, { AuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

interface jwt {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
  interface ExtendedUser extends User {
    id: string;
    accessToken: string;
  }

export const authOptions: AuthOptions=({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        const res = await fetch('http://localhost:3000/auth/login/student', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

   
        if (res.ok) {
             
            const { id, accessToken } = await res.json();
            return { id, accessToken } as ExtendedUser;
          } else {
            return null;
          }
     
 
}},       

)
  ],
  

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const extendedUser = user as ExtendedUser;
        token.id = extendedUser.id;
        token.accessToken = extendedUser.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
        session.user = {
          ...session.user,
          id: token.id,
          accessToken: token.accessToken,
        };
        return session;}}
});


export default NextAuth(authOptions);
