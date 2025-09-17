import React from 'react'
import Ping from './Ping'
import { client } from '@/sanity/lib/client'
import { STARTUP_VIEWS_QUERY } from '@/sanity/lib/queries'

const View =async ({id}:{id: string}) => {
  //renaming views to totalViews
  const {views: totalViews }= await client.withConfig({useCdn: false}).fetch(STARTUP_VIEWS_QUERY,{id});//we can also add useCdn thing here manually, useCdn false means that n.o of views will update automatically.
  //now the only thing we need to do is update the views everytime a user visits this page.that's just the incremental login which will just update the database, we have added the dynamic content here as views using cdn tho.
  return (
    <div className='view-container'>
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
        <div className="view-text">
          {/* now we gotta write a seperate sanity query for getting live views, yk where(queries.ts), and then we'll make a request of views from this view.tsx file. */}
            <span className="font-black">{totalViews}</span>
        </div>
    </div>
  )
}

export default View