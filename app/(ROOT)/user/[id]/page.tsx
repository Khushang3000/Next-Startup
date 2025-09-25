import { auth } from '@/auth';
import { AUTHOR_BY_ID_QUERY } from '@/sanity/lib/queries';
import React, { Suspense } from 'react'
import { client } from '@/sanity/lib/client';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import UserStartups from '@/components/UserStartups';
import { StartupCardSkeleton } from '@/components/StartupCard';
//you will now see the user page.

export const experimental_ppr = true;

const page = async ({params}: {params: Promise<{id: string}>}) => {//extracting the params and specifying it's type.
    const id = (await params).id;//extracting id
    const session = await auth();//extracting session
    const user = await client.fetch(AUTHOR_BY_ID_QUERY,{id} ) //extracting the user, through his own id not the github id., the info we get here like bio, image and more will be directly from github!!! so if you don't have a bio on github then you won't have the bio here, and the image here will be the same as github.
    if(!user) return notFound();//through this we get a 404 page.
  return (
    <>
        <section className="profile_container">
            <div className="profile_card bg-pink-700">
                <div className="profile_title">
                    <h3 className="text-black uppercase text-center line-clamp-1 text-26-semibold">{user.name}</h3>
                </div>
                <Image src={user.image} alt={user.name} width={220} height={220} className='profile_image'/>
                <p className="text-30-extrabold mt-7 text-center">@{user?.username}</p>
                <p className="text-center mt-1 text-14-normal">{user?.bio}</p>
            </div>
            <div className="flex-1 flex flex-col gap-5 lg:-mt-5 ">
                <p className="text-30-bold">{session?.id === id? 'Your': 'All Startups'}Startups</p>
                <ul className="card_grig-sm">
                    {/* HERE WE'LL RENDER USER'S OWN STARTUPS, AND THIS IS THE PERFECT CASE OF PPR, WHY? CUZ ALL THE OTHER INFO ABOUT THE USER CAN BE UPDATED AT THE LATER TIME, BUT THE USER'S OWN STARTUPS SHOULD BE LIVE!!!
                    so this part of the page should be dynamic, also see the line 9, so now let's create a new component called USERSTARTUPS.tsx and we'll render it here. and also we would need a query to fetch all the startups created by that user. we'll create another query then
                    and use it in UserStartups.tsx and pass the id we have as a prop in UserStartups, also as UserStartups takes some time to load so we gotta render it within a suspense tag.  */}
                    <Suspense fallback={<StartupCardSkeleton />}> {/**You'll see suspense tag's working when you refresh the page. <Suspense fallback={<p>Loading...</p>}>, WE CAN DO THIS AS WELL BUT LET'S JUST INSTALL A SHADCN SKELETON COMPONENT. 
                     * IT'S JUST A GREYED OUT RECTANGLE THAT MAKES IT APPEAR THE THE WHOLE DIV IS LOADING. npx shadcn@latest add skeleton, and in startupCard.tsx we'll create that skeleton and export it and use it here
                     */}
                     {/* now if you reload, you'll see something that resembles the card being loaded before the actual card is loaded.
                     maybe if you go to inspect element, network, instead of no throttling, select slow 4g, maybe you could see the loading appear, maybe it was still too fast,
                     if you do ctrl+shift+R then it will clear the cache as well. IF THIS DOESN'T WORK IN BRAVE TRY IT IN EDGE. Also, we forgot to replace the avatar and placeholder in the startupCard so we fix that. the image and it's placeholder as well, we'll render author?.image! and author?.name! and stuff.
                     we'll use ! so that typescript doesn't throw any errors.
                     also the one thing we didn't do was make the navbar a bit more mobile responsive so we'll do that as well, so go to navbar, the create button. */}
                    <UserStartups id={id}/>
                    </Suspense>
                </ul>
                {/* NOW IN NEXT COMMIT WE'LL ADD ANOTHER GREATE FEATURE */}
            </div>
        </section>
    </>
  )
}

export default page