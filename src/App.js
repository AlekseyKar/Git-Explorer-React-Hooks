import React, { useState } from "react";
import SearchBar from "./components/SearchBar.jsx";
import UserProfile from "./components/UserProfile.jsx";
import Repositories from "./components/Repositories.jsx";
import Pagination from "./components/Pagination.jsx";

const App = () => {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getUserData = async (username) => {
    setUser(null);
    setRepos([]);
    setError("");
    setLoading(true);
    try {
      const controller = new AbortController();
      const signal = controller.signal;
      const [userResponse, reposResponse] = await Promise.all([
        fetch(`https://api.github.com/users/${username}`, { signal }),
        fetch(
          `https://api.github.com/users/${username}/repos?page=1&per_page=10`,
          { signal }
        ),
      ]);
      if (!userResponse.ok) {
        throw new Error(await userResponse.text());
      }
      if (!reposResponse.ok) {
        throw new Error(await reposResponse.text());
      }
      const userData = await userResponse.json();
      const reposData = await reposResponse.json();
      setUser(userData);
      setRepos(reposData);
      const linkHeader = reposResponse.headers.get("Link");
      if (linkHeader) {
        const links = linkHeader.split(",");
        const lastLink = links.find((link) => link.includes('rel="last"'));
        if (lastLink) {
          const lastPage = Number(lastLink.match(/page=(\d+)/)[1]);
          // Set the total number of pages to state
          setTotalPages(lastPage);
        }
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const getReposData = async (page) => {
    setRepos([]);
    setError("");
    setLoading(true);
    try {
      const controller = new AbortController();
      const signal = controller.signal;
      const response = await fetch(
        `https://api.github.com/users/${user.login}/repos?page=${page}&per_page=10`,
        { signal }
      );
      if (!response.ok) {
        throw new Error(await response.text());
      }
      const data = await response.json();
      setRepos(data);
    } catch (error) {
      if (error.name !== "AbortError") {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <SearchBar getUserData={getUserData} />

      {error && <div className="error text-red-500 font-bold">{error}</div>}

      {loading && (
        <div className="loading text-blue-500 font-bold">Loading...</div>
      )}

      {user && <UserProfile user={user} />}

      {repos.length > 0 && <Repositories repos={repos} />}

      {totalPages > 0 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          setPage={setPage}
          getReposData={getReposData}
        />
      )}
    </div>
  );
};

export default App;
