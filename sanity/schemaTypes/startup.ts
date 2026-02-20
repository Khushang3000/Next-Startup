import { defineField, defineType } from "sanity";

export const startup = defineType({
    name: "startup",
    title: "Startup",
    type: "document",
    //in this case we won't need the icon.
    fields: [
        defineField({
            name: "title",
            type: "string"
        }),
        defineField({
            //slug is a url friendly version of some text:
            //ex: normal text->"10 Tips for Learning JavaScript Fast!"
            //slug:->10-tips-for-learning-javascript-fast

            name: "slug",
            type: "slug",
            options: {
                source: "title"//source of this slug will come from the title, so it'll actually be auto-generated for us by sanity based on the title.
            }
        }),
        defineField({
            name: "views",
            type: "number"
        }),defineField({//REFERRING TO THE TYPE AUTHOR THAT WE IMPORTED.
            name: "author",
            type: "reference",
            to: {type: "author"}
        }),defineField({
            name: "description",
            type: "text"
        }),defineField({
            name: "image",
            type: "url",
            validation: (Rule)=>Rule.required(),
        }),
        defineField({
            name: "category",
            type: "string",
            validation: (Rule)=>Rule.min(1).max(20).required().error("Please enter a category"),//it basically means that category will be of type string and that string will have a min length of 1 and max length of 20, and will be required
            //if it isn't passed then we'll throw the error "Please enter a category"
        }),
        defineField({
            name: "pitch",
            type: "markdown"//install this sanity plugin with:
            // npm i sanity-plugin-markdown
            //now we have to go to sanityconfig.ts and add this plugin
        })
    ]
})//now add this startup in index.ts, and in structure.ts

//if we want a nested type like maybe inside startup we want the author of the startup to go (IN CASE WE DON'T HAVE AN AUTHOR TYPE!!!), 
//in the fields of that startup's defineType, we could add something like this.
//defineField({
// name: "author"
// type: defineType({
// name: "author",
// title: "Author",
// type: "document",
// icon: "If you want to give",
// fields: [
// defineField({
// name: "author_name",
// type: "string"})]})})

//also there's another way, if we want to perform nesting then we can use the object type