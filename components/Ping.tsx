import React from 'react'

const Ping = () => {
  return (
    <div className='relative'>
        <div className="absolute -left-4 -top-1">
            <span className="flex size-[11px]">
                {/* inline-flex:It only takes as much width as its content.

                    It flows inline with other text or inline elements.

                    Inside it, children still get flexbox behavior (you can use justify-, items-, etc.). */}
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex size-[11px] rounded-full bg-primary"></span>
            </span>
        </div>
    </div>
  )
}

export default Ping