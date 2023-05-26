import React, { useEffect } from "react";

function Pagination({ page, totalPages, setPage, getReposData }) {
  // Эффект для получения данных репозиториев при изменении номера страницы
  useEffect(() => {
     getReposData(page);
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // Функция для обработки клика по кнопке предыдущей страницы
  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  // Функция для обработки клика по кнопке следующей страницы
  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="pagination">
      {/* Кнопка предыдущей страницы */}
      <button onClick={handlePrev} disabled={page === 1}>
        Prev
      </button>
      {/* Текущая страница и общее количество страниц */}
      <span>
        {page} / {totalPages}
      </span>
      {/* Кнопка следующей страницы */}
      <button onClick={handleNext} disabled={page === totalPages}>
        Next
      </button>
    </div>
  );
}

export default Pagination;
