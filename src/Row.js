import React, { useEffect, useState } from "react";
import "./Row.css";

import axios from "./axios";

function Row({ title, fetchUrls, isLargeRow }) {
  const [display, setdisplay] = useState([]);
  const base_path = "https://image.tmdb.org/t/p/original/";
  useEffect(() => {
    async function displayingdata() {
      const req = await axios.get(fetchUrls);
      setdisplay(req.data.results);
      return req;
    }
    displayingdata();
  }, [fetchUrls]);

  return (
    <div className="row">
      <h1>{title}</h1>
      <div className="row_posters">
        {display.map((poster, key) => (
          <img
            key={poster.id}
            className={`poster_img ${isLargeRow && "poster_img_large"}`}
            src={`${base_path}${
              isLargeRow ? poster.backdrop_path : poster.poster_path
            }`}
            alt={poster.name}
          />
        ))}
      </div>
    </div>
  );
}

export default Row;
