import "server-only";
import { defineLive } from "next-sanity";
import { client } from "@/sanity/lib/client";


export const {sanityFetch, SanityLive} = defineLive({client})
//now go to local env. and add the sanity api version = vX as we're using the latest features.
//now just go back to the homepage and instead of fetching the posts through client.fetch.
//we'll fetch it through that sanityFetch function that we're exporting here.
