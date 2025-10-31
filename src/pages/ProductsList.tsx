import { useEffect, useState } from "react";
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/store/store";
import { fetchProducts } from "@/store/productsSlice";

import ProductCard from "@/components/product_card/ProductCard";
import ProductsListMenu from "@/components/ProductsListMenu";

const Wrapper = styled.div`
  max-width: 900px;
  margin: 40px auto;
  padding: 0 16px;
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  justify-items: center;
`;

const PaginationControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  button {
    margin: 0 8px;
    padding: 6px 12px;
    border: none;
    background-color: #3b82f6;
    color: white;
    border-radius: 4px;
    cursor: pointer;

    &:disabled {
      background-color: #9ca3af;
      cursor: not-allowed;
    }
  }
`;

const ProductsList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    items: productCards,
    favorites,
    loading,
    error,
  } = useSelector((state: RootState) => state.products);

  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState<"all" | "favorites">("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [search, setSearch] = useState("");
  const itemsPerPage = 8;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Фильтрация по favorites
  let filteredItems =
    filter === "favorites"
      ? productCards.filter((p) => favorites.includes(p.id))
      : productCards;

  // Поиск
  if (search.length >= 2) {
    filteredItems = filteredItems.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Сортировка по алфавиту
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (a.title < b.title) return sortOrder === "asc" ? -1 : 1;
    if (a.title > b.title) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <Wrapper>
      <ProductsListMenu
        filter={filter}
        setFilter={(f) => {
          setFilter(f);
          setCurrentPage(1);
        }}
        sortOrder={sortOrder}
        setSortOrder={(order) => {
          setSortOrder(order);
          setCurrentPage(1);
        }}
        search={search}
        setSearch={(value) => {
          setSearch(value);
          setCurrentPage(1);
        }}
      />

      <CardsContainer>
        {currentItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </CardsContainer>

      <PaginationControls>
        <button onClick={handlePrev} disabled={currentPage === 1}>
          Back
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Forward
        </button>
      </PaginationControls>
    </Wrapper>
  );
};

export default ProductsList;
