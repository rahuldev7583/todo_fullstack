import Gmail from "./gmail.png";
import Twitter from "./twitter.png";
import GitHub from "./github.png";
import Medium from "./medium.png";

function Bottom(props: { bottom: string | boolean }) {
  let bottomStyle =
    "left-0 right-0 w-full text-slate-500 test-xl pt-2 text-center  bg-[#01dabb]";
  return (
    <div
      className={
        props.bottom
          ? `relative top-20 ${bottomStyle} md:relative md:top-[315px]`
          : `fixed bottom-0 ${bottomStyle}`
      }
    >
      <div className="flex ml-24 md:ml-[42%]">
        <p className="md:text-xl text-lg">created by</p>
        <a
          href="https://iamrahul.dev"
          className="underline text-lg md:text-xl ml-2"
        >
          Rahul Dev
        </a>
      </div>

      <ul className="flex md:ml-[37%] ml-0">
        <li>
          <a href="mailto: rahuldev2714@gmail.com" className="">
            <img className="ml-10 w-10 md:w-12 " src={Gmail} alt="GmailIcon" />
          </a>
        </li>
        <li>
          <a href="https://twitter.com/iamrahul_dev">
            <img
              className="ml-10 w-10 md:w-12 "
              src={Twitter}
              alt="TwitterIcon"
            />
          </a>
        </li>
        <li>
          <a href="https://github.com/rahuldev7583">
            <img
              className="ml-10 w-10 md:w-12 "
              src={GitHub}
              alt="GitHub Icon"
            />
          </a>
        </li>
        <li>
          <a href="https://medium.com/@rahuldev7583">
            <img className="ml-10 w-10 md:w-12" src={Medium} alt="MediumIcon" />
          </a>
        </li>
      </ul>
      <p className="md:text-lg text-base">
        © {new Date().getFullYear()} Rahul Dev. All right reserved.
      </p>
    </div>
  );
}
export default Bottom;
