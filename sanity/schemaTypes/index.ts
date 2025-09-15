import { type SchemaTypeDefinition } from 'sanity'
import { author } from './author'
import { startup } from './startup'
// for the schema we firstly need how our data would look like, so there's a Screenshot1.png that shows the data model used in the app, and
// Screenshot 2 shows the whole workflow of the app.
//both of them are in the Idea_app folder,
//now we'll create a schema for author, in schemaTypes folder.
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, startup],//here we're using the author schemaType that we just created.(we may also use other schemas like for posts and playlists.)
  //now the next thing is that we need to structure this schema in structure.ts
}
