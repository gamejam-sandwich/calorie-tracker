import { useState, useRef } from "react";
import './App.css'

export default function App() {
  // States and variables
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");

  const foodListStr = localStorage.getItem("foodList");
  const initFoodList = foodListStr !==null ? JSON.parse(foodListStr) : [];
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
    // Check that food input isn't blank
    if (isNaN(+calories) || calories.includes('.')) {
      alert("Please input a valid number.");
      return;
    }
    if (name.trim() === "") {
      alert("Please input a food name.");
      return;
    }
    const lowerCaseName = name.toLowerCase()
    if(foodList.find(food => food.name.toLowerCase() === lowerCaseName)){
      alert("No duplicates :3")
      return;
    }

    setFoodList(prevList => {
      const newList = [...prevList, food];
      localStorage.setItem("foodList", JSON.stringify(newList));
      return newList;
    });
    setName("");
    setCalories("");
    inputRef.current.focus();
  }

  // Render foods in foodList, most recent entry appears on top
  function renderFoodList() {
    return foodList.toReversed().map(food => {
      const keyName = food.name;

      const handleDelete = () => {
        setFoodList(prev => {
          const newList = prev.filter(food => food.name !== keyName);
          localStorage.setItem("foodList", JSON.stringify(newList));
          return newList;
        })
      }

      return(
        <div key={keyName}>
          <span>{keyName} : {food.calories}</span>
          <button className="delete-btn" onClick={handleDelete}>Delete</button>
        </div>
      );
    })
    /*const list = [];
    const reversedFoodList = [...foodList].reverse();
    
    for (let i = 0; i < reversedFoodList.length; i++) {
      const keyName = reversedFoodList[i].name;

      const handleDelete = () => {
        setFoodList(prev => {
          const newList = prev.filter(food => food.name !== keyName);
          console.log(newList);
          localStorage.setItem("foodList", JSON.stringify(newList));
          return newList;
        })
      }

      list[i] = (
        <div key={keyName}>
          <span>{keyName} : {reversedFoodList[i].calories}</span>
          <button className="delete-btn" onClick={handleDelete}>Delete</button>
        </div>
      );
    }

    return list;*/
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
        
        <button onClick={addFood}>
          Eat!
        </button>
      </div>

      <div className="food-list">{renderFoodList()}</div>
    </div>
  )
}

