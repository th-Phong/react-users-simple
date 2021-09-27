import React, { useState, useRef } from "react";
import Card from "../UI/Card.js";
import Button from "../UI/Button.js";
import ErrorModal from "../UI/ErrorModal.js";
import classes from "./AddUser.module.css";
import Wrapper from "../Helpers/Wrapper.js";

const AddUser = (props) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  // const [enteredUserName, setEnteredUserName] = useState("");
  // const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState("");

  // const usernameChangeHandler = (event) => {
  //   setEnteredUserName(event.target.value);
  // };
  // const ageChangeHandler = (event) => {
  //   setEnteredAge(event.target.value);
  // };

  const addUserHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredUserAge = ageInputRef.current.value;

    if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age (non-empty values) !",
      });
      return;
    }

    if (+enteredUserAge < 1) {
      setError({
        title: "Invalid age",
        message: "Please enter a valid age >0 !",
      });
      return;
    }
    props.onAddUser(enteredName, +enteredUserAge);
    // setEnteredUserName("");
    // setEnteredAge("");
    nameInputRef.current.value = "";
    ageInputRef.current.value = "";
  };

  const errorHandler = () => {
    setError(null);
  };
  return (
    <React.Fragment>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        ></ErrorModal>
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            // onChange={usernameChangeHandler}
            // value={enteredUserName}
            ref={nameInputRef}
          ></input>
          <label htmlFor="age">Age(Number)</label>
          <input
            id="age"
            type="number"
            // onChange={ageChangeHandler}
            // value={enteredAge}
            ref={ageInputRef}
          ></input>
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default AddUser;
