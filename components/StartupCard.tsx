import React from 'react'
import { formatDate } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'
const StartupCard = ({post}:{post: StartupTypeCard}) => {
    //we'll add this StartupTypeCard later once we immplement sanity, as one of it's great features is automatic type checking for documents in our collection
  return (
    <li className="startup-card group">
        {/* Think of it as:

group → marks a parent element as a "group".

group-* variants → let child elements respond to the parent’s state (like hover, focus, etc.).

Example: Button with icon that changes color on hover
<button className="group flex items-center space-x-2 p-3 bg-gray-200 rounded-lg hover:bg-gray-300">
  <span className="text-gray-700 group-hover:text-blue-600">Click Me</span>
  <svg
    className="w-5 h-5 text-gray-700 group-hover:text-blue-600"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M5 12h14" />
  </svg>
</button>


The button has the group class.

The <span> and <svg> inside use group-hover:* to change their styles when the parent is hovered.

Without group

You’d only be able to apply hover: styles directly on the element itself.
With group, you can cascade hover/focus/active states from parent → children.
 */}
        <div className='flex-between'>
            <p className="startup_card_date">
                {formatDate(post._createdAt)}
                {/* rn we're just using the value of createdAt as a simple static string but what if we could use the js new Date() object, 
                we wouldn't be able to render it here like normal, so we somehow need to format the date(convert it into string), and for that we'll create a function in the lib/utils.ts */}
                {/* make sure you change the createdAt to new Date() object in the page.tsx */}
            </p>
            <div className="flex gap-1.5">
                <EyeIcon className='size-6 text-primary hover:text-pink-700' />
                <span>{post.views}</span>
            </div>
        </div>
    </li>
  )
}

export default StartupCard