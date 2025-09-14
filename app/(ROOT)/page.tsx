import Image from "next/image";
import SearchForm from "../../components/SearchForm";

export default async function Home({searchParams}:{searchParams: Promise<{query: string}>}) {
  const query = (await searchParams).query; //now that we have the query, we can pass it into the searchForm as a prop.
  return (
    <>
    <section className="pink_container pattern rounded-4xl px-6">
      {/* remember, in tailwind, we can not use one custom utility class within another custom utility class for ex: we have two custom utility classes pattern and pink_container so we can't put pattern inside pink_container in global.css as it would not be allowed.*/}
      <h1 className="heading ">Pitch Your Startup!!! <br /> Connect With Entrepreneurs</h1>
      {/* we use ! in tailwind when we wanna override some styles that were previously provided to this element.
      font-medium low n many more decide the thickness of the form. */}
      <p className="sub-heading !max-w-3xl ">Submit Ideas, Vote on pitches and get noticed in Virtual Competitions</p>
      {/* now let's create another component called SearchForm.tsx. */}
      <SearchForm query={query}></SearchForm>
      {/* now go to searchForm and accept this query as a prop. */}
    </section>
    </>
  );
}
