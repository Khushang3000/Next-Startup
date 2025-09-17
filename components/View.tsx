import React from 'react'
import Ping from './Ping'

const View = ({id}:{id: string}) => {
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
            <span className="font-black">100views</span>
        </div>
    </div>
  )
}

export default View