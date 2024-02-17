import { useEffect, useRef, useState } from "preact/hooks";
import { IMovie } from "../interfaces/IMovie.ts";
import { Movie } from "../components/Movie.tsx";

export default function Movies() {
  const [counter, setCounter] = useState<number>(0);
  const [movies, setMovies] = useState<IMovie[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Get movies from the server
  useEffect(() => {
    fetch("/api/movies")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        setCounter(data.length);
      });
  }, []);

  const onNewMovie = (event: Event) => {
    event.preventDefault();
    if (inputRef.current?.value) {
      // Check if the movie is already in the list. Use the title as the unique identifier.
      const movieExists = movies.some(
        (movie) => movie.title === inputRef.current?.value,
      );
      if (movieExists) {
        alert("This movie is already in the list.");
        return;
      }
      const newMovie: IMovie = {
        id: crypto.randomUUID(),
        title: inputRef.current.value,
      };
      setMovies((prevState) => {
        return [...prevState, newMovie];
      });
      setCounter((prevState) => ++prevState);
      fetch("/api/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMovie),
      });
      inputRef.current.value = "";
    }
  };

  const onRemoveMovie = (id: number) => {
    setMovies((prevState) => prevState.filter((t) => t.id !== id));
    fetch(`/api/movies`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
  };

  const onEditMovie = (movie: IMovie) => {
    setMovies((prevMovies) =>
      prevMovies.map((t) => {
        if (t.id == movie.id) {
          return movie;
        }
        return t;
      })
    );
    fetch(`/api/movies/${movie.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movie),
    });
  };

  console.log(movies);

  return (
    <>
      <div class="mx-auto max-w-sm w-full">
        <form onSubmit={onNewMovie}>
          <input
            id="movie"
            name="movie"
            type="text"
            ref={inputRef}
            placeholder="Enter new Movie..."
            required
            class="w-full rounded-md  py-1.5 px-3.5  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
          />
        </form>
      </div>
      {movies.length > 0
        ? (
          <div class="mt-10">
            {movies.map((movie) => (
              <Movie
                movie={movie}
                onMovieEdit={onEditMovie}
                onMovieRemove={onRemoveMovie}
              />
            ))}
          </div>
        )
        : (
          <div class="mt-10 text-center">
            <div>
              <h2 class="text-2xl font-bold mb-5">
                You watched all the movies!
              </h2>
              <p class="text-gray-400">Add a new movie to the list.</p>
            </div>
          </div>
        )}
    </>
  );
}
