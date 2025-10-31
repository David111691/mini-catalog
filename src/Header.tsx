import { Link } from "react-router";
import styled from "styled-components";

const HeaderWrapper = styled.header`
  background-color: #f3f4f6;
  padding: 16px 32px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const Nav = styled.nav`
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  gap: 20px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #374151;
  font-weight: 500;
  padding: 8px 12px;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    background-color: #e5e7eb;
    color: #111827;
  }

  &:active {
    background-color: #d1d5db;
  }
`;

const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <Nav>
        <StyledLink to="/products">Main</StyledLink>
        <StyledLink to="/create-product">Add new product</StyledLink>
      </Nav>
    </HeaderWrapper>
  );
};

export default Header;
