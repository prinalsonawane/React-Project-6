import React, { useState, useEffect } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");

  const addTask = async () => {
    try {
      console.log(value);
      const ans = await fetch("https://dummyjson.com/todos/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          todo: value,
          completed: false,
          userId: 5,
        }),
      });
      const sol = await ans.json();
      console.log(sol);
      setTodos([
        {
          todo: value,
          completed: false,
          userId: 5,
        },
        ...todos,
      ]);
    } catch (error) {
      console.error("Error while posting", error);
    }
  };

  const deleteTask = async (iter) => {
    try {
      const item = await fetch(`https://dummyjson.com/todos/${iter.id}`, {
        method: "DELETE",
      });
      const output = await item.json();
      const itemOne = output.todos;
      console.log(itemOne);
      setTodos(todos.filter((ele) => ele.id !== iter.id));
    } catch (error) {
      console.error("Error while deleting", error);
    }
  };

  const fetchData = async () => {
    try {
      const container = await fetch("https://dummyjson.com/todos", {
        method: "GET",
      });
      const finalContainer = await container.json();
      const containerOne = finalContainer.todos;
      console.log(containerOne);
      setTodos(containerOne);
    } catch (error) {
      console.error("Error while GET method", error);
    }
  };

  const updateTask = async (iter) => {
    const updatedData = await fetch("https://dummyjson.com/todos/1", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        completed: !iter.completed,
      }),
    });
    const updatedInfo = await updatedData.json();
    console.log(updatedInfo);
    const taskToUpdate = todos.filter((val) => {
      return val.id === iter.id;
    })[0];
    taskToUpdate.completed = !taskToUpdate.completed;
    console.log(taskToUpdate);
    setTodos([
      taskToUpdate,
      ...todos.filter((val) => {
        return val.id !== iter.id;
      }),
    ]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={addTask}>Save</button>
      <ul>
        {todos?.map((iter, index) => {
          return (
            <li
              key={index}
              style={{
                textDecoration: iter.completed ? "line-through" : "none",
              }}
            >
              {iter.id} {iter.todo}
              <button onClick={() => deleteTask(iter)}>Remove</button>
              <button onClick={() => updateTask(iter)}>Update</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default TodoList;
