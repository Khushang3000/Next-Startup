import Navbar from "../../components/Navbar";

export default function layout({ children }: Readonly<{children: React.ReactNode}> ){// Readonly means that we won't modify this value further.
    return(
    <main className="font-work-sans">
        {/* What this layout will basically do is render a Navbar on top of Children(all the pages that come under the (ROOT)route-group ) 
        so let's create that navbar in the components.*/}
        <Navbar />
        {children}
    </main>
    )
}