import { Handlers } from "$fresh/server.ts";

const kv = await Deno.openKv();

export const handler: Handlers<Movie | null> = {
  async GET(_req, ctx) {
    const id = ctx.params.id;
    const key = ["movie", id];
    const movie = (await kv.get<Movie>(key)).value!;
    return new Response(JSON.stringify(movie));
  },

  async DELETE(_req, ctx) {
    const id = ctx.params.id;
    const movieKey = ["movie", id];
    const movieRes = await kv.get(movieKey);
    if (!movieRes.value) return new Response(`no movie with id ${id} found`);
    const ok = await kv.atomic().check(movieRes).delete(movieKey).commit();
    if (!ok) throw new Error("Something went wrong.");
    return new Response(`movie ${id} deleted`);
  },

  async PUT(req, ctx) {
    const id = ctx.params.id;
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
    const movieKey = ["movie", id];
    const movieRes = await kv.get(movieKey);
    if (!movieRes.value) return new Response(`no movie with id ${id} found`);
    const ok = await kv.atomic().check(movieRes).set(movieKey, movie).commit();
    if (!ok) throw new Error("Something went wrong.");
    return new Response(JSON.stringify(movie));
  },
};
