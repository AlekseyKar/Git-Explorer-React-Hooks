import React, { useEffect } from "react";

const Pagination = ({ page, totalPages, setPage, getReposData }) => {
  useEffect(() => {
    getReposData(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="pagination">
      {/* Previous page button */}
      <button onClick={handlePrev} disabled={page === 1}>
        Prev
      </button>
      {/* Current page and total pages */}
      <span>
        {page} / {totalPages}
      </span>
      {/* Next page button */}
      <button onClick={handleNext} disabled={page === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
