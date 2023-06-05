/* Form component that gets input for Username and Age */

import Button from "../UI/Button";
import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import { useState } from "react";
import { ErrorModal } from "../UI/ErrorModal";

const AddUser = (props) => {
  // Initialize state for both username and age
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredAge, setEnteredAge] = useState("");

  // Initialize error state
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    // Prevents the default behavior of sending POST data from the form to the server
    event.preventDefault();

    // Validation: If the entered username or age is empty
    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: "Invalid Input",
        message: "Please enter a valid name and age",
      });
      return;
    }

    // Validation: If the entered age is less than 1
    if (+enteredAge < 1) {
      setError({
        title: "Invalid Age",
        message: "Please enter a number greater than 0",
      });
      return;
    }

    // Invoke the addUserHandler from props
    props.onAddUser(enteredUsername, enteredAge);

    // Reset the username and age field to blank after submitting
    setEnteredUsername("");
    setEnteredAge("");
  };

  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };

  // Custom handler that clears the error state
  const clearErrorHandler = () => {
    setError(null);
  };

  return (
    // If the user clicks outside the Error Modal, it clears the error.
    <div onClick={clearErrorHandler}>
      {/* If an error exists, display the Error Modal */}
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onClear={clearErrorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            onChange={usernameChangeHandler}
            value={enteredUsername}
          />
          <label htmlFor="age">Age</label>
          <input id="age" type="number" onChange={ageChangeHandler} />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
