import styled from "styled-components";

const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;

  @media (max-width: 780px) {
    align-items: center;
    gap: 8px;
  }
`;

const MenuLabel = styled.span`
  font-weight: 500;
  color: #374151;
`;

const MenuButton = styled.button`
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  background-color: #ffffff;
  color: #374151;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background-color: #e5e7eb;
    border-color: #9ca3af;
  }

  &:active {
    background-color: #d1d5db;
  }
`;

const SearchInput = styled.input`
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  min-width: 180px;
`;

interface Props {
  filter: "all" | "favorites";
  setFilter: (filter: "all" | "favorites") => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (order: "asc" | "desc") => void;
  search: string;
  setSearch: (value: string) => void;
}

const ProductsListMenu: React.FC<Props> = ({
  filter,
  setFilter,
  sortOrder,
  setSortOrder,
  search,
  setSearch,
}) => {
  return (
    <MenuWrapper>
      <MenuLabel>Show products:</MenuLabel>
      <MenuButton
        onClick={() => setFilter("all")}
        style={{ backgroundColor: filter === "all" ? "#e5e7eb" : "#ffffff" }}
      >
        All
      </MenuButton>
      <MenuButton
        onClick={() => setFilter("favorites")}
        style={{
          backgroundColor: filter === "favorites" ? "#e5e7eb" : "#ffffff",
        }}
      >
        Favorite
      </MenuButton>

      <MenuLabel>Sort by title:</MenuLabel>
      <MenuButton
        onClick={() => setSortOrder("asc")}
        style={{ backgroundColor: sortOrder === "asc" ? "#e5e7eb" : "#ffffff" }}
      >
        A → Z
      </MenuButton>
      <MenuButton
        onClick={() => setSortOrder("desc")}
        style={{
          backgroundColor: sortOrder === "desc" ? "#e5e7eb" : "#ffffff",
        }}
      >
        Z → A
      </MenuButton>

      <SearchInput
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </MenuWrapper>
  );
};

export default ProductsListMenu;
