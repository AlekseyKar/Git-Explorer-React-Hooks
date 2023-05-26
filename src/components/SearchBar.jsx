import React, { useState } from "react";

function SearchBar({ getUserData }) {
  // Состояние для хранения значения инпута поиска
  const [searchValue, setSearchValue] = useState("");

  // Функция для обработки изменения инпута поиска
  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  // Функция для обработки отправки формы поиска
  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchValue.trim()) {
      getUserData(searchValue.trim());
    }
  };

  return (
    <div className="search">
      {/* Форма поиска */}
      <form onSubmit={handleSubmit}>
        {/* Инпут поиска */}
        <input
          type="text"
          value={searchValue}
          onChange={handleChange}
          placeholder="Enter GitHub username"
        />
        {/* Кнопка поиска */}
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default SearchBar;
