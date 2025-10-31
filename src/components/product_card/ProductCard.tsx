import { useNavigate } from "react-router";
import styled from "styled-components";

import type { Product } from "@/types/product";

import LikeButton from "./LikeButton";
import RemoveButton from "./RemoveButton";

import type { RootState } from "@/store/store";
import type { AppDispatch } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { removeProduct, toggleFavorite } from "@/store/productsSlice";

interface ProductCardProps {
  product: Product;
}

const Card = styled.div`
  justify-self: center;
  max-width: 100%;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 12px;
  box-sizing: border-box;
  text-align: center;
  cursor: pointer;
  background-color: #ffffff;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: contain;
`;

const CardName = styled.p`
  font-size: 14px;
  margin-top: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #374151;
`;

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector((state: RootState) => state.products.favorites);
  const isFavorite = favorites.includes(product.id);

  const handleLikeClick = () => {
    dispatch(toggleFavorite(product.id));
  };

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(removeProduct(product.id));
  };

  return (
    <Card onClick={() => navigate(`/products/${product.id}`)}>
      <RemoveButton position="right" onClick={handleRemoveClick} />
      <CardImage src={product.image} alt={product.title} />
      <CardName>{product.title}</CardName>
      <LikeButton liked={isFavorite} onClick={handleLikeClick} />
    </Card>
  );
};

export default ProductCard;
