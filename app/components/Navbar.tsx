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

export default Navbar