/* eslint-disable react/prop-types */
export default function AddTask(props) {
  return (
    <div className=" ">
      <button
        // eslint-disable-next-line react/prop-types
        disabled={props.disable}
        className="absolute bg-[#01dabb] hover:bg-[#00bdc2] text-slate-500 mt-6 ml-12 md:mt-6 md:ml-[8.6%] p-2 rounded-lg text-lg md:text-xl top-20 left-[25%] md:top-24 md:left-[38%] "
        onClick={props.onClick}
      >
        Add Task
      </button>
    </div>
  );
}
