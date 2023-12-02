const Search = ({ handleSearch, query }) => {
  const handleQuery = (e) => {
    const newQuery = e.target.value;
    handleSearch(newQuery);
  };
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={handleQuery}
    />
  );
};

export default Search;
