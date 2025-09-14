import Image from "next/image";

export default function Home() {
  //now we'll improve our file and folder structure.
  //let's create a route group (root) and let's move this page.tsx in that folder.

  //now let's also create a layout file in this root.
  //whatever we apply in this layout will only be applied to the pages of this route group (ROOT) only.
  return (
    <>
    <section className="pink_container pattern rounded-4xl px-6">
      <h1 className="heading ">Pitch Your Startup!!! <br /> Connect With Entrepreneurs</h1>
      {/* we use ! in tailwind when we wanna override some styles that were previously provided to this element. */}
      <p className="sub_heading !max-w-3xl">Submit Ideas, Vote on pitches and get noticed in Virtual Competitions</p>
    </section>
    </>
  );
}
