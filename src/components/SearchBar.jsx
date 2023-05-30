import React, { useState } from "react";
import axios from "axios";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://api.github.com/users/${query}`);
      setUser(response.data);
      setError(null);
    } catch (err) {
      setUser(null);
      setError(err.message);
    }
  };

  return (
    <div className="bg-blue-500 sticky top-0 p-4">
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
          width="32"
          height="32"
          className="ml-2 mr-4"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-white text-blue-500 font-bold rounded-r-md focus:outline-none"
        >
          Search
        </button>
      </form>
      {user && (
        <div className="mt-4 flex">
          <div className="mr-4">
            <img
              src={user.avatar_url}
              alt={user.login}
              width="64"
              height="64"
            />
            <p className="mt-2 font-bold">{user.name}</p>
            <p className="text-sm">Followers: {user.followers}</p>
            <p className="text-sm">Following: {user.following}</p>
          </div>
          {/* Add code for displaying repositories and pagination here */}
        </div>
      )}
      {error && <p className="mt-4 text-white font-bold">{error}</p>}
    </div>
  );
}

export default SearchBar;
