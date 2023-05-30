import React from "react";
import Pagination from "./Pagination";
import { useState } from "react";

const Repositories = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [repos, setRepos] = useState([]);

  const getReposData = async (page) => {
  const response = await fetch(
    `https://api.github.com/users/octocat/repos?page=${page}`
  );
  if (response.ok) {
    const data = await response.json();
    setRepos(data);
    const link = response.headers.get("link");
    const regex = /page=(\d+)>; rel="last"/;
    const match = regex.exec(link);
    if (match) {
      setTotalPages(Number(match[1]));
    }
  } else {
    console.error(
      "Something went wrong:",
      response.status,
      response.statusText
    );
  }
  };    

  return (
    <section className="bg-gray-100 p-4">
      <div className="repositories flex m-4">
        <div className="mr-4">
          <img
            src={repos[0].owner.avatar_url}
            alt={repos[0].owner.login}
            width="400"
            height="500"
          />
          <p className="mt-2 font-bold">{repos[0].owner.login}</p>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold">Repositories</h3>
          <p className="text-gray-500">{repos.length} repositories</p>
          <ul className="mt-2 space-y-2">
            {repos.map((repo) => (
              <li key={repo.id} className="p-4 bg-white rounded-md shadow-md">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {repo.name}
                </a>
              </li>
            ))}
          </ul>
          <Pagination
            page={page}
            totalPages={totalPages}
            setPage={setPage}
            getReposData={getReposData}
          />
        </div>
      </div>
    </section>
  );
};

export default Repositories;
