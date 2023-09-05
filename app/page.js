import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col p-24">
      <section className="bg-slate-50 rounded-xl ">
        <div className="mx-auto max-w-screen-xl px-4 py-32">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Discover and Share
              <strong className="font-extrabold text-green-700 sm:block">
                Amazing Blogs
              </strong>
            </h1>
            <p className="mt-4 sm:text-xl/relaxed">
              Explore a world of diverse perspectives and insightful content on
              our blog platform.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/explore"
                className="block w-full rounded bg-green-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-green-700 focus:outline-none focus:ring active:bg-green-500 sm:w-auto"
              >
                Start Exploring
              </Link>
              <Link
                href="/submit"
                className="block w-full rounded border border-green-600 px-12 py-3 text-sm font-medium text-green-600 shadow hover:text-white hover:bg-green-600 focus:outline-none focus:ring sm:w-auto"
              >
                Share Your Blog
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
