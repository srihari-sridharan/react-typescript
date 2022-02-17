import React from "react";
import { ISearchResult } from "./ISearchResult";

const RenderBooks: React.FC<ISearchResult> = (result: ISearchResult) => {
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

export default RenderBooks;
