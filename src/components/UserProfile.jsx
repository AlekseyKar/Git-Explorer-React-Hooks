import React from "react";

function UserProfile({ user }) {
  return (
    <div className="user-profile">
      {/* Аватар пользователя */}
      <img src={user.avatar_url} alt={user.name} />
      {/* Имя пользователя */}
      <h2>{user.name}</h2>
      {/* Количество подписок и подписчиков пользователя */}
      <p>
        Following: {user.following} | Followers: {user.followers}
      </p>
    </div>
  );
}

export default UserProfile;
