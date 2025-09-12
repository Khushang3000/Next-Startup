import Image from "next/image";

export default function Home() {
  //now we'll improve our file and folder structure.
  //let's create a route group (root) and let's move this page.tsx in that folder.

  //now let's also create a layout file in this root.
  //whatever we apply in this layout will only be applied to the pages of this route group (ROOT) only.
  return (
    <>
      <h1 className="text-2xl">Home</h1>
    </>
  );
}
