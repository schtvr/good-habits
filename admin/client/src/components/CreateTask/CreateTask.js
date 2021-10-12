import React, { useState } from 'react';
import './CreateTask.css';
const CreateTask = () => {


  const [formState, setFormState] = useState({});

  const updateForm = (newState) => {
    const updateState = {...formState};
    updateState[newState.target.name] = newState.target.value;
    setFormState(updateState);
  }

  const submitForm = (e) => {
    e.preventDefault();
    console.log(formState);
  }
  return (
    <div className="CreateTask">
      <h1>Add a task</h1>
      <form class="createTaskForm">
        <ul>
          <li>
            <label for="description">Pick a quest</label>
          </li>
          <li>
            <select onChange={updateForm} value={formState.quest} id="quest" placeholder="Pick quest" name="quest">
              <option value="volvo">Volvo</option>
            </select>
          </li>
          <li>
            <label for="name">Nadasdme</label>
          </li>
          <li>
            <input onChange={updateForm} value={formState.name} type="text" placeholder="Name of quest" name="name" maxlength="100" />   
          </li>
          <li>
            <label for="duration">Duration</label>
          </li>
          <li>
            <input onChange={updateForm} value={formState.duration} type="text" placeholder="Duration in days" name="duration" maxlength="100" />   
          </li>
          <li>
            <label for="category">Category</label>
          </li>
          <li>
            <input onChange={updateForm} value={formState.category} type="text" placeholder="Category of Quest" name="category" maxlength="100" />   
          </li>
          <li>
            <label for="exp">Exp</label>
          </li>
          <li>
            <input onChange={updateForm} value={formState.exp} type="text" placeholder="Exp gained from completion" name="exp" maxlength="100" />   
          </li>
          <li>
            <button onClick={submitForm} type="submit" className="submitButton">Submit</button>
          </li>
          
          
        </ul>
      </form>
    </div>
  )
};

export default CreateTask
