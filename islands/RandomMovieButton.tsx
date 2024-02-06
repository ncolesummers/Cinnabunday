import { JSX } from "preact";
import { useState } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";


export default function RandomMovieButton(props: JSX.HTMLAttributes<HTMLButtonElement>) {

  const [movies, setMovies] = useState([]);

  // get random movies from api/random
  const getRandomMovies = async () => {
    console.log("getRandomMovies")
    const res = await fetch("/api/movies?random=true");
    const movies = await res.json();
    setMovies(movies);
  };
  
  return (
    <div class="flex flex-col my-4 items-center justify-center">
      {movies.length > 0 && (
        <div class="flex flex-col shadow bg-gray-50 p-8 my-4 ">
          <h2 class="text-2xl font-bold">Tonight's Selection</h2>
          <ul class="list-none">
            {movies.map((movie) => (
              <li class="mx-2 p-1 w-full transform hover:scale-110 transition-transform my-2 rounded-md shadow" key={movie.id}>{movie.title}</li>
            ))}
          </ul>
        </div>
      )}
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
