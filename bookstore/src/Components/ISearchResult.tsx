import { IBook } from "./IBook";

export interface ISearchResult {
    error: number;
    total: number;
    page: number;
    books: IBook[];
}
