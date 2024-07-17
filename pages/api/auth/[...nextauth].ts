// import NextAuth, { AuthOptions, User } from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';

// interface jwt {
//     id?: string;
//     name?: string | null;
//     email?: string | null;
//     image?: string | null;
//   }
//   interface ExtendedUser extends User {
//     id: string;
//     accessToken: string;
//     email: string;
//     firstName: string;
//     profilePic: string;
//   }

// export const authOptions: AuthOptions=({
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" }
//       },
//       authorize: async (credentials) => {
//         const res = await fetch('http://localhost:3000/auth/login/student', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             email: credentials?.email,
//             password: credentials?.password,
//           }),
//         });

   
//         if (res.ok) {
             
//             const { id, accessToken,email,firstName } = await res.json();
//             return { id, accessToken,email,firstName } as ExtendedUser;
//           } else {
//             return null;
//           }
     
 
// }},       

// )
//   ],
  

//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         const extendedUser = user as ExtendedUser;
//         token.id = extendedUser.id;
//         token.accessToken = extendedUser.accessToken;
//         token.email = extendedUser.email;
//         token.firstName = extendedUser.firstName;
//         token.profilePic = extendedUser.profilePic
//       }
//       return token;
//     },
//     async session({ session, token }) {
//         session.user = {
//           ...session.user,
//           id: token.id,
//           accessToken: token.accessToken,
//           email: token.email,
//           firstName: token.firstName,
//           profilePic: token.profilePic,
          
//         };
//         return session;}}

        
// });


// export default NextAuth(authOptions);


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
    email: string;
    firstName: string;
    userType: 'student' | 'guide';
}

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
                userType: { label: "User Type", type: "text" }
            },
            authorize: async (credentials) => {
                if (!credentials) return null;

                const endpoint = credentials.userType === 'guide' 
                    ? 'http://localhost:3000/auth/login/guide' 
                    : 'http://localhost:3000/auth/login/student';

                const res = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: credentials.email,
                        password: credentials.password,
                    }),
                });

                if (res.ok) {
                    const { id, accessToken, email, firstName} = await res.json();
                    return { id, accessToken, email, firstName,userType: credentials.userType } as ExtendedUser;
                } else {
                    return null;
                }
            }
        })
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                const extendedUser = user as ExtendedUser;
                token.id = extendedUser.id;
                token.accessToken = extendedUser.accessToken;
                token.email = extendedUser.email;
                token.firstName = extendedUser.firstName;
                token.userType = extendedUser.userType;
            }
            return token;
        },

        async session({ session, token }) {
            session.user = {
                ...session.user,
                id: token.id,
                accessToken: token.accessToken,
                email: token.email,
                firstName: token.firstName,
                userType: token.userType,
            };
            return session;
        }
    }
};

export default NextAuth(authOptions);

