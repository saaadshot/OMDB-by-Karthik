declare interface IMovieList {
  imdbID: string;
  Poster: string;
  Title: string;
  Year: string;
  Type: string;
}

declare interface IResponse<T> {
  Response: "True" | "False";
  Search: T[];
  Error: string;
  totalResults: string;
}

declare interface IQueryResult<T> {
  isLoading: boolean;
  isError: boolean;
  error: string;
  data: IResponse<T>["Search"];
  totalResults: IResponse<T>["totalResults"];
}

declare interface IQuery {
  title: string;
  year: string;
  page: number;
}
