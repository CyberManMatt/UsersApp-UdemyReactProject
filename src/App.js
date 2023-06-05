import React, { useState } from "react";
import AddUser from "./components/Users/AddUser";
import { UsersList } from "./components/Users/UsersList";

function App() {
  // Initialize state for usersList
  const [usersList, setUsersList] = useState([]);

  // Handler that executes when a user is added
  const addUserHandler = (userName, userAge) => {
    setUsersList((prev) => {
      // Return previous state for the array and add the new object
      return [
        ...prev,
        { id: Math.random.toString(), name: userName, age: userAge },
      ];
    });
  };

  return (
    <div>
      <AddUser onAddUser={addUserHandler} />
      <UsersList users={usersList} />
    </div>
  );
}

export default App;
