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
  
  //now we'll start adding content there.

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
  ],
})
