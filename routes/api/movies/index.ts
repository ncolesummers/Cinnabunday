// Adds a new movie to the database.
import { Handlers } from "$fresh/server.ts";

const kv = await Deno.openKv();

export const handler: Handlers<Movie | null> = {
  async GET(_req, _ctx) {
    const movies = [];
    for await (const res of kv.list({ prefix: ["movies"] })) {
      movies.push(res.value);
    }
    return new Response(JSON.stringify(movies));
  },

  async POST(req, _ctx) {
    const movie = (await req.json()) as Movie;
    const required: (keyof Movie)[] = ["title", "year", "seen", "id"];
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
};
