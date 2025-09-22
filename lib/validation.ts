import {maxLength, minLength, z} from "zod"
//npm i zod --legacy-peer-deps

export const formSchema = z.object({
    title: z.string().min(3).max(100),
    description: z.string().min(20).max(500),
    category: z.string().min(3).max(20),
    link: z.url({error: "Please enter a valid url"}),
    pitch: z.string().min(10) //no need to provide max as there's no limitations here., now go to handleFormSubmit on startup form

})

//SINCE THE FORM IS ON CLIENT COMPONENT, WE CAN'T DIRECTLY VALIDATE THE IMAGE LINK IF IT IS VALID OR NOT, BY FETCHING THAT URL AND CHECKING IT LIKE BELOW,
//AS IT IS THE CLIENT COMPONENT, WE CAN ONLY MAKE CLIENT CHECKS, LIKE IF IT IS A URL OR NOT, AND OTHERS THAT WE'RE DOING ABOVE,
//BUT IF WE NEED TO DO THIS FETCH THING BELOW TO SEE IF THE LINK IS ACTUALLY REAL, TEHN WE USE FETCH, AND IN CLIENT COMPONENT, THAT CLIENT'S BROWSER WILL SEND A FETCH REQUEST,
//AND IF THAT URL DOESN'T ALLOW FOR REQUESTS FROM YOUR DOMAIN, THEN WE WILL GET A CORS ERROR.

//EXTEND THIS CLIENT SIDE FORMSCHEMA, AND USE THAT EXTENDED CLIENT SIDE FORM SCHEMA ONLY ON SERVER COMPONENT.
// export const formSchema = z.object({
//     title: z.string().min(3).max(100),
//     description: z.string().min(20).max(500),
//     category: z.string().min(3).max(20),
//     link: z.url({error: "Please enter a valid url"}),
//     pitch: z.string().min(10) //no need to provide max as there's no limitations here., now go to handleFormSubmit on startup form
// })



//USE THIS FORM SCHEMA ONLY ON SERVER COMPONENTS LIKE BELOW.
// server-side schema: includes the HEAD check (runs on the server)
// export const serverFormSchema = formSchema.extend({
//   link: z.string().url().refine(async (url) => {
//     try {
//       const res = await fetch(url, { method: "HEAD" });
//       const contentType = res.headers.get("content-type");
//       return contentType?.startsWith("image/");
//     } catch {
//       return false;
//     }
//   }, { message: "Link must point to an image" }),
// });


//THIS IS A SERVER COMPONENT
//USE THAT LINK VALIDATION ONLY ON THE SERVER COMPONENT
// import { NextResponse } from "next/server";
// import { serverFormSchema } from "@/lib/validation";
// import { z } from "zod";

// export async function POST(req: Request) {
//   const body = await req.json();

//   try {
//     const data = await serverFormSchema.parseAsync(body);
//     // TODO: persist to DB, etc.
//     return NextResponse.json({ success: true, data }, { status: 201 });
//   } catch (err) {
//     if (err instanceof z.ZodError) {
//       const flattened = err.flatten();
//       return NextResponse.json({
//         success: false,
//         errors: flattened.fieldErrors,
//         formErrors: flattened.formErrors
//       }, { status: 400 });
//     }
//     return NextResponse.json({ success: false, message: "Internal error" }, { status: 500 });
//   }
// }

//BASICALLY HERE'S WHAT I'M PROPOSING AT BEST, AS CLIENT COMPONENTS(USER'S BROWSER) CAN'T MAKE FETCH REQUESTS TO ONLINE LINKS AS THERE'S A CORS PROBLEM ON MOST OF THEM, IN OUR CASE THE IMAGEURL.
//WE CAN DO THIS.
// i could make an async function which validates the form data in a server component, and use that function to do conditional rendering based on what it returns, false-render form submission failed please enter valid imageUrl,
// if it returns true then say form submitted successfully and redirect user to the destination page? Now i won't have a cors problem as my client component is just fetching
// ...well not even fetching really but just waiting for a function in which a fetch runs which initially caused the cors problem on client component as we were running that fetch directly on client component

// Exactly — you’re on the right track. Let me break it down clearly:
// 1️⃣ What you’re proposing
// Make an async server function that does the validation (including any fetches you need).
// From the client component, call this server function (via Server Actions or some API route).
// Render UI conditionally based on the result:
// - returns true → success, redirect
// - returns false → show “invalid image” message, keep form open
// ✅ Advantages:
// No CORS problem
// All fetches happen inside the server function, so browser CORS restrictions don’t apply.
// Client only waits for the server to return a result.
// No full-page reload
// You can conditionally render messages in the same client component.
// User doesn’t lose other input values.
// Server-side validation stays secure
// You never expose API keys or secrets to the client.
// 2️⃣ How it looks conceptually
// Server function (inside a server component or a separate module):
// export async function validateForm(data) {
//   const imageUrl = data.get("image"); 
//   // server-side fetch to validate image
//   const res = await fetch(imageUrl);
//   if (!res.ok) return false;
//   return true;
// }
// Client component:
// "use client";
// import { useState } from "react";
// import { validateForm } from "../server/validation"; // server function
// export default function Form() {
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const valid = await validateForm(formData);
//     if (!valid) {
//       setError("Invalid image URL");
//       return;
//     }
//     setSuccess(true);
//     window.location.href = "/success"; // redirect
//   };
//   return (
//     <form onSubmit={handleSubmit}>
//       {error && <p className="text-red-500">{error}</p>}
//       {success && <p className="text-green-500">Form submitted successfully!</p>}
//       <input type="text" name="image" placeholder="Image URL" />
//       <button type="submit">Submit</button>
//     </form>
//   );
// }
// 3️⃣ Key points
// Server function is the only place doing fetch → no CORS in browser.
// Client component handles UI + redirect → user sees messages immediately.
// You can even extend it to partial validation for other fields easily.
// If you want, I can write a fully working Next.js 13 App Router example with:
// Client component form
// Server-side async validation (including fetch for image)
// Conditional rendering for success/error
// Redirect on success