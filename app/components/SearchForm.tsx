import React from 'react'
import SearchFormReset from './SearchFormReset';

//now since this is a form, can we make sure that this is rendered on the server side and not on the client side.
// The <Form> component from nextjs extends the HTML <form> element to provide prefetching of loading UI, client-side navigation on submission, and progressive enhancement.
import Form from 'next/form'
import { Search } from 'lucide-react';

const reset = () =>{
    const form = document.querySelector(".search-form") as HTMLFormElement;

    //if form exists then we'll reset the form.
    if(form) form.reset()

    //now still there's one problem, even tho our SearchForm is a server side component, but the reset button and the onClick is still client side stuff    
    //so we gotta extract it into a different component., so take the button and place it in the SearchFormReset component, as well as this reset function for us to call it there.
}
const SearchForm = ({query}: {query?: string}) => {
     //remember we're in a server component, so we should not use useState.
    //  Now we're directly using query without to search, now when you load the page, type something in the input box, click search, this query will be appended as a string to the url
    //so it's basically modifying the query in the url.
    //clicking the clear button also clears it from the url.

    //now you might think why are we appending info to the url, but you miss the point that that query isn't a sensitive information.
    //and that url appending thing is done cuz that's a get request,
    //if you don't want that then you can provide an onSubmit property to the form and then you decide what you have to do with that key: value pair submitted in the form.
    //you remember the callbacks from nextjs docs right? where we got access to the url n the baseUrl.

    //basically:
    //  By default, if you don’t specify method, it uses GET.

    // That means values will be appended to the URL as query params on submit.

    // If you set method="POST", values go in the request body, not the URL.

    // If you provide an action (a server action or API route), the form submission is handled by that without appending values to the URL.

    //by action we mean serverAction(),
    // <Form action={handleSubmit}> here action is a serverAction, so values won’t get appended to the URL
    // If instead you just did <Form action="/search"> without a server action, it behaves like a normal HTML form and appends values to the URL if the method is GET.





  
     return (
     <Form action="/" scroll={false} className='search-form'>
        {/* don't scroll once we submit it. */}
      {/* On submission, the input value will be appended to
          the URL, e.g. /search?query=abc */}
      <input name="query" defaultValue={query} className='form-input' placeholder='Search Startup'/>
      <div className="flex gap-2">
        {query && (//if query is there then render the button to reset it.
            <SearchFormReset />
        )}

        <button type="submit" className='search-btn text-white'>
            <Search className='size-5'/>{/*Comming from shadcn or lucide-react to be specific which is a dependency of shadcn and it provides all sorts of icons we can do same thing for the reset button */}
        </button>
        {/* So, how does this work? rn we ain't really submitting or clearing anything. cuz the query is always set to test.
        But now, we will make this a fully functional url modifying server rendered form, you do remember about the searchParams props right? go to page.tsx(Home/hero), and there we'll try to access the query from the search paremeters.
        */}
      </div>
    </Form>
  )
}

export default SearchForm
//put this component right below the p tag of home page.