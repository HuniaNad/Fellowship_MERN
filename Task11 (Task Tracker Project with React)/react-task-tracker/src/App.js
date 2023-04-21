import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    getTasks();
  }, []);

  //Fetch Tasks from Server
  const fetchTasks = async (id) => {
    const res = await fetch("http://localhost:5000/tasks");

    const data = await res.json();

    return data;
  };

  //Fetch Task from Server
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);

    const data = await res.json();

    return data;
  };

  //Show Add Task Section
  const showAddTaskSection = () => {
    setShowAddTask(!showAddTask);
  };

  //Add Task
  const addTask = async (task) => {
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();
    setTasks([...tasks, data]);
    // const id = Math.floor(Math.random() * 10000) + 1
    // setTasks([...tasks, {id, ...task}])
  };

  //Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });

    setTasks(tasks.filter((task) => task.id !== id));
  };

  //Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });

    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  return (
    <Router>
      <div className="container">
       <Header onAdd={showAddTaskSection} showAdd={showAddTask} />  

        <Routes>
          <Route
            path="/" 
            element= {<Home showAddTask={showAddTask} addTask={addTask} tasks={tasks} deleteTask={deleteTask} toggleReminder={toggleReminder}  />}
          />
          <Route path="/about" element={<About />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

const Home = (props) => {
  return (
    <>
      {props.showAddTask && <AddTask onAdd={props.addTask} />}

      {props.tasks.length > 0 ? (
        <Tasks
          tasks={props.tasks}
          onDelete={props.deleteTask}
          onToggle={props.toggleReminder}
        />
      ) : (
        "No Tasks To Show"
      )}
    </>
  );
}

export default App;
