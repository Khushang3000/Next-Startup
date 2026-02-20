// Image not used in this file
import SearchForm from "../../components/SearchForm";
import StartupCard from "@/components/StartupCard";
import { STARTUP_QUERY } from "@/sanity/lib/queries";
// import { client } from "@/sanity/lib/client";
import { StartupCardType } from "@/components/StartupCard";
import { sanityFetch, SanityLive} from "@/lib/live";
import { auth } from "../../auth";

export default async function Home({searchParams}:{searchParams: Promise<{query: string}>}) {
  const query = (await searchParams).query; //now that we have the query, we can pass it into the searchForm as a prop.

  const params = {search: query || null}//now we'll pass this params into our sanityFetch function.
  
  const {data: posts}=await sanityFetch({query: STARTUP_QUERY, params})//this is how we'll fetch now, from the liveContent api of sanity.
  //now go into the startup query and modify it in such a way that if there is a search then it should return the matching search otherwise it should return everything in the descending order.


  //this will make sure to revalidate this page whenever new changes are made.
  //oh and btw here we're destructuring the data and renaming it to posts.
  //But you'll notice that we're still not using the SanityLive variable, well it's not a variable but a component(self closing tag)
  //that you will render at the bottom of this page(see the return statement of this Home function)
  //now when you add a new document through the studio, you'll see that document getting added to the page live!!!
  //and it'll show up as the first one on the list, because we made the order-desc(descending) in the startup query
  // and they were being sorted on the basis of _createdAt.

  //now let's also implement the realtime search.
  //so when you type something in the search box, it actually modifies the url,
  //so first we need to retrieve that query within our application. and then further filter the fetch that we're trying to make
  //we can do that thing by creating a new variable called params, see below the query declaration.



  // const posts = await client.fetch(STARTUP_QUERY);// this client is the client that created the sanity project.
  // console.log(JSON.stringify(posts, null, 2));//null and 2 just create some additional spacing.
  //so basically now in your ui, you'll see real data that's being fetched from sanity's database.
  //soon enough we'll also create a create post page for the users as we don't want them to go to sanity vision and create things there.
  //now the thing that's been bugging the most, StartupCardType, we can define types manually but we should know everything like which properties are optional, which are not
  //instead we'll use sanity's own tool generates types manually
  //sanity typegen - you can go to docs and read about it as well. there's also a video there which tells you how to exactly create types.
  //1step is to extract the schemas we have already created(startup and author)
  //to extract them we gotta run an additional command npx sanity@latest schema extract --path=./sanity/extract.json
  // and they'll extract it to extract.json file.
  //2step is to create a new file in the root of our app(inside next-startup folder) called sanity-typegen.json
  //there you can add one configuration object, you can copy it from sanity learn(google.)
  //that configuration will scan the application for all groqq queries to create types, additionally it'll also use the extract.json from the prev command we ran, and it'll write a new types.ts file with our other utilities
  //and DO MAKE SURE THAT THE PATHS THERE ARE CORRECT ACCORDING TO YOUR APPLICATION.
  //(go there and see for yourself)
  //then just run the command npx sanity@latest typegen generate
  //now when we add more queries or generate more types, we'll have to re-run this command.
  //OFC IF WE DON'T AUTOMATE IT, WHICH WE WILL.
  //go to package.json, scripts and add a few new scripts(you can get those scripts from the sanity learn(google))
    // "predev": "npm run typegen",
    // "prebuild": "npm run typegen",
    // "typegen": "sanity schema extract --path=./sanity/extract.json && sanity typegen generate"
  //now just run npm run typegen
  //now just run that command when you want to generate new types.
  //finally let's define the type for the startup card.
  //to do that go to the startupcard.tsx 



  // const posts = [{
  //   _createdAt: new Date(),//previously we were using "yesterday" normal string.
  //   views: 55,
  //   author: {_id:1, name:"John"}, //i hope yk what _id means(we're using mongodb database. and there will be two models, author and post)
  //   _id:1,
  //   description: "This is a Description",
  //   image: 'https://www.newegg.com/quantic-dream-s-a-detroit-become-human-pc/p/N82E16832344003',
  //   category: "Robots",
  //   title: "We Robots"
  // },
  // {
  //     _createdAt: new Date(),//previously we were using "yesterday" normal string.
  //     views: 55,
  //     author: {_id:2,name:"Alice"}, //i hope yk what _id means(we're using mongodb database. and there will be two models, author and post)
  //     _id:2,
  //     description: "This is a Description",
  //     image: 'https://www.newegg.com/quantic-dream-s-a-detroit-become-human-pc/p/N82E16832344003',
  //     category: "Robots",
  //     title: "Clothing Startup"
  //   }]


  // #################################################################################################
  //getting session
    const session = await auth();
    // console.log(session.id)// if you try to use this now, then ts will give you an error that session is possibly null
    //to fix that we can create a typescript declaration file within our Next-startup folder. next-auth.d.ts see it and come back.
    if (process.env.NODE_ENV === 'development') console.log(session?.id);
    //but then you'd get errors in auth.ts as then your declarations would've overridden the SESSION AND JWT so then you'd get errors there,
    // so the best thing is to just put a session? rather than directly doing session.
    //rn you might not see the id's value, as when we were implementing this functionality we were left logged in so, to fix that logout and then login again.
    //so just logout and then login again.
    //now when you login one more time you'll get another error(Server error. problem with server configuration and if you look at console you'll see error comming from auth and it'd say can't read properties of null(reading: '_id'))
    //so go to auth.ts and add a ? on user.id like user?._id, while assigning user's id to token. to indicate that sometimes user just might not be there.
    //but why would it not be there?
    //we do have the account and profile, then why?(keep looking in auth.ts if condition is there which checks account and profile)
    //let's check the github_id_query then, on inspecting it, it looks good to me.
    //so let's give it another shot, but before we do, we must make sure that the author hasn't been already generated. or if it has then you'd have to clear it using the sanity studio.

    // remember there's two types of seesions here, our app's sesssion which clears when the user logs out, but the github's session isn't cleared until that user logs out from github
    //now if we went with the custom credentials thing here, and the user logged out once, then he'd have to put his info again to log in again.(OH AND BTW SEE KHUSHANG FROM THE FUTURE IN AUTH.TS WHILE CREATING CLIENT.)
    //now if we log in again and visit the sanity studio, author, we can see all the fields automatically get populated like id, bio(if there is any) and many more.    
    //now if we check session?.id's value, it's still undefined.
    //we create a user on signIn and that user indeed gets created in db, but when we try to read that session.id value within jwt it returns undefined even tho the user has been created successfully in sanity studio.
    //this issue is rooted behind how sanity or more specifically nextjs works behind the scenes. 
    //Specifically their caching mechanisms.

    //when we first created a new user, after confirming that the user doesn't already exist, sanity successfully added the user. however when we immediately tried to retrieve that user
    //within 60sec of creation, the query didn't return any results(undefined) this is because the read query was made too soon after the user creation and sanity and nextjs cache weren't updated yet.
    //this is a common challenge when working with frameworks and libraries while caching data.
    //so let's fix that cache. updation, (just useCdn: false) to BOTH signIn and Jwt callbacks. so it'll be like client.withConfig({useCdn: false}).fetch(Query, {params})
    //like that. go have a look and come back.
    //now go back to sanity studio delete the existing user, logout and then login fresh as a new user, you WILL SEE THE SESSION.ID ON CONSOLE instantly
    //also before you login, make sure to clear cache and cookies. you can do that by inspect->application->cookies and cache, clear them.
    //now next thing we'll do is provide the user with a form to create a startup without going to the sanity studio.

    //create a new route app/root/startup/create/page.tsx go there.

  return (
    <>
    <section className="pink_container pattern rounded-4xl px-6">
      {/* remember, in tailwind, we can not use one custom utility class within another custom utility class for ex: we have two custom utility classes pattern and pink_container so we can't put pattern inside pink_container in global.css as it would not be allowed.*/}
      <h1 className="heading ">Pitch Your Startup!!! <br /> Connect With Entrepreneurs</h1>
      {/* we use ! in tailwind when we wanna override some styles that were previously provided to this element.
      font-medium low n many more decide the thickness of the form. */}
      <p className="sub-heading !max-w-3xl ">Submit Ideas, Vote on pitches and get noticed in Virtual Competitions</p>
      {/* now let's create another component called SearchForm.tsx. */}
      <SearchForm query={query} />
      {/* now go to searchForm and accept this query as a prop. 
      */}

      {/* AND NOW WE GOTTA MAKE THE SECTION WHERE ALL THE SECTIONS SHOW UP.
        SO WE'LL BUILD A SECTION, WHICH CONTAINS A LIST OF ALL THE STARTUPS, WE'LL CREATE A STARTUP CARD, AND THE REST WILL JUST SIMPLY FOLLOW.
        SO LET'S DO IT BELOW. THIS HERO SECTION*/}
    </section>
    <section className="section_container">
      <p className="text-30-semibold">
        {query? `Search results for ${query}`:"All Startups"}
      </p>
        <ul className="mt-7 card_grid">
          {/* To see all occurences of something, just select it, then ctrl+shift+f  to see them. here we want to see the card_grid, 
          here in this ul, we'll map over the posts, later on we'll directly fetch those posts from sanity.
          but for the time being we'll just make a local array posts. */}
          {posts?.length>0 ?
          posts.map((post: StartupCardType)=>(
            //using index as the key is usually not a good practice, so we'll just use post?._id, and we'll pass the post itself as a prop as well. so go there and accept it.
            <StartupCard key={post?._id} post={post}/>
          )):
          <p className="no-results">No Results Found</p>
          }
        </ul>
    </section>
    <SanityLive />
    </>
  );
}
//Now we'll use sanity, but what is sanity?
// Sanity is a headless CMS (content management system).
// Headless = it doesn’t control your frontend (UI), only the content.
// You get a hosted backend + APIs + an admin dashboard (Sanity Studio) where you or non-devs can manage content (posts, products, categories, users, etc.).

//it goes well with nextjs, and you can hand it to your clients for whom you're building the app, and they handle the content.
//in sanity, we can build a whole operating system around the content, you'll have a content workspace/studio for your application that you can hand over to your client, so they can manage it as well
//and that studio is built on top of powerful apis that allow you to customize the way you create and manage your content, and they even store it for ya.

//by integrating and deploying sanity with vercel, we can achieve excellent performance metrics, and following features:
//merged changes instantly go live on their global edge network
//SSL encryption, asset compression, and cache invalidation are also provided
//we'll go for the free plan. go on the sanity home page, click start building, signIn.
//create a project.
//make sure to create a clean project where you aren't importing any schema from somewhere else.

// create a new studio with sanity cli:
// npm create sanity@latest -- --project xr24oz99 --dataset production --template clean --typescript --output-path studio-next_startup
//add config files in the nextjs folder.
//embed sanity studio
//add projectid and dataset to env.local

//install the latest version of sanity, to use the live api feature they offer.
//npm i next-sanity@canary

// now you'll see there have been multiple files and folder generated for us.
//lets see the sanity cli.ts, next let's see sanityconfig.ts
// cd studio-next_startup