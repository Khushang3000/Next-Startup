import type {StructureResolver} from 'sanity/structure'
import { author } from './schemaTypes/author'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem("author").title("Author"),
      //that's how we structure a schema.
      //now we might as well create a startup schema as well.

      //here we add the startup as well
      S.documentTypeListItem("startup").title("Startup")
    ])
