import { useState } from "react";

function Header() {
  const [time, setTime] = useState({
    currentTime: new Date(),
  });
  let hour = time.currentTime.getHours();
  let minute = time.currentTime.getMinutes();
  let hour12 = hour % 12;
  hour12 = hour12 ? hour12 : 12;
  const amPm = hour >= 12 ? "PM" : "AM";
  const timeStr = `${hour12}:${minute < 10 ? "0" : ""}${minute} ${amPm}`;
  setInterval(() => {
    setTime({ currentTime: new Date() });
  }, 10000);
  return (
    <div className="text-center ml-4 md:ml-0">
      <h1 className="font-black text-3xl mt-2  md:text-5xl text-[#01dabb]">
        Todo
      </h1>
      <h3 className="text-slate-500 text-base md:text-lg">
        {time.currentTime.toDateString()}
      </h3>
      <h3 className="font-bold text-base md:text-xl text-[#01dabb]">
        {timeStr}
      </h3>
    </div>
  );
}
export default Header;
