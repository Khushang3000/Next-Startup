import { defineQuery } from "next-sanity";


// order(_createdAt desc)    //defines the order in which the startups would be sorted, and desc means descending.

export const STARTUP_QUERY = defineQuery(
    //now this query will do:
    //!defined($search) is true only when you did not pass $search (i.e., $search is undefined or not provided).
    //so basically we have 3 &&, so 
    // _type == "startup" → must be true for the document.
    // defined(slug.current) → must be true.
    // !defined($search) → must also be true.   
    //and the rest || 
    //well we know that || returns the first truthy value, so that's how this( !defined($search) || title match search || category match $search || author->name match search] | order(_createdAt desc))
    //part of the code works for us.
    //and && returns the last falsy value     

    //also there's one more thing, if you click on the category of the startup, then that category will end up in the search box, as well as the url, so you'll see all the startupcards that are of that category.
    //now next thing is creating a form through which users will create the post.but before that we'll make a startup details page, through partial re-rendering.
    //so before that we must understand partial re-rendering.
    `
    *[_type == "startup" && defined(slug.current) && !defined($search) || title match search || category match $search || author->name match search] | order(_createdAt desc)
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