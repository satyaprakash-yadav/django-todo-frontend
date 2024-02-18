// import React from 'react'

import axios from "axios";
import { useState } from "react";

const TodoForm = ({fetchData}) => {
  const [value, setValue] = useState({'body': ''});

  const handleChange = (e) => {
    setValue(prev=> ({
      ...prev,
      'body': e.target.value
    }))
  }

  const saveTodo = async () => {
    try {
      const response = await axios.post("https://satyay.pythonanywhere.com/api/todoApp/", value);
      setValue({'body': ''})
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Add Todo"
        className="border-2 border-green-950 rounded p-2 input input-bordered input-accent w-full max-w-xs"
        onChange={handleChange}
        value={value.body}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            saveTodo()
          }
        }}
      />
      <button className="bg-green-700 hover:bg-green-900 text-white font-semibold uppercase py-2 px-4 rounded ml-2" onClick={saveTodo}>
        Add Todo
      </button>
    </div>
  );
};

export default TodoForm;
