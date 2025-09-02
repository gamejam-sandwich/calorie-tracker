import { useState } from 'react'
import './App.css'

export default function App() {
  let totalCalories = 0;
  /* FUNCTIONS
    onclick for logging a food
    onclick for deleting logs later
    addfood(event): unpack data from the form into array
    update calorie total
  */
  function handleClick() {

  }

  function handleInputChange(ev) {

  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column"
      }}
    >
      {/*
      title, calorie count
      --------------------
      btn to log food,
      input to write food name & calories,
      selector for which meal,
      empty div to contain list of foods,
      */}
      <h1>om nom nom</h1>
      <p>{totalCalories} calories</p>
      <br />
      <div className="input-container">
        <input placeholder="Ex: bologne" onInput={handleInputChange}></input>
        <input placeholder="Ex: 150" onInput={handleInputChange}></input>
        <select>
          <option>Breakfast</option>
          <option>Lunch</option>
          <option>Dinner</option>
        </select>
        <button onClick={handleClick}>om nom nom</button>
      </div>

    </div>
  )
}

