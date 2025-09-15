'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\app\studio\[[...tool]]\page.tsx` route
 */

// #####################################################
//npm i @sanity/vision, run this if the below line gives error, the sanity setup might not have installed vision, so run the command and then re-open vs code.
import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './sanity/env'
import {schema} from './sanity/schemaTypes'
import {structure} from './sanity/structure'
import {markdownSchema} from "sanity-plugin-markdown";

export default defineConfig({
  // ######################################################
  //we also have our config, which POINTS to the base path of the studio, so we should be able to explore this route at localhost:3000/studio
  //it'll ask you to login(you need to use the same email and password/provider account that you used initially), and that's how only the person that was authorized from sanity will be able to open the studio!!!
  //  //earlier sanity didn't work with turbopack, but now it does, so make sure you're using the uptodate version, and also see the error page on the url http://3000/studio to 
  //  //see the error more clearly.

  //Now you'll be able to visit the studio but you won't be able to see any thing, as we selected to start from scratch.
  //before we add some content there, we'll go to sanity.cli.ts, read line 7-8 and come back.
  //now sanity.config.ts, this is a simple config file used by sanity studio, where we set a base path, connect it to a specific projectId, dataset, schema and add specific plugins
  //now next we have some more important files in the sanity folder, specifically we'll go into sanity/lib and then client.ts(go)
  //now we have a sanity/lib/image.ts:
  //THIS is simply an imageUrl builder for images uploaded on sanity studio, so we can use them on the frontend side.
  //we won't need it as we'll use a markdown plugin instead, so we can remove that file.
  //next we have sanity schema types, rn with empty types, later we'll create our own sanity schema and upload them so our entire application knows what kinds of fields our each startup or document has.
  //next we have env.ts in lib folder where we list all the env's that we need for our application.
  //and finally there's the structure, where we decide how to arrange our schemas like do you want to group them? add specific schemas on the top or others on the bottom
  //now you might ask how does the sanity studio get rendered within our app, well there's a studio folder within our app folder.
  //they have a studio page right there where they show the studio.
  //so we have successfully setup sanity.



  // Why Sanity tho?
  // Sanity (the platform) and Sanity Studio (the admin panel) are basically a database + API + content dashboard bundled together.
// 1. Sanity (backend)
// Stores your structured data (startups, users, posts, images, categories, etc.).
// Gives you an API for free → you can query your content from anywhere (Next.js, React, mobile apps).
// API is flexible with GROQ (their query language) and also supports GraphQL.
// So instead of building your own backend + database + API, you just say:
// *[_type == "startup"]{title, category, author->{name}, views}

// and Sanity sends you JSON like:
// [
//   {
//     "title": "AI Startup",
//     "category": "AI",
//     "author": { "name": "John Doe" },
//     "views": 134
//   }
// ]

// 2. Sanity Studio (frontend dashboard)
// A React-based CMS UI for editing your content.
// You (or non-technical teammates) can log in, add a new startup, upload an image, change categories, etc.
// No need to write SQL queries or JSON manually.
// So you get a ready-made CMS panel connected directly to your API.

// For Ex: 
//rn our startup card needs title description author and many more, instead of hardcoding them in our code, we can store them in sanity.

// it basically gives me the list of all startups, and we just need to define the schema.
  //now we'll start adding content and Firstly defining the Schema.(in schemaTypes folder inside the sanity folder.(index.ts))

  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({structure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),

    //markdownSchema plugin
    markdownSchema()//for this to work we also have to go to the first file that we worked on(layout.tsx)
    //4th line's import easymde. and come back.
    //we're doing this cuz this requires additional plugin.
    //now when we go to the localhost:3000/studio, you no longer see an empty slate, but we should be able to create a few startups directly from the studio dashboard.
    //you can create your own author now, select the author, click the + icon, then you'll get the ui to create the user.
    //yes we're still adding dummy data, but soon we'll connect sanity's database from our application using their api!
    //try creating startup and author as well.

    //for email any email would work for now, and for image just copy some image's address from google, similarly for startup
    //now you can just publish both of them, and you'll see your created author in the authors array, and startup in the startup array.
    //when you create the startup, you'll actually get to select the authors, as we referenced the authors array/document in the startups.

    //now since we created one author and one startup, the next thing is how do we see them in our app's frontend.
    //also the next thing we'll do is we'll actually fetch a real card generated by a real user in the sanity studio.
    //also we'll create a create page for users so they don't have to go to sanity studio, instead they could just create it themselves through the ui that we will provide.
    //we'll do that in the next commit
  ],
})
