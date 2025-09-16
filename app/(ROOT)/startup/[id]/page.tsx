//yk this is the details page, and for different startups there's gonna be different content, so we'll just sort startup's details page with that [id] that we get here through params
//if you see the startup card's details section you'll realise that that details leads you to this page.
import { client } from '@/sanity/lib/client';
import { STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
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
    <h1 className="text-3xl">{post.title}</h1>
    </>
  )
}

export default page