import { useState, useRef } from "react";
import './App.css'

export default function App() {
  // States and variables
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [foodList, setFoodList] = useState([]);
  const inputRef = useRef(null);
  const totalCalories = foodList.reduce((total, food) => {
    return total + Number(food.calories || 0);
  }, 0);

  // Add information from user input into foodList
  // Empty textboxes to ready for next input
  function addFood(ev) {
    ev.preventDefault();
    const food = { name, calories };
    // Check input value of calories (whole/valid number)
    // Check that food input isn't blank
    if (isNaN(+calories) || calories.includes('.')) {
      alert("Please input a valid number.");
      return;
    }
    if (name.trim() === "") {
      alert("Please input a food name.");
      return;
    }

    setFoodList(prevList => [...prevList, food]);
    setName("");
    setCalories("");
    inputRef.current.focus();
  }

  // Render foods in foodList, most recent entry appears on top
  function renderFoodList() {
    const options = [];
    const reversedFoodList = [...foodList].reverse();
    for (let i = 0; i < reversedFoodList.length; i++) {
      options[i] = (
        <option key={i}>
          {reversedFoodList[i].name}: {reversedFoodList[i].calories}
        </option>
      );
    }

    return options;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column"
      }}
    >
      <h1>om nom nom</h1>
      <p>Calories: {totalCalories}</p>
      <br />
      <div className="container">
        <input
          ref={inputRef}
          placeholder="Ex: bologne"
          value={name}
          onChange={(e) => setName(e.target.value)}>
        </input>
        <input
          placeholder="Ex: 150"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}>
        </input>
        {/*for later
       
        <select>
          <option>Breakfast</option>
          <option>Lunch</option>
          <option>Dinner</option>
        </select>
      */}
        <button onClick={addFood}>
          Eat!
        </button>
      </div>

      <div className="food-list">{renderFoodList()}</div>
    </div>
  )
}

