const Pagination = ({
  pageNumber,
  setPageNumber,
  isDisabled,
  totalPage,
  currentPage,
}) => {
  const generatePageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPage < maxVisiblePages) {
      // If total pages are less than or equal to maxVisiblePages, show all pages
      for (let i = 1; i <= totalPage; i++) {
        pageNumbers.push(i);
      }
    } else {
      const halfVisiblePages = Math.floor(maxVisiblePages / 2);
      let startPage = currentPage - halfVisiblePages;
      let endPage = currentPage + halfVisiblePages;
      if (startPage < 1) {
        startPage = 1;
        endPage = maxVisiblePages;
      } else if (endPage > totalPage) {
        endPage = totalPage;
        startPage = totalPage - maxVisiblePages + 1;
      }

      // Add ellipses at the beginning and end if necessary
      if (startPage > 1) {
        pageNumbers.push(1);
        if (startPage > 2) {
          pageNumbers.push("..."); // Ellipsis for skipped pages
        }
      }

      // Add visible page numbers
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      // Add ellipses at the end if necessary
      if (endPage < totalPage) {
        if (endPage < totalPage - 1) {
          pageNumbers.push("..."); // Ellipsis for skipped pages
        }
        pageNumbers.push(totalPage);
      }
    }
    return pageNumbers;
  };

  const pageNumbers = generatePageNumbers();
  console.log(pageNumbers);
  return (
    <>
      <div className="pagination">
        <button
          onClick={() => setPageNumber(pageNumber - 1)}
          disabled={currentPage === 1}
        >
          Previous Page
        </button>
        {pageNumbers.map((pageNum, index) => (
          <span
            key={index}
            onClick={() => {
              if (typeof pageNum === "number") {
                setPageNumber(pageNum);
              }
            }}
            className={pageNum === currentPage ? "active" : ""}
          >
            {pageNum}
          </span>
        ))}
        <button
          onClick={() => setPageNumber(pageNumber + 1)}
          disabled={isDisabled} // Disable if no more results
        >
          Next Page
        </button>
      </div>
    </>
  );
};

export default Pagination;
