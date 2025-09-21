// npm install easymde --legacy-peer-deps
//WHENEVER NEXTJS CANARY VERSION CAUSES ERROR ON INSTALLNG SOMETHING, JUST ADD --legacy-peer-deps and then install it.


"use client"
import React from 'react'
import { Input } from './ui/input'
// import { Toaster } from './ui/sonner'//(1)
import { Toaster } from 'sonner'//(2)
import { useState } from 'react'
import { Textarea } from './ui/textarea'
import MDEditor from '@uiw/react-md-editor'
import { Button } from './ui/button'
import { Send } from 'lucide-react'
const StartupForm = () => {

    //here useState uses array destructuring, [errors, seterrors], as it returns a array or to be more specific, a tuple.
    const [errors, seterrors] = useState <Record<string,string>>({})//this record string,string specifies the return type of this useState function
    // <Record<string,string>> so this is basically the type of state that useState can recieve and return, as this is a generic, don't confuse it with typescript types.

    //markdown pitch
    const [pitch, setpitch] = useState("")

    //later-on we'll extract this value dynamically to know whether the user is submitting the form or not.
    const isPending = false;


    //npx shadcn@latest add input textarea toast, if toast component is depricated then use sonner component.
    //for now add these components

    //#############
    //npm install sonner --legacy-peer-dep
    //then create a sonner.tsx in ui components.
    //############

    //THERE ARE TWO WAYS YOU CAN USE TOASTER,(1) EITHER CREATE A MANUAL SONNER.TSX IN UI FOLDER AND SEE THE CODE AND EXPORT TOASTER FROM THERE, OR (2)JUST IMPORT TOASTER FROM SONNER AFTER RUNNING(npm install sonner next-themes --legacy-peer-deps)
    //see the import statements.
    return (
    //as soon as we define some action, it's gonna ask us to make this a client component.
    // why? cuz this ain't a server action!!!, this is a form action like we're gonna take data from the user and send it through post.
    <form action={()=>{}} className='startup-form rounded-4xl py-4'>
        <div>
            <label htmlFor="title" className='startup-form_label'>TITLE</label>
            <Input id='title' name='startup' className='startup-form_input' required placeholder='Startup Title'/>
            {errors.title && <p className='startup-form_errors'>{errors.title}</p>
            /*IF ERROR/ERROR.TITLE EXISTS THEN RENDER THE P TAG, & RETURNS THE LAST TRUTHY when both are true, || RETURNS THE LAST FALSY when all are false ,
            BOTH EVALUATE FROM LEFT TO RIGHT, IF ALL ARE FALSE THEN & RETURNS THE LEFT MOST(FIRST FALSY) VALUE, AND || RETURNS THE FIRST TRUTHY WHEN ALL ARE TRUE.*/}
        </div>
        <div>
            <label htmlFor="description" className='startup-form_label'>DESCRIPTION</label>
            {/* npx shadcn@latest add textarea */}
            <Textarea id='' name='' className='startup-form_textarea' required placeholder='Startup Description'/>
            {errors.description && <p className='startup-form_errors'>{errors.description}</p>}
        </div>
        <div>
            <label htmlFor="category" className='startup-form_label'>CATEGORY</label>
            <Input id='category' name='category' className='startup-form_input' required placeholder='Startup Category(Tech, Health, Education...)'/>
            {errors.category && <p className='startup-form_errors'>{errors.category}</p>}
        </div>
        <div>
            <label htmlFor="link" className='startup-form_label'>ImageUrl</label>
            <Input id='link' name='link' className='startup-form_input' required placeholder='Startup ImageUrl '/>
            {errors.link && <p className='startup-form_errors'>{errors.link}</p>}
        </div>
        {/* NOW WE'LL  give a markdown for pitch. to use this markdown, we'll use npm i @uiw/react-md-editor, if this doesn't work just use --legacy-peer-deps, we'll use useState so that users can see the markdown pitch in real time.  */}
        <div data-color-mode='light'> {/**so that it must be light */}
            <label htmlFor="pitch" className='startup-form_label'>Pitch</label>
            <MDEditor 
            value={pitch}
            onChange={(value)=>setpitch(value as string)}
            // this value as string, does not convert the value to string at runtime, it's just us telling typescript that this is a string so that it doesnot give us errors like value has unknown type.
            id="pitch"
            preview='edit'
            height={300}
            style={{ borderRadius: 20, overflow: 'hidden'}}
            textareaProps = {{
                placeholder: "Briefly describe your idea and what problem it solves."
            }}
            previewOptions = {{
                disallowedElements: ["style"]//only keep the base styling and remove any other styling.
            }}
            />
            {errors.pitch && <p className='startup-form_errors'>{errors.pitch}</p>}
        </div>
        <Button type="submit" className='startup-form_btn text-white' disabled={isPending}>
            {isPending ? "Submitting...":"Submit your Pitch"}
            <Send className='size-6 ml-2'/>
        </Button>
        {/* now the ui of the form is completed, so next let's focus on submitting the form!!! (in next commit) */}
    </form>
  )
}

export default StartupForm