import Image from "next/image";
import SearchForm from "../../components/SearchForm";
import StartupCard from "@/components/StartupCard";
import { STARTUP_QUERY } from "@/sanity/lib/queries";
// import { client } from "@/sanity/lib/client";
import { StartupCardType } from "@/components/StartupCard";
import { sanityFetch, SanityLive} from "@/lib/live";

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

  return (
    <>
    <section className="pink_container pattern rounded-4xl px-6">
      {/* remember, in tailwind, we can not use one custom utility class within another custom utility class for ex: we have two custom utility classes pattern and pink_container so we can't put pattern inside pink_container in global.css as it would not be allowed.*/}
      <h1 className="heading ">Pitch Your Startup!!! <br /> Connect With Entrepreneurs</h1>
      {/* we use ! in tailwind when we wanna override some styles that were previously provided to this element.
      font-medium low n many more decide the thickness of the form. */}
      <p className="sub-heading !max-w-3xl ">Submit Ideas, Vote on pitches and get noticed in Virtual Competitions</p>
      {/* now let's create another component called SearchForm.tsx. */}
      <SearchForm query={query}></SearchForm>
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
          posts.map((post: StartupCardType, index: number)=>(
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