import React, { useState } from "react";
import axios from "axios";

function SearchBar() {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://api.github.com/users/${query}`);
      console.log(response.data);
    } catch (err) {
      // Handle the error
    }
  };

  return (
    // Section with light background and padding
    <section className="bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search for a user..."
          className="flex-1 px-4 py-2 rounded-l-md focus:outline-none"
        />
        <img
          src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
          alt="GitHub logo"
          width="42"
          height="42"
          className="ml-2 mr-2"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-white text-blue-500 font-bold rounded-r-md focus:outline-none"
        >
          Search
        </button>
      </form>
    </section>
  );
}

export default SearchBar;
