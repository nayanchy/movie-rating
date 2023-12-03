import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";
import ErrorMessage from "./Error";

const SelectedMovie = ({ movie, onCloseMovie, KEY, onAddToWatch }) => {
  const [selectedMovie, setSelectedMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    Actors: actors,
    imdbRating,
    Plot: plot,
    Released: released,
    Director: director,
    Genre: genre,
  } = selectedMovie;

  useEffect(() => {
    if (movie) {
      const fetchMovie = async () => {
        setIsLoading(true);
        try {
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&i=${movie}`
          );
          if (!res.ok) {
            throw new Error("Something went wrong!");
          }
          const movieData = await res.json();
          if (movieData.Response === "False") {
            throw new Error(movieData.Error);
          }
          setSelectedMovie(movieData);
        } catch (error) {
          console.error(error);
          setErrorMessage(error.message);
        } finally {
          setIsLoading(false);
        }
      };
      fetchMovie();
    }
  }, [movie]);

  const renderedHTML = (
    <div className="details">
      <header>
        <button className="btn-back" onClick={onCloseMovie}>
          &larr;
        </button>
        <img src={poster} alt={`Poster of ${title} released in ${year}`} />
        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            {released} | {runtime}
          </p>
          <p>{genre}</p>
          <p>
            <span>⭐️</span>
            {imdbRating} IMDB Rating
          </p>
        </div>
      </header>
      <section>
        <div className="rating">
          <StarRating maxRating={10} size={24} />
        </div>
        <p>{plot}</p>
        <p>Starring: {actors}</p>
        <p>Directed By: {director}</p>
        <button className="btn-add" onClick={() => onAddToWatch(selectedMovie)}>
          Add to watchlist
        </button>
      </section>
    </div>
  );

  // Return the JSX based on isLoading condition
  return (
    (isLoading && <Loader />) ||
    (!isLoading && !errorMessage && renderedHTML) ||
    (errorMessage && <ErrorMessage message={errorMessage} />)
  );
};

export default SelectedMovie;
