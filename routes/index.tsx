/// <reference lib="deno.unstable" />
import Movies from "../islands/Movies.tsx";
import RandomMovieButton from "../islands/RandomMovieButton.tsx";

export default function Home() {

  return (
    <body class="bg-gradient-to-t from-gray-400 via-gray-900">
      <div class="mt-10 px-5 rounded bg-white mx-auto flex max-w-screen-md flex-col justify-center py-12">
        <div class="mx-auto">
          <img
            class="mr-20 align-middle w-60"
            src="/logo.svg"
          />
        </div>
        <RandomMovieButton class="mt-4 mx-auto" />
        <Movies />
      </div>
    </body>
  );
}
