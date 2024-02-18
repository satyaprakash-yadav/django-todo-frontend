import TodoForm from "./components/TodoForm";
import Table from "./components/Table";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [todo, setTodo] = useState("");
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/todoApp/");
      setTodo(response.data)
      setIsLoading(false)
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  

  return (
    <>
      <div className="bg-green-50 px-8 min-h-screen">
        <nav className="pt-8">
          <h1 className="text-5xl text-center font-[500] text-green-950 pb-8">
            Todo List
          </h1>
        </nav>
        <TodoForm fetchData={fetchData} />
        <Table todo={todo} setTodo={setTodo} isLoading={isLoading} />
      </div>
    </>
  );
}

export default App;
