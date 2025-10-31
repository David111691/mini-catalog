import styled from "styled-components";
import { FaHeart } from "react-icons/fa";

interface LikeButtonProps {
  liked: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

const LikeIcon = styled(FaHeart)<{ $liked: boolean }>`
  color: ${({ $liked }) => ($liked ? "#ef4444" : "#9ca3af")};
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
  padding: 4px;

  &:hover {
    color: ${({ $liked }) => ($liked ? "#dc2626" : "#6b7280")};
  }
`;

const LikeButton: React.FC<LikeButtonProps> = ({ liked, onClick }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClick) onClick(e);
  };

  return <LikeIcon $liked={liked} onClick={handleClick} size={20} />;
};

export default LikeButton;
