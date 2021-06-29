import "./App.css";
import Banner from "./Banner";
import Footer from "./Footer";
import Header from "./Header";
import requests from "./request";
import Row from "./Row";

function App() {
  return (
    <div className="App">
      <Header />
      <Banner />
      <Row title="Trending Now" fetchUrls={requests.fetchTrending} isLargeRow />
      <Row
        title="NETFLIX ORIGINALS"
        fetchUrls={requests.fetchNetflixOriginals}
      />

      <Row title="Top Rated" fetchUrls={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrls={requests.fetchActionMovies} />

      <Row title="Comedy Movies" fetchUrls={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrls={requests.fetchHorrorMovies} />

      <Row title="Romance Movies" fetchUrls={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrls={requests.fetchDocumentaries} />
      <Footer />
    </div>
  );
}

export default App;
