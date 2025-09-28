import { useState, useRef } from "react";
import sound from "/public/nom.mp3";
import './App.css'

export default function App() {
  // States and variables
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");

  const foodListStr = localStorage.getItem("foodList");
  const initFoodList = foodListStr !== null ? JSON.parse(foodListStr) : [];
  const [foodList, setFoodList] = useState(initFoodList);
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
    // Check that food input isn't blank & doesn't include duplicates
    if (isNaN(+calories) || calories.includes('.')) {
      alert("Please input a valid number.");
      return;
    }
    if (name.trim() === "") {
      alert("Please input a food name.");
      return;
    }
    const lowerCaseName = name.toLowerCase()
    if (foodList.find(food => food.name.toLowerCase() === lowerCaseName)) {
      alert("No duplicates :3")
      return;
    }

    // Update the state with newly inputted food item
    // Save to local storage
    setFoodList(prevList => {
      const newList = [...prevList, food];
      localStorage.setItem("foodList", JSON.stringify(newList));
      return newList;
    });
    setName("");
    setCalories("");
    inputRef.current.focus();
    playSound();
  }

  // Map foods in foodList, most recent entry appears on top
  function renderFoodList() {
    return foodList.toReversed().map(food => {
      const keyName = food.name;

      // Delete by filtering out the name of deleted food from foodList
      const handleDelete = () => {
        setFoodList(prev => {
          const newList = prev.filter(food => food.name !== keyName);
          localStorage.setItem("foodList", JSON.stringify(newList));
          return newList;
        })
      }

      // Render the new food with a delete button
      return (
        <div className="food-info" key={keyName}>
          <span>{keyName}: {food.calories}</span>
          <button className="delete-btn" onClick={handleDelete}>Delete</button>
        </div>
      );
    })
  }

  // Plays audio
  function playSound() {
    new Audio(sound).play();
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column"
      }}
    >
      <h1 className="title">om nom nom</h1>
      <p className="title">Calories: {totalCalories}</p>
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

        <button className="eat-btn" onClick={addFood}>
          Eat!
        </button>
      </div>

      <div
        className="food-list"
        style={{
          display: foodList.length ? "flex" : "none"
        }}
      >
        {renderFoodList()}
      </div>
    </div>
  )
}

