import React, { useEffect, useState } from 'react';
import './CreateTask.css';
const CreateTask = () => {


  const [formState, setFormState] = useState({});
  const [currentQuests, setCurrentQuests] = useState([]);
  useEffect(()=> {
    const getAllQuests = async () => {
      console.log('howdy');

      const res = await fetch('http://localhost:3001/quests', {
        method: 'get',
        mode: "cors", // or without this line
        headers: {
          'content-type': 'application/json'
        }
      });
      const json = await res.json();
      console.log('hi')
      setCurrentQuests([
        ...currentQuests,
        ...json.data
      ])
    }
    getAllQuests();
  },[])
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
    <div className="createBox">
      <h1>Add a task</h1>
      <form class="createTaskForm">
        <ul>
          <li>
            <label for="description">Pick a quest</label>
          </li>
          <li>
            <select onChange={updateForm} value={formState.quest} id="quest" placeholder="Pick quest" name="quest">
              {currentQuests.map((quest) => (
                <option key={quest.name} value={quest.name}>{quest.name}</option>
              ))}
            </select>
          </li>
          <li>
            <label for="description">Description</label>
          </li>
          <li>
            <input onChange={updateForm} value={formState.description} type="text" placeholder="description" name="exp" maxlength="100" />   
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
