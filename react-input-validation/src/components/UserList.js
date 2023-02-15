import React from "react";
import User from "./User";

const UserList = (props) => {
  return (
    <div>
      {props.users.map((user) => {
        return (
          <User
            key={Math.random()}
            username={user.username}
            userAge={user.userAge}
          />
        );
      })}
    </div>
  );
};

export default UserList;
