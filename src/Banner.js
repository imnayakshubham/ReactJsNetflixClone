import React, { useEffect, useState } from "react";
import axios from "./axios";
import requests from "./request";
import "./Banner.css";

function Banner() {
  const [bg, setbg] = useState([]);
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
  return (
    <header>
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
            <button className="banner_btn">Play</button>
            <button className="banner_btn">My List</button>
          </div>
          <div>
            <h1 className="banner_desc">{truncate(bg?.overview,225)}
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Banner;

// bg?.title  ? is used as optional chaining bcoz it does not allow code to crash when error occurs.
