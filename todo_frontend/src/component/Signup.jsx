import { useState } from "react";

import { useNavigate } from "react-router-dom";
import AddTask from "./AddTask";
import { API_ENDPOINTS } from "../../config";
import Bottom from "./Bottom/Bottom";
import Loading from "./Loading";
const Signup = () => {
  const navigate = useNavigate();

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const dataSend = { state: { name: signupData.name, status: "Signup" } };

  const [signup, setSignup] = useState({ signupStatus: true, data: "" });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const response = await fetch(API_ENDPOINTS.SIGNUP, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData),
    });
    const data = await response.json();
    if (!response.ok) {
      setSignupData({ name: "", email: "", password: "" });
      setSignup({ data: data, signupStatus: false });
      setLoading(false);
    } else {
      localStorage.setItem("token", data.token);
      setLoading(false);
      setSignup({ ...signup, signupStatus: true });
      navigate("/verify", dataSend);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  }
  return (
    <>
      <AddTask disable={true} />

      {!signup.signupStatus && signup.data.error ? (
        <h1 className="text-[#526e6a] md:ml-[40%] ml-6 mt-16 text-base md:text-xl">
          ***Email already registered***
        </h1>
      ) : !signup.signupStatus && signup.data.errors ? (
        <h1 className="text-[#526e6a] md:ml-[40%] ml-6 mt-16 text-base md:text-xl">
          ***Please enter a valid email***
        </h1>
      ) : null}
      {loading && <Loading />}
      <form
        className={
          signup.signupStatus
            ? `mt-20 mb-4 w-[75%] md:w-[25%] text-base md:text-lg ml-16 md:ml-[41%]`
            : `mt-4 mb-4 w-[75%] md:w-[25%] text-base md:text-lg ml-16 md:ml-[41%]`
        }
        onSubmit={handleSubmit}
      >
        <label htmlFor="name" className="text-[#01dabb]">
          Enter your Name
        </label>
        <br />
        <input
          className="border border-slate-800 my-2 px-2  rounded-md w-[90%]"
          onChange={handleChange}
          type="name"
          name="name"
          placeholder="name"
          minLength={4}
          value={signupData.name}
          required
        />
        <br />
        <label htmlFor="email" className="text-[#01dabb]">
          Enter your email
        </label>
        <br />
        <input
          className="border border-slate-800 my-2 px-2 rounded-md w-[90%]"
          onChange={handleChange}
          type="email"
          name="email"
          placeholder="email"
          value={signupData.email}
          required
        />
        <br />
        <label htmlFor="password" className="text-[#01dabb]">
          Enter your Password
        </label>
        <br />
        <input
          className="border border-slate-800 my-2 px-2 rounded-md w-[90%] "
          onChange={handleChange}
          type="password"
          name="password"
          minLength={5}
          placeholder="password"
          value={signupData.password}
          required
        />
        <br />
        <button
          type="submit"
          className="bg-[#01dabb] hover:bg-[#00bdc2] rounded-xl text-slate-700 text-xl mt-4 pt-2 pb-2 pl-4 pr-4 ml-[25%] md:ml-24"
        >
          submit
        </button>
      </form>
      <Bottom bottom={false} />
    </>
  );
};

export default Signup;
