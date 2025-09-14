"use client";
//We are Only using this single reset button component as the client component, rest our form is a server component.

import React from 'react'
import Link from 'next/link';
import { X } from 'lucide-react';
const SearchFormReset = () => {
    const reset = () =>{
    const form = document.querySelector(".search-form") as HTMLFormElement;

    //if form exists then we'll reset the form.
    if(form) form.reset()

    //now still there's one problem, even tho our SearchForm is a server side component, but the reset button and the onClick is still client side stuff    
    //so we gotta extract it into a different component., so take the button and place it in the SearchFormReset component
}
  return (
    <button type="reset" onClick={reset}>
        <Link href="/" className='search-btn text-white'>
        <X className='size-5' />{/**shadcn, now let's say we want to add more shadcn components like button then just do:
         * npx shadcn@latest add (component_name)
         * ex: npx shadcn@latest add button
         * //the code for that will be automatically be added in our codebase, that's the benefit of using shadcn over other ui libraries like material ui.
         * //oh and no need to change the component's name.
         * //you can see that shadcn button component in the ui folder of components folder which is outside the app folder
         * //and like that you can change many properties, in most cases it is not needed as we can just add new ones by providing classname like we did with X and search button with size-5.
         * //since now we have two components folders that's a bad practice, in nextjs app folder we should only keep things specific to nextjs, so we should cut our navbar and search components and paste them in the components folder which is outside, remember to not put them in the ui, so you can differentiate
         * //which components are yours and which are shadcn's, sure we'll also need to modify some paths.
         * //so let's do that in the next commit.
         */}
        </Link>
    </button>
    // now in searchForm we'll render another button search button to be specific.
  )
}

export default SearchFormReset