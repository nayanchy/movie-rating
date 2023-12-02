const ListItem = ({ movie, isWatched, handleSelect }) => {
  const handleClick = () => {
    if (!isWatched) {
      // console.log(movie);
      handleSelect(movie);
    }
  };
  return (
    <li onClick={handleClick}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      {!isWatched && (
        <div>
          <p>
            <span>🗓</span>
            <span>{movie.Year}</span>
          </p>
        </div>
      )}
      {isWatched && (
        <div>
          <p>
            <span>⭐️</span>
            <span>{movie.imdbRating}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{movie.userRating}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{movie.runtime} min</span>
          </p>
        </div>
      )}
    </li>
  );
};

export default ListItem;
