import { handlers } from "@/auth" // Referring to the auth.ts we just created
export const { GET, POST } = handlers


// Add optional Middleware to keep the session alive, this will update the session expiry every time its called.
// ./middleware.ts

// export { auth as middleware } from "@/auth"
//Already did that.

//now for authentication we'll use Oauth-basically providers like google github n so on.
//go to connections/providers/github. go to creating a new Oauth app(github), there are steps written to do that so do em.
//in the url just fill http://localhost:3000 for now.
//in callback url just paste from the auth.js documentation/ connections / providers/github/callback url
//just change from example.com to something like this: https://localhost:3000/api/auth/callback/github
//we'll change these links when we push our app to production.
//now we're on the next page, we got ourselves a client id, and we can generate a new client secret.
//add them both to env.local.

//then add the app logo from the figma design as well. by exporting after double clicking in the figma design.
//click on update our application.

//now from the github provider setup, see the configuration and update our auth.ts
//now go to homepage.