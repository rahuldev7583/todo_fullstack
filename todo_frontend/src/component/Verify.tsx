import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Verify = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      localStorage.removeItem("token");
      navigate("/");
    }, 4000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="text-xl font-bold mt-10 text-center text-slate-500">
      Go to your email box and verify email address
    </div>
  );
};

export default Verify;
