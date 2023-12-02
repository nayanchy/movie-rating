import "./App.css";
import Nav from "./components/Nav";
import Main from "./components/Main";
import { useEffect, useState } from "react";
import Logo from "./components/Logo";
import Search from "./components/Search";
import NumResults from "./components/NumResults";
import Box from "./components/Box";
import List from "./components/List";
import WatchedSummary from "./components/WatchedSummary";
import Loader from "./components/Loader";
import ErrorMessage from "./components/Error";
import SelectedMovie from "./components/SelectedMovie";

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

export default function App() {
  const KEY = "23aa28a5";
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleSearch = (query) => {
    setSearch(query);
  };

  const handleSelect = (movie) => {
    if (movie) {
      const movieId = movie.imdbID;
      if (selectedMovie && selectedMovie.imdbID === movieId) {
        setSelectedMovie(null);
      } else {
        setSelectedMovie(movieId);
      }
    }
  };

  const handleCloseMovie = () => setSelectedMovie(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        setErrorMessage("");
        const request = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${search}`
        );

        if (!request.ok) {
          throw new Error("Something went wrong! Please try again");
        }

        const response = await request.json();

        if (response.Response === "False") {
          throw new Error(response.Error);
        }
        setMovies(response.Search);
      } catch (error) {
        console.error(error);
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (search !== "") {
      const timeoutId = setTimeout(fetchMovies, 500);
      const cleanUp = () => {
        clearTimeout(timeoutId);
      };

      return cleanUp;
    } else {
      setMovies([]);
      setErrorMessage("");
    }
  }, [search]);

  return (
    <>
      <Nav>
        <Logo />
        <Search handleSearch={handleSearch} query={search} />
        <NumResults movies={movies} />
      </Nav>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !errorMessage && (
            <List
              movies={movies}
              isWatched={false}
              handleSelect={handleSelect}
            />
          )}
          {errorMessage && <ErrorMessage message={errorMessage} />}
        </Box>
        <Box>
          {selectedMovie ? (
            <SelectedMovie
              movie={selectedMovie}
              onCloseMovie={handleCloseMovie}
              KEY={KEY}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <List
                movies={watched}
                isWatched={true}
                selectedMovie={selectedMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}