//firstly we're using Auth.js for authentication, go google and see docs.
//npx auth secret-generates a local env variables file which has our auth secret, since we're using typescript, 
//npx dotenv-types-generator to generate types file for env.

import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { client } from "./sanity/lib/client"
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries"
import { writeClient } from "./sanity/lib/write-client"
import next from "next"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  //callbacks are the functions that are executed after successfull authentication by nextauth.
  //there are multiple callbacks for multiple events like signIn signOut n more
  callbacks: {
    //this signIn callback will run after a sucessful authentication by nextauth.
    async signIn({user:{name, email, image}, profile:{id, login, bio}}) {//destructuring name email and image from user, and id,login,bio from profile.
      //THIS ID WE'RE GETTING THROUGH PROFILE IS GITHUB ID.
    //checking if user exists:
    const existingUser = await client.withConfig({useCdn: false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
      id, //this profile?.id is comming from github Oauth.
      //id: id
    })

    if(!existingUser){
      //if no existing user then we'll use sanity write client to add the client
      await writeClient.create({
        _type: "author",

        // #########################################################################################
        //HERE BELOW _ID IS THE ID THAT SANITY ITSELF CREATE, BUT WE'RE OVERRIDING THAT AUTHOR'S _ID'S VALUE WITH OUR GITHUB USER'S ID'S VALUE. 
        id,//In Sanity, the primary key field is _id, not id.
                        // If you pass id, it will just become a normal field, not the document’s identifier.
                        // Use _id if you want to set the Sanity document ID.

        // KHUSHANG FROM THE FUTURE, WE ARE NOT OVERRIDING SANITY DB'S ID WITH OUR GITHUB ID'S VALUE, WE'RE JUST CREATING A NEW ID FIELD NAMED ID!!!
        //WHICH STORES THE VALUE OF USER'S GITHUB ID, AND SANITY WILL GENERATE THAT _ID INTERNALLY.
        name: name,
        username: login,
        email: email,//we could just write email here as well but i won't for you to understand, same is with _id, name, usename, image, bio.
        image: image,
        bio: bio || ""//empty string if it doesn't exist.
      })
    }
    return true;//now continue the signIn process.
  }
    // Now after a successful signIn we'd need to create a author id from sanity to use it for our profile or creating a startup.
    //let's do that by modifying the jwt token(we get a jwt callback function as well.)., we can do that by creating a second callback. we'll do that in the next commit.
    
    //But before that,
    // Session analogy:
//     There are two sessions in play:
// Your app’s session (NextAuth/Auth.js)
// Managed via cookie (or DB + cookie).
// Ends when you call signOut() (cookie deleted, DB entry cleared).
// ✅ Logging out of your app does end this session.

// Provider’s session (GitHub/Google/etc.)(THIS IS SPECIFICALLY PROVIDED BY O-AUTH)
// When you logged in the first time, GitHub also set a session cookie in its domain (github.com).
// When you log out of your app, you did not log out of GitHub.
// So when you click "Login with GitHub" again, GitHub says:
// 👉 “Oh, I already know who this is, no need to ask again — here’s a token.”
// That’s why you skip the username/password prompt.

// so frontend uses that token, like let's say someone want's to send a post request, but they must be logged in first(loggin in stored the jwt token in the browser's cookie for them), now when they hit the auth middleware, that middleware verifies the jwt token and then calls next() which is the post req. if verification failed then it returns from that middleware itself.
// and that storage of jwt in the cookie was done by the backend when they first logged in? by sending that cookie through response like res.cookie.jwt_token or something
//so the analogy:
// Session (backend) = The hotel’s computer system with your booking.

// Cookie/JWT (frontend) = The keycard you carry around.

// 👉 The keycard by itself doesn’t do anything — it’s just proof.
// 👉 The actual booking (session) lives in the hotel’s backend.
  ,
  async jwt({token, account, profile}) {
    if(account && profile){
      //if account and profile exist then fetch them
      //passing the github id(profile?.id) as id parameter.
      const user = await client.withConfig({useCdn: false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY,{id: profile?.id})//database author.

      token.id = user?._id
    }
    return token;
    //THIS WILL ALLOW US TO CONNECT A GITHUB USER WITH A SANITY AUTHOR THAT CAN THEN CREATE A STARTUP.
    //token is a pass/ticket remember the hotel analogy?
    //now we'll use this token some place else to clear that checkpoint through this token/pass/ticket
    //and that checkpoint may as well be creating a post.
    //but not directly, we'll make use of session.(as a middleware ofc(checkpoint before someone could come and create a post))
    //so let's write that next.
  },
  async session({session, token}) {
    //now we need to pass the profile.id from the token to the session
    //remember that our db's author's _id's value is the user's github profile's id!!!!
    Object.assign(session, {id: token.id})
    return session;//return the modified session.
    //now while creating the post/startup the user will have the session's id, through which he will verify the db's id.
    //Now go to home page and extract a session and from it you can get the sanity id of the author for that user.
  }
  
  


}})
//Now we'll have to make a route handler under app/api/auth/[...nextauth]/route.ts   (dynamic route).

