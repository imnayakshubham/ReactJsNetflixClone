import React, { createRef, useEffect, useState } from "react";
import "./Row.css";
import axios from "./axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

function Row({ title, fetchUrls, isLargeRow }) {
  const scrollDiv = createRef();

  const [movies, setmovies] = useState([]);
  const [trailerUrl, settrailerUrl] = useState("");

  const base_path = "https://image.tmdb.org/t/p/original/";
  useEffect(() => {
    async function displayingdata() {
      const req = await axios.get(fetchUrls);
      setmovies(req.data.results);
      return req;
    }
    displayingdata();
  }, [fetchUrls]);

  const objs = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const handletrailer = (movie) => {
    // console.log(movie?.title);
    if (trailerUrl) {
      settrailerUrl("");
    } else {
      movieTrailer(movie?.title || movie?.name || movie.original_name || "")
        .then((url) => {
          const urlParam = new URLSearchParams(new URL(url).search);
          settrailerUrl(urlParam.get("v"));
        })
        .catch((err) => console.log(err));
    }
  };
  console.log(trailerUrl);
  return (
    <>
      <div className="row">
        <h1>{title}</h1>
        <div className="row_posters">
          {movies.map((movie, key) => (
            <img
              key={movie.id}
              className={`poster_img ${isLargeRow && "poster_img_large"}`}
              src={`${base_path}${
                isLargeRow ? movie.backdrop_path : movie.poster_path
              }`}
              alt={movie.name}
              onClick={() => handletrailer(movie)}
            />
          ))}
        </div>
        <div ref={scrollDiv} className="displayingvideo">
          {trailerUrl && <YouTube videoId={trailerUrl} opts={objs} />}
        </div>
      </div>
    </>
  );
}

export default Row;
