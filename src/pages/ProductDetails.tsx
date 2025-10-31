import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { fetchProductById, updateProduct } from "@/store/productsSlice";
import type { RootState, AppDispatch } from "@/store/store";
import type { Product } from "@/types/product";

const Container = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 0 32px;
  text-align: center;
`;

const Image = styled.img`
  width: 300px;
  height: 300px;
  object-fit: contain;
  margin-bottom: 20px;
`;

const ButtonGroup = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: center;
  gap: 12px;
`;

const Button = styled.button<{ variant?: "primary" | "secondary" }>`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
  color: #fff;

  background-color: ${({ variant }) =>
    variant === "primary" ? "#2563eb" : "#6b7280"};

  &:hover {
    background-color: ${({ variant }) =>
      variant === "primary" ? "#1d4ed8" : "#4b5563"};
    transform: translateY(-1px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }
`;

const Input = styled.input`
  width: 100%;
  margin: 8px 0;
  padding: 8px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
`;

const TextArea = styled.textarea`
  width: 100%;
  margin: 8px 0;
  padding: 8px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  resize: vertical;
`;

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const {
    selectedProduct: product,
    loading,
    error,
  } = useSelector((state: RootState) => state.products);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Omit<Product, "id">>({
    title: "",
    price: 0,
    description: "",
    image: "",
    category: "",
    rating: { rate: 0, count: 0 },
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(Number(id)));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title,
        price: product.price,
        description: product.description,
        image: product.image,
        category: product.category,
        rating: product.rating,
      });
    }
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleSave = () => {
    if (product) {
      dispatch(updateProduct({ id: product.id, ...formData }));
      setIsEditing(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <Container>
      <Image src={product.image} alt={product.title} />

      {isEditing ? (
        <>
          <Input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
          />
          <Input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
          />
          <TextArea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
          />
          <Input
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Image URL"
          />

          <ButtonGroup>
            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>
            <Button variant="secondary" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </ButtonGroup>
        </>
      ) : (
        <>
          <h2>{product.title}</h2>
          <p style={{ fontWeight: 600 }}>${product.price}</p>
          <p>{product.description}</p>

          <ButtonGroup>
            <Button variant="primary" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
            <Button variant="secondary" onClick={() => navigate("/products")}>
              Back
            </Button>
          </ButtonGroup>
        </>
      )}
    </Container>
  );
};

export default ProductDetails;
