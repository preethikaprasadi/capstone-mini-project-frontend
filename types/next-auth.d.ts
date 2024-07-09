 // types/next-auth.d.ts
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
   
    accessToken?: string;
    
  }

  interface Session {
    user: { 
      id: string;
      accessToken?: string;
      refreshToken:string;
    } 
    // & DefaultSession['user'];
  }

  interface JWT {
    accessToken?: string;
  }
}

// types/next-auth.d.ts
// import { DefaultSession, DefaultUser } from 'next-auth';

// declare module 'next-auth' {
//   interface Session {
//     user: {
//       id: string;
//       accessToken: string;
//     } & DefaultSession['user'];
//   }

//   interface User extends DefaultUser {
//     id: string;
//     token: string;
//   }
// }

