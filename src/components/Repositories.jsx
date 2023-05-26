import React from "react";

function Repositories({ repos }) {
  return (
    <div className="repositories">
      {/* Заголовок списка репозиториев */}
      <h3>Repositories</h3>
      {/* Список репозиториев */}
      <ul>
        {repos.map((repo) => (
          // Элемент списка с ссылкой на репозиторий
          <li key={repo.id}>
            <a href={repo.html_url} target="_blank" rel="noreferrer">
              {repo.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Repositories;
