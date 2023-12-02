import { useState } from "react";
import ButtonToggle from "./ButtonToggle";

const Box = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const handleClick = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };
  return (
    <>
      <div className="box">
        <ButtonToggle isOpen={isOpen} onClick={handleClick} />
        {isOpen && children}
      </div>
    </>
  );
};

export default Box;
