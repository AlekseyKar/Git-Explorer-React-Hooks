import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import UserProfile from "./components/UserProfile";
import Repositories from "./components/Repositories";
import Pagination from "./components/Pagination";

function App() {
  // Состояние для хранения данных пользователя
  const [user, setUser] = useState(null);
  // Состояние для хранения данных репозиториев
  const [repos, setRepos] = useState([]);
  // Состояние для хранения текущей страницы пагинации
  const [page, setPage] = useState(1);
  // Состояние для хранения общего количества страниц пагинации
  const [totalPages, setTotalPages] = useState(0);
  // Состояние для хранения состояния загрузки
  const [loading, setLoading] = useState(false);
  // Состояние для хранения сообщения об ошибке
  const [error, setError] = useState("");

  // Функция для получения данных пользователя и репозиториев по имени пользователя
  const getUserData = async (username) => {
    // Очищаем предыдущие данные и ошибки
    setUser(null);
    setRepos([]);
    setError("");
    // Устанавливаем состояние загрузки в true
    setLoading(true);
    try {
      // Создаем экземпляр класса AbortController для отмены запросов
      const controller = new AbortController();
      const signal = controller.signal;
      // Делаем параллельные запросы к API GitHub для получения данных пользователя и репозиториев
      const [userResponse, reposResponse] = await Promise.all([
        fetch(`https://api.github.com/users/${username}`, { signal }),
        fetch(
          `https://api.github.com/users/${username}/repos?page=1&per_page=10`,
          { signal }
        ),
      ]);
      // Проверяем статус ответов
      if (!userResponse.ok) {
        // Если ответ пользователя не успешный, выбрасываем ошибку с сообщением из ответа
        throw new Error(await userResponse.text());
      }
      if (!reposResponse.ok) {
        // Если ответ репозиториев не успешный, выбрасываем ошибку с сообщением из ответа
        throw new Error(await reposResponse.text());
      }
      // Преобразуем ответы в JSON формат
      const userData = await userResponse.json();
      const reposData = await reposResponse.json();
      // Устанавливаем данные пользователя и репозиториев в состояние
      setUser(userData);
      setRepos(reposData);
      // Вычисляем общее количество страниц пагинации по заголовку Link из ответа репозиториев
      const linkHeader = reposResponse.headers.get("Link");
      if (linkHeader) {
        // Разбиваем заголовок Link на части по запятой
        const links = linkHeader.split(",");
        // Находим часть, которая содержит rel="last"
        const lastLink = links.find((link) => link.includes('rel="last"'));
        if (lastLink) {
          // Извлекаем номер последней страницы из URL параметра page
          const lastPage = Number(lastLink.match(/page=(\d+)/)[1]);
          // Устанавливаем общее количество страниц в состояние
          setTotalPages(lastPage);
        }
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        // Если ошибка не связана с отменой запроса, устанавливаем сообщение об ошибке в состояние
        setError(error.message);
      }
    } finally {
      // Устанавливаем состояние загрузки в false
      setLoading(false);
    }
  };

  // Функция для получения данных репозиториев по номеру страницы пагинации
  const getReposData = async (page) => {
    // Очищаем предыдущие данные и ошибки
    setRepos([]);
    setError("");
    // Устанавливаем состояние загрузки в true
    setLoading(true);
    try {
      // Создаем экземпляр класса AbortController для отмены запросов
      const controller = new AbortController();
      const signal = controller.signal;
      // Делаем запрос к API GitHub для получения данных репозиториев по номеру страницы и лимиту на страницу (10)
      const response = await fetch(
        `https://api.github.com/users/${user.login}/repos?page=${page}&per_page=10`,
        { signal }
      );
      // Проверяем статус ответа
      if (!response.ok) {
        // Если ответ не успешный, выбрасываем ошибку с сообщением из ответа
        throw new Error(await response.text());
      }
      // Преобразуем ответ в JSON формат
      const data = await response.json();
      // Устанавливаем данные репозиториев в состояние
      setRepos(data);
    } catch (error) {
      if (error.name !== "AbortError") {
        // Если ошибка не связана с отменой запроса, устанавливаем сообщение об ошибке в состояние
        setError(error.message);
      }
    } finally {
      // Устанавливаем состояние загрузки в false
      setLoading(false);
    }
  };

  return (
    <div className="App">
      {/* Компонент строки поиска */}
      <SearchBar getUserData={getUserData} />

      {/* Если есть ошибка, показываем компонент с ошибкой */}
      {error && <div className="error">{error}</div>}

      {/* Если есть загрузка, показываем компонент с индикатором загрузки */}
      {loading && <div className="loading">Loading...</div>}

      {/* Если есть данные пользователя, показываем компонент профиля пользователя */}
      {user && <UserProfile user={user} />}

      {/* Если есть данные репозиториев, показываем компонент списка репозиториев */}
      {repos.length > 0 && <Repositories repos={repos} />}

      {/* Если есть данные пагинации, показываем компонент пагинации */}
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
}

export default App;
