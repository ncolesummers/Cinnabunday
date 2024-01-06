export function validMovie(movie: Movie): boolean {
  const required: (keyof Movie)[] = ["title", "year", "seen", "id"];
  for (const field of required) {
    if (movie[field] === undefined) {
      return false;
    }
  }
  return true;
}
