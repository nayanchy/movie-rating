import ListItem from "./ListItem";

const List = ({ movies, isWatched, handleSelect }) => {
  return (
    <ul className={`list ${!isWatched && "list-movies"}`}>
      {movies?.map((movie) => (
        <ListItem
          movie={movie}
          key={movie.imdbID}
          isWatched={isWatched}
          handleSelect={handleSelect}
        />
      ))}
    </ul>
  );
};

export default List;
