// npm install easymde --legacy-peer-deps
//WHENEVER NEXTJS CANARY VERSION CAUSES ERROR ON INSTALLNG SOMETHING, JUST ADD --legacy-peer-deps and then install it.


"use client"//cuz client will submit data in the form and the data will come from the client side not server. AND ALSO WE WILL USE HOOKS.
import React, { useActionState } from 'react'
import { Input } from './ui/input'
// import { Toaster } from './ui/sonner'//(1)
import { Toaster } from 'sonner'//(2)
import { useState } from 'react'
import { Textarea } from './ui/textarea'
import MDEditor from '@uiw/react-md-editor'
import { Button } from './ui/button'
import { Send } from 'lucide-react'
import { formSchema } from '@/lib/validation'
import {z} from 'zod';
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { create_pitch } from '@/lib/actions'
const StartupForm = () => {
    
    //here useState uses array destructuring, [errors, seterrors], as it returns a array or to be more specific, a tuple.
    const [errors, seterrors] = useState <Record<string,string>>({})//this record string,string specifies the return type of this useState function
    // <Record<string,string>> so this is basically the type of state that useState can recieve and return, as this is a generic, don't confuse it with typescript types.
    
    //markdown pitch
    const [pitch, setpitch] = useState("")

    const router = useRouter();//comming from next-navigation. this is the app router and we should always use this router instead of the router(for new nextjs projects) from next-router or someplace else as that is older.
    
    //for form validation we'll use ZOD, a simple ts first schema validation with static type interference, to implement it create a new file in the lib folder->validation.ts
    const handleFormSubmit = async (prevState: any, formData: FormData)=>{
        try {
            const formValues = {
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                category: formData.get("category") as string,
                link: formData.get("link") as string,
                pitch
                // pitch: formData.get("pitch") as string
                //DON'T NEED TO GET THE PITCH AS WE'RE MANAGING IT AS A SEPERATE INDIVISUAL STATE.
            }

            await formSchema.parseAsync(formValues)//taking the formValues and compare them with the formSchema and see if they match.
            //             parseAsync(formValues) runs validation:
            // It checks if formValues matches the shape and rules of formSchema.
            // If everything is valid ✅ → it resolves and gives you the typed, validated data back.
            // If anything is invalid ❌ → it throws a ZodError.

            console.log(formValues);//logging to see if we even get the form values.REMEMBER SINCE THIS IS A CLIENT SIDE COMPONENT, THE CONSOLE LOG WILL BE SHOWN ON THE 
            // CLIENT'S BROWSER.
           
           
            //USING THE CREATE PITCH UTILITY FUNCTION.
            const result = await create_pitch(prevState, formData, pitch)//IMPLEMENTED, ALSO SEE THE IF CONDITION BELOW,
            //NOW IF WE SUBMIT A FORM, IT'LL REDIRECT US TO A PAGE, AND IF WE GO TO SANITY STUDIO AND CHECK IT THEN IT'LL BE VISIBLE THERE(THIS NEWLY CREATED STARTUP)
            //but why did we get redirected to the 404 page?
            //well cuz in the url you'd see undefined like /startup/undefined.
            //why is that let's see. cuz the resule has an ._id not .id
            //so now it should be fixed, but for now let's just go to the home page and you'll see the startup right there.
            //also now make sure to delete the fake startups and authors from sanity studio.
            //in next commit we'll see bug fixing and much more.
            //to make sure when 1000s of users use our app it doesn't break for them, we'll use sentry
            //sentry is an application monitoring software
            //so go ahead and create an account.
            //install sentry choose nextjs
            //now in our package.json overrides: add next: $next this ensures that sentry uses the same version of nextjs.
            // npx @sentry/wizard@latest -i nextjs --saas --org personal-01v --project javascript-nextjs
            //also remember to change your project name to NEXT-STARTUP INstead of javascript-nextjs
            //now say no to route sentry requests in the browser? as it could increase the server bill
            //yes, enable react annotations
            //yes to tracing
            //sentry session replay- yep
            //yes to example page
            //yes to using cicd tool? we'll use vercel later on
            //now it'll give you a sentry auth token which you can copy. 
            //yes continue

            //now run the dev server go to localhost3000
            //add sentry-example-page to the url, this page was created by sentry for us.(disable your browser's adblocker for once. or just don't run it on brave, run it on edge or something)
            //click on throw sample error purposfully just to check if sentry is watching over the app and alerting us.
            //now you'll see that error has been sent to sentry so let's go to sentry dashboard and see that error or you'll see a bar at the bottom of your install sentry page
            //it'll say error recieved and just click on take me to my error. just see the issues tab on the navbar on the left.
            //now you'll see the error, you can go into it's details by clicking on it, you can see where is it comming from.
            //rn we can fix that error by fixing this code or right in our browser.
            //BUT THE PROBLEM OCCURS WHEN A USER BREAKS YOUR APPLICATION. AND NO MATTER HOW MUCH YOU TEST, USERS WILL ALWAYS END UP BREAKING IT.
            //just imagine how hectic it is to tell them to open their console and send us a ss of what they're seeing. and it'll be so hard to fix that error.
            //so for that sentry simplifies this by helping us to track and resolve those errors.
            //by giving you event highlights of how the error has happened.
            //it gives you info like on which page the error has happened, see screenshot 9, you'll see info like what kind of error it is, where it happened(development)
            //from which api, and much more.
            //if you scroll down further, it'll show you that which line of code is throwing the error.
            //and if you scroll down further below in the contexts section it'll show you some cool stuff like which browser client used, 
            //it's version, which os is client using
            //how much memory is the app using in his browser, how much memory is free and much moreeee.
            //you can see the full trace preview just above the context section, and see exactly how the error has happened.
            //AND HERE'S THE REALLY COOL THING, FOR SENTRY FRONTEND ERROR,
            //if you click on the error once more and go there,
            //YOU CAN ACTUALLY CHECK OUT THE SESSION REPLAY, I.E EXACTLY WHAT THE USER DID WHEN HE ENCOUNTERED THE ERROR!!!!!! 
            //LIKE A SCREEN RECORDING!!!!!!! 
            //but for that we'll have to manually create a sentry.client.ts for our app and see the proper session replay setup there on sentry's page.
            //soo see that, and now go to sentry, make sure to click on the FRONTEND ISSUE AS ON BACKEND ISSUES WE DO NOT GET SESSION REPLAYS, SO YEAH.
            //NOW THAT YOU HAVE CREATED THE CLIENT.TS AND CONFIGURED IT TO SHOW SESSION REPLAY AS WELL AS SHOW THE TEXT AND MEDIA ON THE USER'S PAGE:
            // maskAllText: false,
            //   blockAllMedia: false,
            //YEAAH YOU CAN DO THAT.WE CAN SEE EXACTLY WHAT THEY WERE DOING AND WE CAN ALSO SEE WHAT HAPPENED IN THE CONSOLE.
            //ALONG WITH REPLAYS, THERE'S ALSO PERFORMANCE.(SEE IN THE NAVBAR.) IT ALLOWS YOU TO CHECK HOW QUICKLY CERTAIN PAGES ARE LOADING FOR YOUR USER.
            //ofc, just like replay we gotta setup performance metrics as well.
            //GO TO INSIGHTS(performance). THERE YOU CAN SEE MANY OTHER THINGS AS WELL.

            //we can also create a user feedback for our app, where the good users that see a bug they can report that bug on their own to us.
            //you can see that under the issues section.
            //click on setup now and you'll get how to configure the sdk.
            //in sentry client.config.ts we can add integration.
            // ###########################################################
            //HI ME FROM THE FUTURE, YOU DON'T NEED TO CREATE A CLIENT.TS FOR SENTRY, INSTEAD THE CODE YOU WILL WRITE GOES ININSTRUMENTATION.TS
            //WHICH SENTRY GENERATED FOR US, SO THERE YOU ADD INTREGATIONS LIKE REPLAY AND USERFEEDBACK.
            //SO YOU CAN JUST DELETE THE SENTRY CLIENT.CONFIG.TS, IT'S OF NO USE AT ALL.
            // ###########################################################
            //now when you send a bug report, you can go to sentry dashboard, and see that bug report and there you can even see the replay(which is even before the user clicked on submit a bug)
            //oh and btw whenever there's a bug/error in your app or some user broke your app, you also get an email from sentry about that.

            //now the next thing we'll do is create the user profile route. in next commit.
            //root/user/[id]/page.tsx, go.

            //we'll show a shadcn toast, that'll be a alert component saying something wen't wrong.
            //see sonner.tsx component that we created to make a toast component.(NOW GO TO THE LAYOUT.TSX OF THE PROJECT FOLDER AND RIGHT BELOW CHILDEREN JUST RENDER THAT TOASTER COMPONENT AND COME BACK HERE TO SEE HOW WE USE IT.)

            if(result.status === "SUCCESS"){//showing toast for success.
                toast("Success",{
                    description: 'Your Startup Pitch has been created successfully!!',
                })


                //Once that successful submission happens we wanna redirect the user to that startup details page.
                //for that we'll use useRouter

                router.push(`/startup/${result._id}`)//since we're showing toast, we'll redirect the user to his startup page.
            }

            return result;
        } catch (error) {
            if(error instanceof z.ZodError){
            
            //                 The output of z.flattenError() is an object with two main properties:
            // formErrors: An array of strings containing any top-level errors that don't belong to a specific field.
            // fieldErrors: An object where the keys are the field names (e.g., title, description) and the values are arrays of error messages for that specific field.
            
                const flattenedError = z.flattenError(error);
                const fieldErrors = flattenedError.fieldErrors;

                seterrors(fieldErrors as unknown as Record<string,string>) //TypeScript is strict about type assertions. It won't let you cast a type to a completely unrelated one directly. For instance, you can't cast a number to a string using as.
                toast("Event has been created",{
                    description: 'Please Check Your Inputs and Try Again.',
                    // action: {
                    //     label: 'Undo',
                    //     onClick: () => console.log('Undo action triggered'),
                    // },
                    // style: {
                    //     backgroundColor: '#4a90e2', // Example: a blue background
                    //     color: 'white',              // Example: white text
                    // }
                })
                return {...prevState, error: "Validation Failed", status: "ERROR"}//returning prevState with modified values of error and status.
            }
// The as unknown part is a trick to get around this restriction. The unknown type is the "top" type in TypeScript, meaning any value can be assigned to unknown without a type error. By casting your variable to unknown first, you're essentially telling the compiler, "I know what I'm doing, just forget about the original type for a moment."
// Type Casting (in other languages)
// In languages like C++ or Java, type casting often involves a runtime conversion. This means the program might actually create a new value in a different memory format. For example, casting a float to an int will physically change the data, truncating the decimal. This can sometimes lead to runtime errors if the conversion fails.

// Type Assertion (in TypeScript)
// In TypeScript, the as keyword performs a type assertion. It's purely a compile-time instruction to the compiler. You are telling the compiler, "Trust me, I know this variable is of this type, even if you can't prove it." TypeScript doesn't change the underlying data at all; it just stops reporting a type error so you can move on. The type information is erased when the code is compiled to JavaScript.

        toast("AN UNEXPECTED ERROR HAS OCCURED",{//Toast for unexpected error.
            description: 'Please Check Your Inputs and Try Again.',
        })
            return {
                ...prevState,
                error: "Unexpeted Error Occured",
                status: 'Error'
            }
            //Also, if something goes wrong, we'll show a shadcn toast, that'll be a alert component saying something wen't wrong.
            //see sonner.tsx component that we created to make a toast component.(NOW GO TO THE LAYOUT.TSX OF THE PROJECT FOLDER AND RIGHT BELOW CHILDEREN JUST RENDER THAT TOASTER COMPONENT AND COME BACK HERE TO SEE HOW WE USE IT.)

        } 
    }

    

    const [state, formAction, isPending] = useActionState(handleFormSubmit,{//pass this formAction as the action of the form
        error: "",
        status: "INITIAL"
    },"")


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
    <form action={formAction} className='startup-form rounded-4xl py-4'>
        <div>
            <label htmlFor="title" className='startup-form_label'>TITLE</label>
            <Input id='title' name='title' className='startup-form_input' required placeholder='Startup Title'/>
            {errors.title && <p className='startup-form_errors'>{errors.title}</p>
            /*IF ERROR/ERROR.TITLE EXISTS THEN RENDER THE P TAG, & RETURNS THE LAST TRUTHY when both are true, || RETURNS THE LAST FALSY when all are false ,
            BOTH EVALUATE FROM LEFT TO RIGHT, IF ALL ARE FALSE THEN & RETURNS THE LEFT MOST(FIRST FALSY) VALUE, AND || RETURNS THE FIRST TRUTHY WHEN ALL ARE TRUE.*/}
        </div>
        <div>
            <label htmlFor="description" className='startup-form_label'>DESCRIPTION</label>
            {/* npx shadcn@latest add textarea */}
            <Textarea id='description' name='description' className='startup-form_textarea' required placeholder='Startup Description'/>
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
        {/* now the ui of the form is completed, so next let's focus on submitting the form!!! (in next commit),
         and we'll submit the form using react's latest useActionState hook, this hook allows you to update the state based on the result of form action
         it even uses a isPending state that can be used to show a loading indicator while the action is being performed.
         this hook is better and will replace the react's formstate hook, see screenshot 8. remove the isPending above and write the useActionState hook from react. */}

         {/* NOW TO SUBMIT OUR STARTUP WE'LL HAVE TO DO THIS USING A MUTATION THROUGH A SERVER ACTION, THEY CAN BE DEFINED USING THE REACT'S "use server" directive,
         we can place them at the top of an async function or mark the entire file as "use server" and in that file you can write multiple server actions (this won't be a component but a .ts file where all of our actions go, and then we just need to import those async actions in the component file where we will use them)
         so just create a new file in lib/actions.ts */}
    </form>
  )
}

export default StartupForm