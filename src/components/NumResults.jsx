const NumResults = ({ results }) => {
  return (
    <p className="num-results">
      Found <strong>{results ? results : 0}</strong> results
    </p>
  );
};

export default NumResults;
