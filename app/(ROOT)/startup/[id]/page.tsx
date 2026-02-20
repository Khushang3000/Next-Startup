//yk this is the details page, and for different startups there's gonna be different content, so we'll just sort startup's details page with that [id] that we get here through params
//if you see the startup card's details section you'll realise that that details leads you to this page.
import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { PLAYLIST_BY_SLUG_QUERY, STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'

import MarkdownIt from 'markdown-it';
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';
import StartupCard, { StartupCardType } from '@/components/StartupCard';

const md = MarkdownIt({ html: false });



export const experimental_ppr = true;//now we can use sanity's client api to perform isr(incremental site regeneration) to get startup details
//we can do that by fetching the post based on the provided id. see in page function below, the posts variable.

const page = async ({params}:{params: Promise<{id: string}>}) => {
    const id = (await params).id; //btw this id will be a hashed or encrypted string not plain n.o
    //now we can take this id and fetch all of the details about that startup. 

    // params checked
    //let's go to studio then vision, there we can modify our query a bit to now not fetch all the startups, but rather fetch a single startup's details
    
    // it'll look like this below, where a type is startup and _id == $id(this $id is the id that is passed through params and in sanity studio's vision you can pass this param in the params tab), and [0] means give me only the element that matches that query.
    //if you copy and pass the id that you got on the startup details page then you'd get the result as null, because it got parsed to show nicely on the ui
    //to get the real id, go into structure then startup then click on the startup that we have, click 3dots and from there inspect it and you'll get the id, copy it and pass that as a param in the vision
    //make sure to pass that id in string. now run fetch from vision tab.
    // *[_type == "startup" && _id == $id][0]
    // {
    //     _id,
    //     title,
    //     slug, 
    //     _createdAt,
    //     author -> {_id, name, image, bio, },    //what properties we want from author.
    //     views,
    //     description,
    //     category,
    //     image, 
    //     pitch
    // }
    //now just copy this query and go to sanity lib queries.ts and we'll add a new query to fetch a startup there.


    //the id we get here is actually parsed which our sanity groqq can't read. so we gotta convert it.
    //hey me from the future: that problem was cuz when we were clicking on the details link from the startupcard, we actually added an extra } to the string that's why 
    //our string wasn't the one that we were expecting, and same case happened when we passed the same string in params of vision for the first time!!!
    //now in next commit we'll design the ui of details page.

    
    //isr
    // const post = await client.fetch(STARTUP_BY_ID_QUERY, {id})//here id is sent through params.
    // if(!post){
    //   return notFound();//from next/navigation
    // }
    //now if all checks are passed, then we can render something like posts.title below in the component


    //markdown-it for parsing the markdown values:
    // const parsedContent = md.render(post?.pitch || "")//parse the markdown content if it's there, or just return an empty string if it doesn't exist.
    //random note: to use experimental ppr, you should install latest version of canary, which means that run npm i next@canary.


    // const {select: editorPosts} = await client.fetch(PLAYLIST_BY_SLUG_QUERY, {slug: "editor-picks"});
    //destructuring select(i.e all the startups in that playlist,) and renaming select to editorPosts
    //now go below to the editor recommended startups section in the component.



    //Parallel Data Fetching:
    const [post, {select: editorPosts}] = await Promise.all([client.fetch(STARTUP_BY_ID_QUERY, {id}), client.fetch(PLAYLIST_BY_SLUG_QUERY, {slug: "best-pitches"}) ])//best pitches is our slug of the playlist that we made, rn we're only making one playlist.
    // concurrent fetches performed
    //two independent requests are being made concurrently.
    //you can also go and modify the shadcn components by going into the components/ui folder and see the css, and other cool properties.
    //now when deploying a large application such as this one, we might face some errors, mainly typescript, so we can disable those errors for build environment
    //head over to nextconfig.ts, and typescript: {
    // ignoreBuildErrors: true
    // }
    //similarly eslint: {
    // ignoreDuringBuild: true
    // }
    //we also gotta add the actual deployed url to our sanity project's cors origin for letting user's to interact with our backend and api.
    //through sanity.com->projects
    //THERE'S ALSO SOMETHING THAT WE NEED TO FIX, THE PLAYLISTS, SO RUN PROJECT ON LOCALHOST, GO TO STUDIO AND CREATE A NEW FIELD PLAYLISTS.
    //WE CAN NAME IT ANYTHING LIKE BEST PITCHES

    if(!post) return notFound();
    const parsedContent = md.render(post?.pitch || "")

  return (
    <>
    <section className="pink_container !min-h-[1px]">
      <p className="tag">{formatDate(post?._createdAt)}</p>
     <h1 className="heading text-3xl">{post.title}</h1>
     <p className="sub-heading !max-w-5xl ">{post.description}</p>
    </section>
    <section className="h-[20vh] w-[60vw] justify-self-center mt-1">
      {post.image ? (
        <div className="w-[80vw] h-[60vh] rounded-xl overflow-hidden">
          <Image src={post.image} alt="Thumbnail" width={1280} height={720} className='object-cover w-full h-full rounded-xl' />
        </div>
      ) : (
        <div className='w-[80vw] h-[60vh] rounded-xl bg-gray-100' />
      )}
      <div className="space-y-5 mt-10 max-w-4xl mx-auto">
        <div className="flex-between gap-1">
          <Link href={`/user/${post.author?._id}`} className='flex gap-2 items-center mb-3'>{/**Link to author details page. */}
          <div className="relative w-16 h-16 rounded-full overflow-hidden drop-shadow-lg drop-shadow-amber-600">
            {post.author?.image ? (
              <Image src={post.author.image} alt={post.author.name || 'Avatar'} fill className='object-cover' />
            ) : (
              <div className="w-full h-full bg-gray-200" />
            )}
          {/* nextjs has some problems specifically with the image tag, as it overrides some of your own styles so, it's better to render that image tag within a div and provide styling to that div
          now you can provide object-cover classname to that Image tag to make sure that image keeps the aspect ratio and fills the container(there are other properties like object-fit contain wrap nowrap overflow that you can learn about later somewhere)
          also, either you can provide height and width properties on the Image tag, to give custom height and width, i prefer to provide fill properties as it makes the 
          image tag's image fill the container containing it.
          also, giving width and height in vw and vh are better in most cases as they ALWAYS work, even if you don't wanna use them, you can try seeing what they do and then use what way you want to provide width and height manually
          like rem % px, n more.
          another thing, flex has defauld direction row-> so justify there makes content move (in main origin)left-right(horizontally), align moves content (in cross-origin)vertically(top-bottom)
          flex-col is exactly opposite as then the main and cross origins are swapped
          so justify still moves on main origin but main origin is (top-bottom)vertical now, similarly align moves on cross-origin which is horizontal now(left-right.)
          we can also provide how many elements we want in the main origin, like flex-row-4 so 4 elements per row only. */}
          </div>
          <div>
            <p className="text-20-medium">{post.author.name}</p>
            <p className="text-16-medium !text-black">@{post.author.username}</p>
            {/* in next commit we'll add category tag. */}
          </div>
        </Link>
            <p className="category-tag">{post.category}</p>
        </div>
        <h3 className="text-30-bold">Startup Details</h3>
        {/* we need to render ptich here below, and pitch comes in a markdown format, so we gotta parse it first, so we'll install an additional package for it.
        npm i markdown-it --force(if it poses a problem)
        npm install --save-dev @types/markdown-it(for installing types.)
        //and then import it here in this file, make a parsedContent variable and see what we're doing. above */}
        {parsedContent? (
          //break-all applies work-break property
          <article className='prose max-w-4xl font-work-sans break-all'
          // react normally escapes any html, to prevent xss attacks, cross side scripting attacks, rendering the content that displays text.
          //but when you want to insert raw html like the parsedMarkdown, we must use dangerouslySetInnerhtml to tell react that the content is safe and should be rendered as html
          dangerouslySetInnerHTML={{__html: parsedContent}}
          />
        ):
        (
          <p className="no-result">No details provided.</p>
        )
        }
      </div>
      <hr className="divider" />
      {/* Editor Recommended Startups */}
      {editorPosts?.length > 0 && (
        <div className="max-w-4xl mx-auto">
          <p className="text-30-semibold">
            Editor picks
          </p>
          <ul className="mt-7 card_grid-sm">
            {editorPosts.map((post: StartupCardType, index: number)=>(
              <StartupCard key={post._id || (post.slug && post.slug.current) || index} post={post} />
            ))}
          </ul>
            {/* NOW THIS WORKS FINE, but we have a little issue, and that is that we gotta be aware of two different data fetching patterns, parallel and sequential
            
            With sequential data fetching, requests in a route are dependent on each other and therefore create waterfalls. There may be cases where you want this pattern because one fetch depends on the result of the other, or you want a condition to be satisfied before the next fetch to save resources. However, this behavior can also be unintentional and lead to longer loading times.
            
            With parallel data fetching, requests in a route are eagerly initiated and will load data at the same time. This reduces client-server waterfalls and the total time it takes to load data.
            
            basically in sequential, one is happening after the previous one is finished, and in parallel, multiple go at once and some go sequentially.
            what we did just now was sequential. as we're first fetching the data about the post and only then we're fetching the editor posts.
            but the time to fetch the data will be increased as it will be the sum of both the requests, this is best if the second request depends on the first one.
            //REMEMBER: I'M TALKING ABOUT THE BOTH CLIENT.FETCH CALLS.
            BUT AS you know that these two fetches are completely independent, so we can take advantage of these mordern systems that are capable of handling multiple requests at the same time(concurrently)
            we do it like:
            const [result1, result2] = await Promise.all([url1, url2])
            //like this you can achieve parallel data fetching and you can pass as many arguments as you want. */}
        </div>
      )}

      {/* Everything we've rendered so far was static content, now time for ppr.
      now we'll develop a section of this same page which needs realtime updates, so it'll be completely dynamic
      when you wanna add a dynamic block, you need to wrap it within a <Suspense> tag comming from react. where we can also provide fallback in case we can not render something new, or to show something while that real content hasn't been fetched.
      so for that placeholder we'll use a Skeleton tag comming from shadcn, install it by npx shadcn@latest add skeleton */}
      
      <Suspense fallback={<Skeleton className='view-skeleton'/>}>
        {/* in here comes the code that'll be rendered dynamically, in components folder create a new file named view.tsx, see it and come back
        this view will basically show the live count of views that this startup has got. so this view will update in realtime */}
        <View id={id}/>
      </Suspense>
    </section>
    </>
  )
}

export default page