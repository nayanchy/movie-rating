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

export default function App() {
  const KEY = "23aa28a5";
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(() => {
    const savedData = JSON.parse(localStorage.getItem("movies"));
    return savedData;
  });
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [results, setResults] = useState(null);
  const [rating, setRating] = useState(null);

  const handleSearch = (query) => {
    setSearch(query);
  };

  const handleSelect = (movie) => {
    if (movie) {
      const movieId = movie.imdbID;
      if (selectedMovie && selectedMovie === movieId) {
        handleCloseMovie();
      } else {
        setSelectedMovie(movieId);
      }
    }
  };

  const handleCloseMovie = () => setSelectedMovie(null);

  const handleRating = (rating) => {
    setRating(rating);
  };

  const handleAddtoWatch = (movie) => {
    const watchedMovieObj = {
      imdbID: movie.imdbID,
      Title: movie.Title,
      Year: movie.Year,
      Poster: movie.Poster,
      runtime: +movie.Runtime.split(" ")[0],
      imdbRating: isNaN(+movie.imdbRating) ? 0 : +movie.imdbRating,
      userRating: +rating,
    };
    setWatched((prevWatched) => {
      return [...prevWatched, watchedMovieObj];
    });
    handleCloseMovie();
    setRating(0);
  };

  const handleDeleteWatched = (id) => {
    setWatched((prev) => {
      return prev.filter((movie) => movie.imdbID !== id);
    });
  };

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        setErrorMessage("");
        const request = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${search}&type=movie`
        );

        if (!request.ok) {
          throw new Error("Something went wrong! Please try again");
        }

        const response = await request.json();

        if (response.Response === "False") {
          throw new Error(response.Error);
        }
        // const totalPages = Math.ceil(response.totalResults / 10);
        setMovies(response.Search);
        setResults(response.totalResults);
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

  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(watched));
  }, [watched]);

  return (
    <>
      <Nav>
        <Logo />
        <Search handleSearch={handleSearch} query={search} />
        {results && <NumResults results={results} />}
      </Nav>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !errorMessage && (
            <>
              <List
                movies={movies}
                isWatched={false}
                handleSelect={handleSelect}
              />
            </>
          )}
          {errorMessage && <ErrorMessage message={errorMessage} />}
        </Box>
        <Box>
          {selectedMovie ? (
            <SelectedMovie
              movie={selectedMovie}
              onCloseMovie={handleCloseMovie}
              KEY={KEY}
              onAddToWatch={handleAddtoWatch}
              handleUserRating={handleRating}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <List
                movies={watched}
                isWatched={true}
                selectedMovie={selectedMovie}
                onDelete={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
