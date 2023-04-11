import { TypeAttributes } from "rsuite/esm/@types/common";

export interface Category {
  id: string;
  userId: string;
  name: string;
  icon: string;
  color: TypeAttributes.Color;
  subcategories: SubCategory[];
}

export interface SubCategory {
  id: string;
  name: string;
  icon: string;
  color: TypeAttributes.Color;
  categoryId: string;
}

export interface UserBindedModel {
  userId: string;
}

export interface AddCategoryRequest {
  userId: string;
  name: string;
  icon: string;
  color: string;
}

export interface AddSubcategoryRequest extends AddCategoryRequest {
  categoryId: string;
}

export type ApiResponse<T> = T | ErrorResponse;

export type ErrorResponse = {
  statusCode: number;
  errorMessage: string;
};
