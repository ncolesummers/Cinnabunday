import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

export default function RandomMovieButton(props: JSX.HTMLAttributes<HTMLButtonElement>) {
      // get random movies from api/random
  const getRandomMovies = async () => {
    console.log("getRandomMovies")
    const res = await fetch("/api/movies?random=true");
    const movies = await res.json();
    console.log(movies);
  };
  return (
    <div class="flex my-4 items-center justify-center">
      <button
        onClick={getRandomMovies}
        {...props}
        disabled={!IS_BROWSER || props.disabled}
        class="px-6 py-2 shadow max-w-md rounded bg-yellow-400 hover:bg-yellow-600 transition-colors"
      >          
      Select Movies
      </button>
    </div>
  );
}
