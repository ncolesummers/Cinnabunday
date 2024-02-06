// Adds a new movie to the database.
import { Handlers, FreshContext } from "$fresh/server.ts";

const kv = await Deno.openKv();

export const handler: Handlers<Movie | null> = {
  async GET(_req, { params }: FreshContext) {
    const movies = [];
    for await (const res of kv.list({ prefix: ["movies"] })) {
      console.log(JSON.stringify(res));
      movies.push(res.value);
    }
    console.log("params", params)
    // if random query param is present, return a random movie
    // const random = params.get("random");
    // if (random) {
    //   const randomMovies = movies.length > 2
    //     ? [movies[Math.floor(Math.random() * movies.length)], movies[Math.floor(Math.random() * movies.length)]]
    //     : movies; // Return all if less than 2 movies
    //   return new Response(JSON.stringify(randomMovies), {
    //     headers: { "Content-Type": "application/json" },
    //   });
    // }
    return new Response(JSON.stringify(movies));
  },

  async POST(req, _ctx) {
    const movie = (await req.json()) as Movie;
    const required: (keyof Movie)[] = ["title", "id"];
    for (const field of required) {
      if (movie[field] === undefined) {
        return new Response(
          JSON.stringify({
            error: `Missing required field: ${field}`,
          }),
          { status: 400 },
        );
      }
    }
    const movieKey = ["movies", movie.id];
    const ok = await kv.atomic().set(movieKey, movie).commit();
    if (!ok) throw new Error("Something went wrong.");
    return new Response(JSON.stringify(movie));
  },

  async DELETE(req, _ctx) {
    const movie = (await req.json()) as Movie;
    const movieKey = ["movies", movie.id];
    console.log("Deleting movie with key: ", movieKey);
    await kv.delete(movieKey);
    return new Response(JSON.stringify(movie));
  },
};
