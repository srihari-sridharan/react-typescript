import React, { Fragment } from "react";
import { useState } from "react";
const defaultResult: ISearchResult = {
  error: 0,
  total: 0,
  page: 1,
  books: [],
};

const Search = () => {
  const [query, setQuery] = useState("");
  const [result, setResults] = useState(defaultResult);

  const handleKeyPress = function (
    e: React.KeyboardEvent<HTMLInputElement>
  ): void {
    e.key === "Enter" && query && handleSearch(query);
  };

  let handleSearch = async (e: any) => {
    try {
      let res = await fetch("https://api.itbook.store/1.0/search/" + query, {
        method: "GET",
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setResults(resJson);
      } else {
        // setMessage("Some error occurred");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <input
        type="text"
        value={query}
        placeholder="Search books - enter something to search... e.g. javascript, mongodb, etc."
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        className="search-box"
      ></input>
      {RenderBooks(result)}
    </>
  );
};

export default Search;
interface ISearchResult {
  error: number;
  total: number;
  page: number;
  books: never[];
}

const RenderBooks = (result: ISearchResult) => {
  return (
    <div className="flex">
      {result.books.map((element: any) => {
        return (
          <div className="card">
            <img src={element.image} alt={element.title} />
            <div className="title">
              <a href={element.url} target="_blank" rel="noreferrer">
                {element.title}
              </a>
            </div>
            <div className="subtitle">{element.subtitle}</div>
          </div>
        );
      })}
    </div>
  );
};
