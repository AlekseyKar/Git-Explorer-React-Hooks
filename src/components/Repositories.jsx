import React from "react";

// Use arrow function instead of function declaration
const Repositories = ({ repos }) => {
  return (
    <div className="repositories flex">
      {/* Avatar and name */}
      <div className="mr-4">
        <img
          src={repos[0].owner.avatar_url}
          alt={repos[0].owner.login}
          width="64"
          height="64"
        />
        <p className="mt-2 font-bold">{repos[0].owner.login}</p>
      </div>
      {/* List of repositories */}
      <div className="flex-1">
        <h3 className="text-lg font-bold">Repositories</h3>
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
      </div>
    </div>
  );
};

export default Repositories;
