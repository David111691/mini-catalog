import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { addProduct } from "@/store/productsSlice";
import type { AppDispatch } from "@/store/store";

const Form = styled.form`
  max-width: 400px;
  margin: 40px auto;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Input = styled("input").withConfig({
  shouldForwardProp: (prop) => prop !== "hasError",
})<{ hasError?: boolean }>`
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid ${({ hasError }) => (hasError ? "red" : "#ccc")};
  border-radius: 4px;
`;

const TextArea = styled("textarea").withConfig({
  shouldForwardProp: (prop) => prop !== "hasError",
})<{ hasError?: boolean }>`
  width: 100%;
  box-sizing: border-box;
  font-family: inherit;
  padding: 8px;
  border: 1px solid ${({ hasError }) => (hasError ? "red" : "#ccc")};
  border-radius: 4px;
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
`;

interface FormValues {
  title: string;
  image: string;
  price: number;
  description: string;
  category: string;
}

const CreateProduct: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    dispatch(
      addProduct({
        ...data,
        rating: { rate: 0, count: 0 },
      })
    );
    navigate("/");
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input
          {...register("title", { required: "Title is required" })}
          placeholder="Title"
          hasError={!!errors.title}
        />
        {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
      </div>

      <div>
        <Input
          {...register("image", {
            required: "Image link is required",
            pattern: {
              value: /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/,
              message: "Incorrect image URL",
            },
          })}
          placeholder="Image link"
          hasError={!!errors.image}
        />
        {errors.image && <ErrorMessage>{errors.image.message}</ErrorMessage>}
      </div>

      <div>
        <Input
          type="number"
          {...register("price", {
            required: "Price is required",
            min: { value: 0.01, message: "Price should be more than 0" },
          })}
          placeholder="Price"
          hasError={!!errors.price}
        />
        {errors.price && <ErrorMessage>{errors.price.message}</ErrorMessage>}
      </div>

      <div>
        <TextArea
          {...register("description", { required: "Description is required" })}
          placeholder="Description"
          hasError={!!errors.description}
        />
        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
      </div>

      <div>
        <Input
          {...register("category", { required: "Category is required" })}
          placeholder="Category"
          hasError={!!errors.category}
        />
        {errors.category && (
          <ErrorMessage>{errors.category.message}</ErrorMessage>
        )}
      </div>

      <Button type="submit">Add product</Button>
    </Form>
  );
};

export default CreateProduct;
