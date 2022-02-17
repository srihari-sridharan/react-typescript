import React, { Fragment, useEffect } from "react";
import { useState } from "react";
const defaultResult: ISearchResult = {
  error: 0,
  total: 0,
  page: 1,
  books: [],
};

const Search = () => {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [initialPageLoaded, setInitialPageLoaded] = useState(false);
  const [result, setResult] = useState(defaultResult);

  const handleKeyPress = function (
    e: React.KeyboardEvent<HTMLInputElement>
  ): void {
    if (e.key === "Enter" && !initialPageLoaded && query) {
      loadBooks(`https://api.itbook.store/1.0/search/${query}/${currentPage}`);
    }
  };

  let loadBooks = async (url: string) => {
    try {
      if (!initialPageLoaded) {
        setInitialPageLoaded(true);
      }

      let res = await fetch(url, {
        method: "GET",
      });
      let resJson = await res.json();
      if (res.status === 200) {
        let newResult = { ...result };
        newResult.books.push(...resJson.books);
        setResult(newResult);
        setCurrentPage(parseInt(resJson.page));
        const totalBooks: number = parseInt(resJson.total);
        setTotalBooks(totalBooks);
        setBooksPerPage(10);
        let newPageCount = Math.floor(totalBooks / booksPerPage);
        newPageCount = newPageCount + (totalBooks % booksPerPage > 0 ? 1 : 0);
        setPageCount(newPageCount);
        setHasMore(currentPage * booksPerPage < totalBooks);
        setTimeout(() => {
          window.scrollTo(0, document.body.scrollHeight);
        }, 1000);
      } else {
        // setMessage("Some error occurred");
      }
    } catch (err) {
      console.log(err);
    }
  };

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
              <div className="isbn13">ISBN: {element.isbn13}</div>
              <div className="price">Price: {element.price}</div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <input
        type="text"
        value={query}
        placeholder="Search books - enter something to search... e.g. javascript, mongodb, etc."
        onChange={(e) => {
          setQuery(e.target.value);
          setTotalBooks(0);
          setHasMore(true);
          setInitialPageLoaded(false);
          setPageCount(0);
          setCurrentPage(1);
          setResult({
            error: 0,
            total: 0,
            page: 1,
            books: [],
          });
        }}
        onKeyPress={handleKeyPress}
        className="search-box"
      ></input>
      {initialPageLoaded && totalBooks > 0 && `Found ${totalBooks} books!`}
      {RenderBooks(result)}
      {initialPageLoaded && currentPage * booksPerPage <= totalBooks ? (
        <>
          <span>
            Loaded{" "}
            {currentPage * booksPerPage <= totalBooks
              ? currentPage * booksPerPage
              : totalBooks}{" "}
            books out of {totalBooks}.
          </span>
          <input
            type="button"
            value="Load More"
            onClick={(e) =>
              loadBooks(
                `https://api.itbook.store/1.0/search/${query}/${
                  currentPage + 1
                }`
              )
            }
            onKeyPress={handleKeyPress}
            className="search-box"
          ></input>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Search;
interface ISearchResult {
  error: number;
  total: number;
  page: number;
  books: any[];
}
