import { UserIcon } from "lucide-react";
import { defineField, defineType } from "sanity";


//So, we're following this kinda structure document->field->value


//         | Concept in SQL               | Equivalent in MongoDB         | Explanation                                                                                                  |
// | ---------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------ |
// | **Database**                 | **Database**                  | Both systems have databases that group related data.                                                         |
// | **Table**                    | **Collection**                | In SQL, data is stored in tables; in MongoDB, data is stored in collections.                                 |
// | **Row (Record)**             | **Document**                  | Each row in SQL corresponds to a single document in MongoDB.                                                 |
// | **Column (Field/Attribute)** | **Field**                     | Each column in SQL corresponds to a field (key-value pair) inside a MongoDB document.                        |
// | **Schema**                   | **Dynamic Schema (Flexible)** | SQL tables enforce a fixed schema; MongoDB allows documents in the same collection to have different fields. |
//This is basically our user document and we'll also have other documents like startups, and playlist.

export const author = defineType({
    //this is a schema type, author.
    name: "author",//name of this schema is author
    title: "Author",//title
    type: "document",//type of this schema is document(following nosql approach, document, fields, properties.)
    icon: UserIcon,//icon
    //fields are basically the properties that this document schema author has where the values go.
    fields: [//we'll get all of these fields below from github Oauth.
    
        defineField({
            name: "id",
            type: "number"
        }),defineField({
            name: "name",
            type: "string"
        }),defineField({
            name: "username",
            type: "string"
        }),defineField({
            name: "image",
            type: "url"
        }),defineField({
            name: "bio",
            type: "text"
        }),defineField({
            name: "email",
            type: "string",
        }),
        ],
    preview: {
        select: {
            title: "name"//THIS WILL ALLOW US TO SELECT THOSE AUTHORS BY NAME AND PREVIEW THEM
        }
    }
})//we're already exporting this author type so all we gotta do now is use it. go to index.ts of schemaTypes.