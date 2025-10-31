import styled from "styled-components";
import { FaTimes } from "react-icons/fa";

interface RemoveButtonProps {
  position?: "left" | "right";
  onClick?: (e: React.MouseEvent) => void;
}

const RemoveIcon = styled(FaTimes)<{ position: "left" | "right" }>`
  display: block;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: #f3f4f6;
  color: #9ca3af;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 4px;
  user-select: none;

  margin-right: ${({ position }) => (position === "left" ? "auto" : "0")};
  margin-left: ${({ position }) => (position === "right" ? "auto" : "0")};

  &:hover {
    background-color: #e5e7eb;
    color: #6b7280;
  }

  &:active {
    background-color: #d1d5db;
    color: #4b5563;
  }
`;

const RemoveButton: React.FC<RemoveButtonProps> = ({
  position = "right",
  onClick,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClick) onClick(e);
  };

  return <RemoveIcon position={position} onClick={handleClick} />;
};

export default RemoveButton;
