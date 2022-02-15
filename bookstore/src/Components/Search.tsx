import React from "react";
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
    e.key === "Enter" && handleSearch(query);
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

function RenderBooks(result: ISearchResult) {
  return <pre>{JSON.stringify(result, null, 2)}</pre>;
}
