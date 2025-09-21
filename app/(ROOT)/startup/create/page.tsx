import { auth } from '@/auth'
import StartupForm from '@/components/StartupForm'
import { redirect } from 'next/navigation';
import React from 'react'

const page = async () => {
    //we want users to visit this page only if they're logged in. so let's add a failsafe for it.
    const session = await auth();
    if(!session) redirect("/");//if no session(i.e user ain't logged in then redirect him just to the home page. cuz they can view but not create new startups)
  return (
    <>
        <section className='pink_container !bg-cyan-900 rounded-xl pattern min-h-[230px]'>
            <h1 className="heading">Submit your Startup</h1>
            {/* here below we need a form so let's create a component for that form. StartupForm.tsx */}
            <StartupForm />
        </section>
    </>
  )
}

export default page