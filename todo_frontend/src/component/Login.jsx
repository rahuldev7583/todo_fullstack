import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddTask from "./AddTask";
import { API_ENDPOINTS } from "../../config";
import Bottom from "./Bottom/Bottom";

export const Login = () => {
  const navigate = useNavigate();

  const dataSend = { state: { name: null, status: "Login" } };
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [login, setLogin] = useState(true);
  const [verify, setVerify] = useState(true);

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await fetch(API_ENDPOINTS.LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    const data = await response.json();

    console.log("Data received:", data);

    if (!response.ok) {
      if (data.error[0] === "V") {
        setVerify(false);
        setLogin(true);
      } else if (data.error[0] === "L") {
        setLogin(false);
        setVerify(true);
      }
      setLoginData({ email: "", password: "" });
    } else {
      localStorage.setItem("token", data.token);

      setLogin(true);

      navigate("/task", dataSend);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  }

  return (
    <>
      <AddTask disable={true} />
      <p className="text-[#01dabb] text-lg ml-20 mt-20 md:ml-[44.6%] font-semibold">
        Organize Your Life
      </p>
      <p className="text-[#01dabb] text-lg mt-2 ml-12 md:ml-[42%] font-semibold">
        The Ultimate Todo List App
      </p>

      {login === false && (
        <h1 className="text-[#526e6a] ml-12 md:ml-[36%] mt-4 text-xs md:text-xl">
          ***Login with correct email and password***
        </h1>
      )}
      {verify === false && (
        <h1 className="text-[#526e6a] ml-12 md:ml-[42%] mt-4 text-xs md:text-xl">
          ***Verify your email***
        </h1>
      )}
      <form
        className="mt-6 mb-8 w-[80%] md:w-[25%] text-base md:text-xl ml-16 md:ml-[42%]"
        onSubmit={handleSubmit}
      >
        <label htmlFor="email" className="text-[#01dabb] ">
          Enter your email
        </label>
        <br />
        <input
          className="border border-slate-800 my-2 px-2 py-1 md:py-1/2 rounded-md w-[85%] md:w-[75%] "
          onChange={handleChange}
          type="email"
          minLength={8}
          name="email"
          placeholder="email"
          value={loginData.email}
          required
        />
        <br />
        <label htmlFor="password" className="text-[#01dabb] ">
          Enter your Password
        </label>
        <br />
        <input
          className="border border-slate-800 my-2 px-2 py-1 md:py-1/2 rounded-md w-[85%] md:w-[75%]"
          onChange={handleChange}
          type="password"
          name="password"
          minLength={5}
          placeholder="password"
          value={loginData.password}
          required
        />
        <br />
        <button
          type="submit"
          className="bg-[#01dabb] hover:bg-[#00bdc2] rounded-xl text-slate-700 text-lg md:text-xl md:mt-6 mt-2 pt-3 pb-3 pl-8 pr-8 ml-[24%] md:ml-20 "
        >
          Login
        </button>
      </form>
      <Link
        to="/signup"
        className="bg-[#01dabb] hover:bg-[#00bdc2]  rounded-xl text-slate-700 text-lg md:text-xl pt-3 pb-3 pl-6 pr-6 ml-[38%] md:ml-[47.5%]"
      >
        Signup
      </Link>
      <Bottom bottom={false} />
    </>
  );
};
