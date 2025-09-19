//firstly we're using Auth.js for authentication, go google and see docs.
//npx auth secret-generates a local env variables file which has our auth secret, since we're using typescript, 
//npx dotenv-types-generator to generate types file for env.

import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { client } from "./sanity/lib/client"
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries"
import { writeClient } from "./sanity/lib/write-client"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  //callbacks are the functions that are executed after successfull authentication by nextauth.
  //there are multiple callbacks for multiple events like signIn signOut n more
  callbacks: {
    async signIn({user:{name, email, image}, account, profile:{id, login, bio}}) {//destructuring name email and image from user, and id,login,bio from profile.
    //checking if user exists:
    const existingUser = client.fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
      id, //this profile?.id is comming from github Oauth.
      //id: id
    })

    if(!existingUser){
      //if no existing user then we'll use sanity write client to add the client
      await writeClient.create({
        _type: "author",
        _id: id,//In Sanity, the primary key field is _id, not id.
                        // If you pass id, it will just become a normal field, not the document’s identifier.
                        // Use _id if you want to set the Sanity document ID.
        name: name,
        username: login,
        email: email,//we could just write email here as well but i won't for you to understand, same is with _id, name, usename, image, bio.
        image: image,
        bio: bio || ""//empty string if it doesn't exist.
      })
      return true;
    }

    // Now after a successful signIn we'd need to create a author id from sanity to use it for our profile or creating a startup.
    //let's do that by modifying the jwt token., we can do that by creating a second callback. we'll do that in the next commit.
    throw new Error("No User Found");
  }, 

}
})

//Now we'll have to make a route handler under app/api/auth/[...nextauth]/route.ts   (dynamic route).

