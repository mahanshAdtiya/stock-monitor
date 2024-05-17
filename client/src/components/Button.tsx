import React, { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

interface ButtonProps {
  icon?: ReactElement;
  bgColor?: string;
  color?: string;
  bgHoverColor?: string;
  size?: string;
  text?: string;
  borderRadius?: string;
  width?: string;
  customFunc?: () => void;
  to?: string;
}

const Button: React.FC<ButtonProps> = ({
  icon,
  bgColor,
  color,
  bgHoverColor,
  size = "base",
  text,
  borderRadius = "0",
  width = "auto",
  customFunc,
  to
}) => {
  const navigate = useNavigate(); 

  const handleClick = () => {
    if (to) {
      navigate(to); 
    }
    if (customFunc) {
      customFunc();
    }
  };

  return (
    <button
      type="button"
      style={{ backgroundColor: bgColor, color, borderRadius }}
      className={`flex items-center justify-center text-${size} p-2 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor}`}
      onClick={handleClick}
    >
      {icon && React.cloneElement(icon, { size: "2em" })}
      <span>{text}</span>
    </button>
  );
};

export default Button;
