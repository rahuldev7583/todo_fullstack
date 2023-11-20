import { Link } from "react-router-dom";
import Delete from "./../assets/trash.png";
function Button(props) {
  return (
    <div>
      <button
        className=" mb-6 relative top-3 ml-16"
        // eslint-disable-next-line react/prop-types
        onClick={props.deleteClicked}
      >
        <img className="w-10" src={Delete} alt="trashImg" />
      </button>
    </div>
  );
}

function LogOut({ to, onClick, children }) {
  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Link
      to={to}
      onClick={handleClick}
      className="bg-[#01dabb]  hover:bg-[#00bdc2] rounded-2xl md:rounded-xl text-slate-500 text-base md:text-xl p-3 absolute top-2 right-1 md:top-24 md:right-32"
    >
      {children}
    </Link>
  );
}
function Success(props) {
  return (
    <p className="text-slate-700 text-lg absolute top-40 md:top-24 left-10 md:left-16">
      Successfully {props.message}
    </p>
  );
}
export { Button, LogOut, Success };
