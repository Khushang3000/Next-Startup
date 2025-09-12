import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { auth, signIn, signOut } from '@/auth'



const Navbar = async () => { //we can make this function an async function cuz this is a server component. you couldn't do this in client componenet.

  const session = await auth()

  
  return (
    <header className='px-5 py-3 bg-white shadow-sm font-work-sans'>
      {/* justify center centers it horizontally and items center centers it vertically, but they must be html elements not simple text. text-center centers text horizontally(left-right) but it won't work here cuz flex overrides it. */}
      <nav className='flex justify-between items-center  text-amber-700'>
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={144} height={30} />
        </Link>
          {/* gap-* in flexbox (and grid) depends on flex direction and wrapping. gap is spacing b/w the elements within the flexbox */}
          <div className="flex items-center gap-5 text-black">
            {/* if there is session and user in session only then render these components, we got session from the auth function from nextauth(Oauth), 
            see it in action only then you'd understand.
            for the first time it asks you to login to github, once you've logged in to github, it redirects you to the page you were supposed to go to.
            now if you log out of your application, and try to login again, so you've already authorized the app(i.e you have logged into(not really it actually is authorized) github on your device)
            the next time you log in, (Github just skips the authentication page)
            It immediately redirects back to NextAuth with a new authorization code.
            That’s why you didn’t see the GitHub authorization prompt again.
            It’s normal: the OAuth session at GitHub is still alive, even though your NextAuth session ended.
            
            Logging out of your application clears everything!!! it ends the session!!! (removes the cookie/jwt)
            //see the diagram on desktop next-auth O-auth

            //also after that see the global.css->@themes

            */}
            { session && session.user ? (
              <>
              <Link href="/startup/create"><span>Create</span></Link>
              <form action={async ()=>{
                "use server";
                await signOut( {redirectTo: "/"})}}>
                <button type='submit'>Logout</button>
                
              </form>
              <Link href={`/user/${session?.id}`}>
                <span>{session?.user?.name}</span>
              </Link>
              </>
            ):(
              <>
              {/* <button onClick={async ()=>{//sign in returns a promise.
                "use server"; //ensures that this signin gets called on the server.(since page is already rendered on server and sent to client, this button call becomes a client side call.)
                await signIn('github')

                //but on clicking it you might still get an error as you can't use a server action within a component which is a client component(button with onClick)
                //so we'll use a new trick that react 19 provides us.
              } }>
                <span>Login</span>
              </button> */}
              <form action={async ()=>{//sign in returns a promise.
                "use server"; //ensures that this signin gets called on the server.(since page is already rendered on server and sent to client, this button call becomes a client side call.)
                await signIn('github')

                //but on clicking it you might still get an error as you can't use a server action within a component which is a client component(button with onClick)
                //so we'll use a new trick that react 19 provides us.
              } }>
                {/* Now within this form we can create the button */}
                <button type='submit'>Login</button>
                {/* Now if you click the button you'll will be redirected to the github login, but it will say that redirect uri is not associated to this application, actually in your github oauth setup, you wrote callback url as https while localhosts are http., so do this and update the app settings.
                AND ALSO DO THIS WITH THE SIGNOUT BUTTON, MAKE IT A FORM ACTION. */}
              </form>

              </>
            )  
           }
          </div>
        
      </nav>
    </header>
  )
}
// 🔹 Normal HTML <form> behavior
// In plain HTML, when you click a <button type="submit"> inside a <form>, the browser:
// Collects all the form fields (<input>, <select>, etc.).
// Sends them to the server (via GET/POST depending on method and action attributes).
// Reloads the page with the response.

// 🔹 What Next.js does differently
// Next.js hijacks that normal form submission and does this:
// Serialize the form data → grabs everything you entered.
// Send it to a special Next.js endpoint → this endpoint is auto-generated for your Server Action.
// Run the function on the server → because of "use server", Next.js ensures that function is never included in the client bundle.
// Return the result (and optionally re-render the page / do a redirect).
// "use server" tells Next.js do not bundle this function into client JavaScript.
// Instead, Next.js gives it a unique action ID, so when the form is submitted, it knows which function to call on the server.
// From the browser’s perspective, it’s just a form POST. The browser never sees your server function.

// Think of it like:
// onClick = browser executes your code in JS
// form action={serverAction} = browser submits a request, Next.js executes your code on the server.

// 🔹 Key benefits
// No client-side event handler → smaller bundle.
// Progressive enhancement → still works without JS.
// Security → server-only code stays on the server (never leaks to client).

export default Navbar