import { Link, useLocation } from "react-router-dom";
import AddTask from "./AddTask";
import { useEffect, useState } from "react";
import { LogOut, Success, Button } from "./others";
import { API_ENDPOINTS, month } from "../../config";
import Bottom from "./Bottom/Bottom";
const today = new Date();
const year = today.getFullYear();
let months = today.getMonth() + 1;
let day = today.getDate();

if (months < 10) {
  months = `0${months}`;
}
if (day < 10) {
  day = `0${day}`;
}

const currentDate = `${year}-${months}-${day}`;

export const Task = () => {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    date: "",
  });
  const [tasks, setTasks] = useState([]);
  const [completedTask, setCompletedTask] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loadTask, setLoadTask] = useState(false);
  const location = useLocation();
  const dataRec = location.state;
  const [success, setSuccess] = useState(true);
  const [taskStatus, setTaskStatus] = useState({ complete: false });
  const [username, setUsername] = useState("");
  setTimeout(() => setSuccess(false), 3000);
  function handleChange(e) {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  }
  const authToken = localStorage.getItem("token");
  async function getUser() {
    const response = await fetch(API_ENDPOINTS.GET_USERNAME, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: authToken,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      console.log(response);
    } else {
      setUsername(data);
    }
  }
  async function fetchTask() {
    const response = await fetch(API_ENDPOINTS.GET_TASKS, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: authToken,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      console.log(response);
    } else {
      setTasks(() => data);
      setLoadTask(true);
    }
  }
  async function fetchCompletedTask() {
    const response = await fetch(API_ENDPOINTS.GET_COMPLETED_TASK, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: authToken,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      console.log(response);
    } else {
      setCompletedTask(() => data);
      setLoadTask(true);
    }
  }
  async function addTask(e) {
    e.preventDefault();
    const response = await fetch(API_ENDPOINTS.ADD_TASKS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: authToken,
      },
      body: JSON.stringify(taskData),
    });
    const data = await response.json();
    if (!response.ok) {
      console.log(response);
      setShowForm(false);
    } else {
      dataRec.status = "Task Added";
      setSuccess(true);
      setTasks(() => [...tasks, data]);
      setShowForm(false);
      setTaskData({
        title: "",
        description: "",
        date: "",
      });
      fetchTask();
    }
  }
  async function updateTask(id) {
    const updatedTask = { ...taskStatus, complete: true };
    const response = await fetch(`${API_ENDPOINTS.UPDATE_TASKS}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: authToken,
      },
      body: JSON.stringify(updatedTask),
    });
    //  const data = await response.json();
    if (!response.ok) {
      console.log(response);
    } else {
      dataRec.status = "Task Updated";
      setSuccess(true);

      setTasks(() => tasks.filter((task) => task._id != id));
      fetchCompletedTask();
    }
  }

  async function deleteTask(id) {
    const response = await fetch(`${API_ENDPOINTS.DELETE_TASKS}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: authToken,
      },
    });
    // const data = await response.json();
    if (!response.ok) {
      console.log(response);
    } else {
      dataRec.status = "Task Deleted";
      setSuccess(true);
      setCompletedTask(completedTask.filter((task) => task._id != id));
      setTasks(tasks.filter((task) => task._id != id));
    }
  }
  useEffect(() => {
    fetchTask();
    fetchCompletedTask();
    if (dataRec.name != null) {
      setUsername(dataRec.name);
      setSuccess(false);
    } else if (dataRec.name === null) {
      getUser();
      setSuccess(false);
    }
  }, []);
  return (
    <div className="">
      {success && <Success message={dataRec.status} />}
      {!showForm && (
        <AddTask disable={false} onClick={() => setShowForm(true)} />
      )}
      {showForm && (
        <form
          className="absolute pt-1 pb-32 top-16 text-slate-500 bg-white w-full h-[82%] pl-10 md:pl-[40%]  text-xl  mt-8 md:mt-20 z-10"
          onSubmit={addTask}
        >
          <label htmlFor="title" className="text-[#01dabb]">
            Title
          </label>
          <br />
          <input
            className="border border-slate-800 my-2 px-2 rounded-md w-[90%] md:w-[35%]"
            onChange={handleChange}
            type="text"
            name="title"
            minLength={4}
            maxLength={20}
            placeholder=""
            value={taskData.title}
            required
          />
          <br />
          <label htmlFor="description" className="text-[#01dabb]">
            Description
          </label>
          <br />
          <textarea
            className="border border-slate-800 my-2 px-2 h-20 py-2 rounded-lg w-[90%] md:w-[35%]"
            onChange={handleChange}
            type="text"
            name="description"
            placeholder=""
            rows="3"
            cols="18"
            minLength={8}
            maxLength={36}
            value={taskData.description}
            required
          ></textarea>
          <br />
          <label htmlFor="date" className="text-[#01dabb]">
            To be completed on
          </label>
          <br />
          <input
            className=" text-xl my-2 px-2 w-[90%] md:w-[35%] py-1 rounded-lg border border-slate-800"
            onChange={handleChange}
            type="date"
            name="date"
            min={currentDate}
            max="2024-02-31"
            value={taskData.date}
            required
          />
          <br />

          <button
            className="bg-[#01dabb] hover:bg-[#00bdc2] pt-2 pb-2 pr-4 pl-4 rounded-xl mt-8 text-slate-700 text-2xl ml-24"
            type="submit"
          >
            submit
          </button>
        </form>
      )}
      <div className="z-0 mt-16 ml-0 md:ml-12 mr-10 grid grid-cols-1 md:grid-cols-4 w-full md:w-[90%]">
        {loadTask &&
          tasks.map((task) => {
            return (
              !task.complete && (
                <div
                  className="border-2 border-[#01dabb] rounded-xl h-42  text-slate-800 w-[75%] md:w-[90%] text-base  md:text-xl mt-10 md:mt-8 ml-8 pl-12"
                  key={task._id}
                >
                  <input
                    onClick={() => updateTask(task._id)}
                    type="checkbox"
                    className="accent-[#01dabb] mt-4 w-6 h-6 ml-[-30px]"
                  />
                  <h1 className="  font-medium mt-[-40px] text-2xl ml-2">
                    {task.title}
                  </h1>
                  <p className="ml-2">{task.description}</p>
                  <p className="ml-2">
                    {month[task.date.slice(5, 7) - 1] +
                      " " +
                      task.date.slice(8, 10)}
                  </p>
                  <Button deleteClicked={() => deleteTask(task._id)} />
                </div>
              )
            );
          })}
      </div>
      {completedTask.length > 0 && (
        <div>
          <h1 className="text-2xl font-semibold text-[#01dabb] ml-12 md:ml-20 mt-10 ">
            Your completed task
          </h1>
          <div className="z-0 mt-0 md:mt-4 ml-2 md:ml-12 mr-10 grid grid-cols-1 md:grid-cols-4 w-[90%]">
            {completedTask.map((task) => {
              return (
                task.complete && (
                  <div
                    className="border-2 border-[#01dabb] rounded-xl h-42  text-slate-800 w-[90%]  text-xl mt-8 md:mt-4 ml-6 md:ml-8 pl-12"
                    key={task._id}
                  >
                    <input
                      onClick={() => {}}
                      type="checkbox"
                      checked="true"
                      className="accent-[#01dabb] mt-4 w-6 h-6 ml-[-30px]"
                    />
                    <h1 className="  font-medium mt-[-40px] text-2xl ml-2">
                      {task.title}
                    </h1>
                    <p className="ml-2">{task.description}</p>
                    <p className="ml-2">
                      {month[task.date.slice(5, 7) - 1] +
                        " " +
                        task.date.slice(8, 10)}
                    </p>
                    <Button deleteClicked={() => deleteTask(task._id)} />
                  </div>
                )
              );
            })}
          </div>
        </div>
      )}
      <h2 className="text-[#01dabb] text-2xl font-semibold absolute top-12 left-20 hidden md:block">
        Hello, {username.charAt(0).toUpperCase() + username.slice(1)}
      </h2>
      <LogOut
        to="/"
        onClick={() => {
          localStorage.removeItem("token");
        }}
      >
        Logout
      </LogOut>
      {tasks.length >= 2 || completedTask.length >= 2 ? (
        <Bottom bottom={true} />
      ) : (
        <Bottom bottom={false} />
      )}
    </div>
  );
};
