import { defineQuery } from "next-sanity";


// order(_createdAt desc)    //defines the order in which the startups would be sorted, and desc means descending.

export const STARTUP_QUERY = defineQuery(`
    *[_type == "startup" && defined(slug.current)] | order(_createdAt desc)
    {
        _id,
        title,
        slug, 
        _createdAt,
        author -> {_id, name, image, bio, },    //what properties we want from author.
        views,
        description,
        category,
        image
    }`)
//TO fetch this, go to page.tsx (home)
//and import this startup_query there.
//use await to fetch and store the value in posts!!!!!!!!!