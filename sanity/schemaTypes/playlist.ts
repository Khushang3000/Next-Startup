import { defineField, defineType } from "sanity";

export const playlist = defineType({
    name: "playlist",//add this in index.ts as well.
    title: "Playlists",
    type: "document",
    
    fields: [
        defineField({
            name: "title",
            type: "string"
        }),
        defineField({
            name: "slug",
            type: "slug",
            options: {
                source: "title"
            }
        }),
        defineField({
            name: "select",
            type: "array",
            of: [{type: "reference", to: [{type: "startup"}]}]//this means that each playlist has multiple startups,(in array)
        })
    ]//now if you go to the studio and create a new playlist you'll see that you can simply just select the startup from the list of startups that your app has.
    //now we gotta write a query that fetches a startup from the slug. go to startup details and use that query. the reason we're doing this there is because there's a special feature there.
    //go to the editorPicks line.



})