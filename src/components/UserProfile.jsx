import React from "react";

const Profile = ({ user }) => {
  return (
    <div className="profile flex">
      {/* Avatar and name */}
      <div className="mr-4">
        <img
          src={user.avatar_url}
          alt={user.login}
          width="64"
          height="64"
          className="rounded-full"
        />
        <p className="mt-2 font-bold">{user.name}</p>
        <p className="text-sm">Followers: {user.followers}</p>
        <p className="text-sm">Following: {user.following}</p>
      </div>
      {/* Add code for displaying other information here */}
    </div>
  );
};

export default Profile;
