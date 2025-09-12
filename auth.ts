//firstly we're using Auth.js for authentication, go google and see docs.
//npx auth secret-generates a local env variables file which has our auth secret, since we're using typescript, 
//npx dotenv-types-generator to generate types file for env.

import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
})

//Now we'll have to make a route handler under app/api/auth/[...nextauth]/route.ts   (dynamic route).


