import Image from "next/image";
import SearchForm from "../../components/SearchForm";
import StartupCard from "@/components/StartupCard";

export default async function Home({searchParams}:{searchParams: Promise<{query: string}>}) {
  const query = (await searchParams).query; //now that we have the query, we can pass it into the searchForm as a prop.
  
  
  const posts = [{
    _createdAt: new Date(),//previously we were using "yesterday" normal string.
    views: 55,
    author: {_id:1, name:"John"}, //i hope yk what _id means(we're using mongodb database. and there will be two models, author and post)
    _id:1,
    description: "This is a Description",
    image: 'https://www.newegg.com/quantic-dream-s-a-detroit-become-human-pc/p/N82E16832344003',
    category: "Robots",
    title: "We Robots"
  },
{
    _createdAt: new Date(),//previously we were using "yesterday" normal string.
    views: 55,
    author: {_id:2,name:"Alice"}, //i hope yk what _id means(we're using mongodb database. and there will be two models, author and post)
    _id:2,
    description: "This is a Description",
    image: 'https://www.newegg.com/quantic-dream-s-a-detroit-become-human-pc/p/N82E16832344003',
    category: "Robots",
    title: "Clothing Startup"
  }]

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