import "./ButtonToggle.css";
const ButtonToggle = ({ isOpen, onClick }) => {
  return (
    <button className="btn-toggle" onClick={onClick}>
      {isOpen ? "–" : "+"}
    </button>
  );
};

export default ButtonToggle;
