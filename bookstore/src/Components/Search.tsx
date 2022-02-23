import React, { Fragment } from "react";
import { useState } from "react";
import { defaultResult } from "./defaultResult";
import RenderBooks from "./RenderBooks";

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

  const handleChangeEvent = (e: React.ChangeEvent<HTMLInputElement>): void => {
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
  };
  const renderSearchBox = (
    <input
      type="text"
      value={query}
      placeholder="Search books - enter something to search... e.g. javascript, mongodb, etc."
      onChange={handleChangeEvent}
      onKeyPress={handleKeyPress}
      className="search-box"
    ></input>
  );

  const renderTotalBooksFound =
    initialPageLoaded && totalBooks > 0 && `Found ${totalBooks} books!`;

  const renderLoadMoreButton =
    initialPageLoaded && currentPage * booksPerPage <= totalBooks ? (
      <Fragment>
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
              `https://api.itbook.store/1.0/search/${query}/${currentPage + 1}`
            )
          }
          onKeyPress={handleKeyPress}
          className="search-box"
        ></input>
      </Fragment>
    ) : (
      ""
    );

  return (
    <Fragment>
      {renderSearchBox}
      {renderTotalBooksFound}
      {RenderBooks(result)}
      {renderLoadMoreButton}
    </Fragment>
  );
};

export default Search;
