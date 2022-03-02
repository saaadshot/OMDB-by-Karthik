/**
 * @author Karthik <karthik.x@314ecorp.com>
 * @description find movie
 */

import { URL, API_KEY } from "./constants";

const searchMovie = async (imdbID: number) => {
  const searchParams = new URLSearchParams({
    apikey: API_KEY,
    i: imdbID.toString(),
  });

  const response = await fetch(URL + "?" + searchParams).then((res) =>
    res.json()
  );

  return response;
};

export default searchMovie;
