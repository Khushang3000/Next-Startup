//yk this is the details page, and for different startups there's gonna be different content, so we'll just sort startup's details page with that [id] that we get here through params
//if you see the startup card's details section you'll realise that that details leads you to this page.
import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react'

export const experimental_ppr = true;//now we can use sanity's client api to perform isr(incremental site regeneration) to get startup details
//we can do that by fetching the post based on the provided id. see in page function below, the posts variable.

const page = async ({params}:{params: Promise<{id: string}>}) => {
    const id = (await params).id; //btw this id will be a hashed or encrypted string not plain n.o
    //now we can take this id and fetch all of the details about that startup. 

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
    const post = await client.fetch(STARTUP_BY_ID_QUERY, {id})//here id is sent through params.
    if(!post){
      return notFound();//from next/navigation
    }
    //now if all checks are passed, then we can render something like posts.title below in the component
  return (
    <>
    <section className="pink_container !min-h-[1px]">
      <p className="tag">{formatDate(post?._createdAt)}</p>
     <h1 className="heading text-3xl">{post.title}</h1>
     <p className="sub-heading !max-w-5xl ">{post.description}</p>
    </section>
    <section className="h-[20vh] w-[60vw] justify-self-center mt-1">
      <img src={post.image} alt="Thumbnail" className='w-[80vw] h-[60vh] rounded-xl' />
      <div className="space-y-5 mt-10 max-w-4xl mx-auto">
        <div className="flex-between gap-1">
          <Link href={`/user/${post.author?._id}`} className='flex gap-2 items-center mb-3'>{/**Link to author details page. */}
          <div className="relative w-16 h-16 rounded-full overflow-hidden drop-shadow-lg drop-shadow-amber-600">
          <Image src={post.author.image} alt="Avatar" fill className='object-cover' />
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
        </div>
      </div>
    </section>
    </>
  )
}

export default page