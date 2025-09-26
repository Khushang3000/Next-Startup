import React from 'react'
import Ping from './Ping'
import { client } from '@/sanity/lib/client'
import { STARTUP_VIEWS_QUERY } from '@/sanity/lib/queries'
import { writeClient } from '@/sanity/lib/write-client'
import { after } from 'next/server'

const View =async ({id}:{id: string}) => {
  //renaming views to totalViews
  const {views: totalViews }= await client.withConfig({useCdn: false}).fetch(STARTUP_VIEWS_QUERY,{id});//we can also add useCdn thing here manually, useCdn false means that n.o of views will update automatically.
  //now the only thing we need to do is update the views everytime a user visits this page.that's just the incremental login which will just update the database, we have added the dynamic content here as views using cdn tho.
  //and also we gotta recommend the user with other startups of this type since he visited this page.
  //but before that, we'll learn about sanity write client. it'll allow us to modify some data directly within our application, no need of sanity studio.
  //sanity write client allows users to perform write operations, and through that we'll see the live changes in the web page(dynamic part)
  //for setting up write client in sanity we need to generate a token with write permissions, through sanity manage website,
  //go to your dashboard on sanity, click on the sanity project you've created, go to api, go to tokens, add a new api token, specify a name like "create and update startups"
  //and under permissions, give it the editor access., copy the token info you were given. and add it in env.local, notice how this one doesn't have next_public,
  //well this is cuz this one is a more serious action that not everyone should be able to perform, and it should only happen from the server side.
  //now go to sanity's env.ts 
  //now we gotta create another file in sanity lib folder called write-client.ts
  //now we'll update views here in this file.

  //patch is used for updates, and passing id means we wanna patch the document with that particular id, set changes the value of totalViews, and commit commits that action.
  // await writeClient.patch(id).set({views: totalViews+1}).commit();

  //with this approach the above two requests will execute sequentially and you won't see anything on the ui untill they are executed.
  //instead you see the skeleton, to avoid that and to run this updateView in the background, while we see the rest of the results immediately
  //we can use the unstable_after (or just after in nextjs15)functionality
  //after allows you to schedule work to be executed after a response (or prerender) is finished. This is useful for tasks and other side effects that should not block the response, such as logging and analytics or the best case, updating views.(read docs for example.)
  // after(() => {
    // Execute after the layout is rendered and sent to the user
  //   log()
  // })
  //in earlier version of nextjs it was experimental so you had to set it(after) as true in experimental 

  //NOW IF YOU RELOAD THE PAGE, THE ONLY PART THAT'LL RELOAD IS THE VIEWS, HOW COOL IS THAT!!!
  //now the diffference is how we're using clients, one is write-Client.ts where useCdn is false, so there the client get's to make changes and the changes are live.
  //and other is client.ts where we have set useCdn true, so now if you see, the views update as soon as there's a change,(Dynamic), as we're using after.
  //and the other part is using ISR(client), where if we change the name of the startup, then the changes will only reflect after 60sec!!!(here we're explicitly setting it to false, see await client above), if we set useCdn false then we'll get live updates
  //that's partial pre-rendering for ya. Now before we make a startup publish page for user, we must first authenticate the user.
  //so see the author authentication flow ss,
  //basically based on the session, from O-auth, if we see that a user is authenticated or not, if he is is authenticated from O-auth,
  //we gotta see if he exists as an author in the sanity database, if not then we create him in sanity database.

  //to do that we'll create a sanity query to check if an author with a specific github id exists.
  //go to queries.ts and then auth.ts(where we'll make use of callbacks to call this query and get user's data to make him an author or if he already exists then allow him to create posts)

  after(async ()=>{
    await writeClient.patch(id).set({views: totalViews+1}).commit();//calling the writeClient action here.
  })
  return (
    <div className='view-container !fixed !mb-15'>
        {/* these top and right from div below are offsets, i.e that element will be absolute-the element is taken out of the normal document flow and positioned relative to the nearest ancestor with relative (or absolute/fixed/sticky).
        top-2 → offset 2 units (0.5rem by default in Tailwind) from the top edge of the parent.

        -top-2 → same thing, but negative offset (moves it upward past the edge).

        right-2 → offset from the right edge of the parent.

        -right-2 → offset past the right edge.

        So effectively, our element will sit slightly outside the top-right corner of its parent. */}
        <div className="absolute -top-2 -right-2">
            {/* we'll create another component ping.tsx that'll render here. */}
            <Ping/>
        </div>
        <div className="view-text bg-amber-400">
          {/* now we gotta write a seperate sanity query for getting live views, yk where(queries.ts), and then we'll make a request of views from this view.tsx file. */}
            <span className="font-black">Views: <br />{totalViews}</span>
        </div>
    </div>
  )
}

export default View