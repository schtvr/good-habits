import React, { useEffect, useState } from 'react';
import './CreateQuest.css';
const CreateQuest = () => {

  const [formState, setFormState] = useState({});
  useEffect(() => {
    const getAllQuests = async () => {
      const res = await fetch('http://localhost:3001/quests');
      const jsonRes = await res.json();
    }
  }, [])
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
    <div className="CreateQuest">
      <h1>Create A Quest</h1>
      <form class="createQuestForm">
        <ul>
          <li>
            <label for="description">Description</label>
          </li>
          <li>
            <textarea onChange={updateForm} value={formState.description} id="description" placeholder="Description of quest" name="description" rows="4" cols="50"/>
          </li>
          <li>
            <label for="name">Name</label>
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

export default CreateQuest
