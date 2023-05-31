import React, { useState } from "react";
import axios from "axios"; // запрос к API github

function App() {
  // Состояние поиска, пользователя и репозиториев
  const [query, setQuery] = useState("");
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  // Создаем состояние для пагинации
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Обработка изменения строки поиска
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  // Обработка нажатия на кнопку поиска
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userResponse = await axios.get(
        `https://api.github.com/users/${query}`
      );
      setUser(userResponse.data);
      // Отправляем запрос к API github для получения списка репозиториев пользователя
      const reposResponse = await axios.get(
        `https://api.github.com/users/${query}/repos?page=${page}&per_page=10`
      );
      setRepos(reposResponse.data);
      // Вычисляем общее количество страниц для пагинации
      const totalRepos = userResponse.data.public_repos;
      const totalPages = Math.ceil(totalRepos / 10);
      setTotalPages(totalPages);
    } catch (error) {
      // Если произошла ошибка, выводим сообщение в консоль и очищаем состояния user и repos
      console.log(error.message);
      setUser(null);
      setRepos([]);
    }
  };

  // Функция для обработки изменения страницы пагинации
  const handlePageChange = async (newPage) => {
    try {
      setPage(newPage);
      // Отправляем запрос к API github для получения списка репозиториев пользователя на новой странице
      const reposResponse = await axios.get(
        `https://api.github.com/users/${query}/repos?page=${newPage}&per_page=10`
      );
      setRepos(reposResponse.data);
    } catch (error) {
      // Если произошла ошибка, выводим сообщение в консоль и очищаем состояние repos
      console.log(error.message);
      setRepos([]);
    }
  };

  // Возвращаем JSX разметку для отображения приложения
  return (
    <>
      <div className="bg-blue-400">
        <form
          onSubmit={handleSubmit}
          className="container mx-auto px-4 py-4 flex items-center"
        >
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
      </div>
      <div className="container mx-auto px-4 py-8">
        {user ? (
          <div className="flex flex-wrap mt-8">
            <div className="w-full md:w-1/3 p-4">
              <div className="bg-white shadow-lg rounded-lg p-8">
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  className="w-32 h-32 mx-auto rounded-full"
                />
                <h2 className="text-2xl font-bold text-center mt-4">
                  {user.name}
                </h2>
                <p className="text-gray-600 text-center mt-2">{user.bio}</p>
                <div className="flex justify-between mt-4">
                  <div className="text-center">
                    <p className="text-xl font-bold">{user.followers}</p>
                    <p className="text-gray-600">Подписчики</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold">{user.following}</p>
                    <p className="text-gray-600">Подписки</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-2/3 p-4">
              <h2 className="text-xl font-bold text-gray-800">
                Репозитории ({user.public_repos})
              </h2>
              {repos.length > 0 ? (
                <>
                  <ul className="mt-4 divide-y divide-gray-200">
                    {repos.map((repo) => (
                      <li
                        key={repo.id}
                        className="py-4 flex items-center justify-between"
                      >
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          {repo.name}
                        </a>
                        <span className="text-gray-600">{repo.language}</span>
                      </li>
                    ))}
                  </ul>
                  {totalPages > 1 && (
                    <div className="mt-4 flex items-center justify-end space-x-2">
                      {page > 1 && (
                        <button
                          onClick={() => handlePageChange(page - 1)}
                          className="p-2 bg-blue-500 text-white rounded-md"
                        >
                          Назад
                        </button>
                      )}
                      {page < totalPages && (
                        <button
                          onClick={() => handlePageChange(page + 1)}
                          className="p-2 bg-blue-500 text-white rounded-md"
                        >
                          Вперед
                        </button>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <p className="mt-4 text-gray-600">Нет репозиториев</p>
              )}
            </div>
          </div>
        ) : (
          <div className="mt-8 bg-white bg-opacity-50 p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-center text-gray-500">
              Пользователь не найден.
            </h2>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
