/* Form component that gets input for Username and Age */

import Button from "../UI/Button";
import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import { useState, useRef } from "react";
import { ErrorModal } from "../UI/ErrorModal";

const AddUser = (props) => {

  // Initialize error state
  const [error, setError] = useState();

  // Refs must be used inside the component function, it will NOT work in a nested function inside the component
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  const addUserHandler = (event) => {
    // Prevents the default behavior of sending POST data from the form to the server
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredUserAge = ageInputRef.current.value;

    // Validation: If the entered username or age is empty
    if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0) {
      setError({
        title: "Invalid Input",
        message: "Please enter a valid name and age",
      });
      return;
    }

    // Validation: If the entered age is less than 1
    if (+enteredUserAge < 1) {
      setError({
        title: "Invalid Age",
        message: "Please enter a number greater than 0",
      });
      return;
    }

    // Invoke the addUserHandler from props
    props.onAddUser(enteredName, enteredUserAge);

    // Reset the values
    nameInputRef.current.value = "";
    ageInputRef.current.value = "";
  };

  // Custom handler that clears the error state
  const clearErrorHandler = () => {
    setError(null);
  };

  return (
    <>
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
            ref={nameInputRef}
          />
          <label htmlFor="age">Age</label>
          <input id="age" type="number" ref={ageInputRef} />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </>
  );
};

export default AddUser;
