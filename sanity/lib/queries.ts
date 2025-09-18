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
    //so let's make a new folder within the app's (root) folder name it startup,
    //an then make another dynamic route [id] and within it create a page.tsx
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
    }`)//here we could've fetched the pitch btw but we didn't need it as it is needed for one particular startup's details page.
//TO fetch this, go to page.tsx (home)
//and import this startup_query there.
//use await to fetch and store the value in posts!!!!!!!!!


//new query to get a startup by query.
export const STARTUP_BY_ID_QUERY = defineQuery(
    `
    *[_type == "startup" && _id == $id][0]
    {
        _id,
        title,
        slug, 
        _createdAt,
        author -> {_id, name, image, bio, username },    //what properties we want from author.
        views,
        description,
        category,
        image,
        pitch
    }
    `
)//now let's go to the startup details page and use this query, oh and btw we can use live Content api of sanity here but we choose not to
//cuz user's not gonna be on startup details page and wait for the page to change in real time
//we can use multiple rendering strategies on the same page and one of which is partial pre-rendering strategy(you can read it in nextjs docs)
//ppr strategy allows you to combine static and dynamic components in the same route(page)
//during the build nextjs prerenders as much of the route as possible and only if dynamic code is detected like reading from the incomming request you can wrap the relevant component with 
//React Suspense boundary
//this suspense boundary fallback will be prerendered in the prerendered html. see screenshot 5 for reference(revalidated means refreshes at some intervals like we did with 60sec)
//it also improves seo as well. watch 11min video by delba that explains prerendering on yt.
//see screenshots 6 and 7 for real life example, that's what makes you a great developer
//notice how product info is static as it doesn't need to be realtime.

//now we'll see how to add that to our app. go to next config.ts


//query for views, $id is the id we get through params., now let's make a req to this query in View.tsx
export const STARTUP_VIEWS_QUERY = defineQuery(`
    *[_type == "startup" && _id == $id][0]{
    _id, views
    }
    `)