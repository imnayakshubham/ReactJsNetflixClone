import React, { createRef, useEffect, useState } from "react";
import axios from "./axios";
import requests from "./request";
import "./Banner.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

function Banner() {
  const [bg, setbg] = useState([]);
  const [trailerUrl, settrailerUrl] = useState("");
  const scrollDiv = createRef();
  console.log(scrollDiv);

  useEffect(() => {
    async function fetchData() {
      const req = await axios.get(requests.fetchTrending);
      setbg(
        req.data.results[
          Math.floor(Math.random() * req.data.results.length - 1)
        ]
      );
      return req;
    }
    fetchData();
  }, []);
  const limit = 150;
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  const objs = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const handletrailer = async (bg) => {
    // console.log(movie);
    if (trailerUrl) {
      settrailerUrl("");
    } else {
      movieTrailer(bg?.title || bg?.name || bg.original_name || "")
        .then((url) => {
          const urlParam = new URLSearchParams(new URL(url).search);
          settrailerUrl(urlParam.get("v"));
        })
        .catch((err) => console.log(err));
    }
    // scrollDiv.current.scrollIntoView({ behavior: "smooth" });
    window.scrollTo(0, scrollDiv.current.offsetTop);
  };

  return (
    <>
      <div ref={scrollDiv} className="displayingvideo">
        {trailerUrl && <YouTube videoId={trailerUrl} opts={objs} />}
      </div>
      <div
        className="banner"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${bg?.backdrop_path}")`,
          backgroundPosition: "center center",
        }}
      >
        <div className="banner_component">
          <h1 className="banner_title">
            {bg?.title || bg?.original_title || bg?.name}
          </h1>
          <div className="banner_btns">
            <button className="banner_btn" onClick={() => handletrailer(bg)}>
              Play
            </button>
            <button className="banner_btn">My List</button>
          </div>
          <div>
            <h1 className="banner_desc">{truncate(bg?.overview, 225)}</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;

// bg?.title  ? is used as optional chaining bcoz it does not allow code to crash when error occurs.
