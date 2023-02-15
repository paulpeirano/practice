import React, { useState } from "react";
import "./App.css";
import Card from "./components/Card";
import Label from "./components/Label";
import UserInput from "./components/UserInput";
import Button from "./components/Button";
import UserList from "./components/UserList";
import ErrorModal from "./components/ErrorModal";
import ModalBackdrop from "./components/ModalBackdrop";

function App() {
  const [userAge, setUserAge] = useState("");
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  const [usernameError, setUsernameError] = useState(true);
  const [userAgeError, setUserAgeError] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  let content = "";

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    if (event.target.value.trim().length != 0) {
      setUsernameError(false);
    } else {
      setUsernameError(true);
    }
  };

  const handleUserAgeChange = (event) => {
    setUserAge(event.target.value);
    if (event.target.value > 0) {
      setUserAgeError(false);
    } else {
      setUserAgeError(true);
    }
  };

  const handleAddUserClick = () => {
    console.log(userAgeError, usernameError);
    if (!userAgeError && !usernameError && userAge != "" && username != "") {
      let newArray = [
        {
          userAge: userAge,
          username: username,
        },
        ...users,
      ];
      setUsers(newArray);
      setUserAge("");
      setUsername("");
      setUserAgeError(true);
      setUsernameError(true);
      setIsModalVisible(false);
    } else {
      setIsModalVisible(true);
      if (userAgeError) {
        setErrorMessage("Please enter a valid age ( >0 )");
      } else {
        setErrorMessage("Please enter a username.");
      }
    }
  };

  const handleModalAck = (event) => {
    setIsModalVisible(false);
  };

  content = (
    <div>
      <ModalBackdrop
        className="backdrop"
        isVisible={isModalVisible}
        message={errorMessage}
        onClick={handleModalAck}
      />
      <Card>
        <Label labelFor="username" label="Username" />
        <UserInput
          id="username"
          onChange={handleUsernameChange}
          type="text"
          value={username}
        />
        <Label labelFor="age" label="Age (Years) " />
        <UserInput
          id="age"
          onChange={handleUserAgeChange}
          type="number"
          value={userAge}
        />
        <Button onClick={handleAddUserClick} text="Add User" />
      </Card>
    </div>
  );

  if (users.length > 0) {
    content = (
      <div>
        <ModalBackdrop
          className="backdrop"
          isVisible={isModalVisible}
          message={errorMessage}
          onClick={handleModalAck}
        />
        <Card>
          <Label labelFor="username" label="Username" />
          <UserInput
            id="username"
            onChange={handleUsernameChange}
            type="text"
            value={username}
          />
          <Label labelFor="age" label="Age (Years) " />
          <UserInput
            id="age"
            onChange={handleUserAgeChange}
            type="number"
            value={userAge}
          />
          <Button onClick={handleAddUserClick} text="Add User" />
        </Card>
        <Card>
          <UserList users={users} />
        </Card>
      </div>
    );
  }

  return content;
}

export default App;
