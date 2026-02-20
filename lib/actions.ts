"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "./utils";
import slugify from "slugify"
import { writeClient } from "@/sanity/lib/write-client";

export const create_pitch = async (state: { error?: string; status?: string }, form: FormData, pitch: string, )=>{
//we also need to get the info about the user who's submitting it
    const session = await auth()//through this we can get the info about the active user.

    // if(!session) return {error: "Not Signed-In", status: "ERROR"}
    //now we can't just pass the object like this, instead we gotta wrap it like JSON.parse(JSON.stringify({error: "Not Signed-In", status: "ERROR"}))
    //just so we don't do this everytime, let's create a function in utility file to access it everywhere.
    //utils.ts
    if(!session) return parseServerActionResponse({error: "NOT SIGNED-IN", status: "ERROR"});



        // Array.from(formData); //Array.from(form) turns it into an array of key-value pairs.
// [
//   ["title", "My project"],
//   ["description", "Cool project"],
//   ["category", "Tech"],
//   ["link", "https://example.com"],
//   ["pitch", "Extra field"]
// ]

//.filter
// This filters out the entry where the key is "pitch".
//i.e removes the entry where key is pitch.
// [
//   ["title", "My project"],
//   ["description", "Cool project"],
//   ["category", "Tech"],
//   ["link", "https://example.com"]
// ]


// Object.fromEntries(...)

// Converts the filtered key-value pairs back into a plain object.

// Result:

// {
//   title: "My project",
//   description: "Cool project",
//   category: "Tech",
//   link: "https://example.com"
// }
    const {title, description, category, link} = Object.fromEntries(
        Array.from(form).filter(([key])=>key !== 'pitch')
    )
    //now we also need a slug, it's just a unique identifer for that startup, you can generate it randomly but we have a package called slugify
    //npm i slugify. it'll just create a meaningful slug for each post. (--legacy-peer-deps)

    const slug = slugify(title as string, {lower: true, strict: true});

    //now that we have all our data lets run a try and catch.
    try {
        const startup = {
            title,
            description,
            category,
            image: link,
            slug:{
                _type: slug,
                current: slug
            },
            author: {
                _type: 'reference',
                _ref: session?.id,
            },
            pitch //markdown content.
        }

        //now we can write to sanityclient to create the author.
        const result = await writeClient.create({//if you ctrl+click on this create function, it'll take you to a ts page. there you can see that this function returns a Promise<SanityDocument<R>>
            // create<R extends Record<string, Any> = Record<string, Any>>(
            //     document: SanityDocumentStub<R>,
            //     options?: BaseMutationOptions,
            //   ): Promise<SanityDocument<R>>
            //it'll be like this, now when you ctrl+click on this sanityDocument, you will see what all values are there, and you'll see that it returns an _id not id.
            //

            _type: 'startup',
            ...startup //simply spreading out all of the startup's values.
        })

        return parseServerActionResponse({
            ...result,
            error: '',
            status: "SUCCESS"

        })
    } catch (error) {
        if (process.env.NODE_ENV === 'development') console.error(error)
        return parseServerActionResponse({error: JSON.stringify(error), status:"ERROR"})
    }

}//now just go back to the startup form and use this create_pitch.