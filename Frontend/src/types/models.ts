export interface Category {
  id: string;
  userId: string;
  name: string;
  icon: string;
  subcategories: SubCategory[];
}

export interface SubCategory {
  id: string;
  name: string;
  icon: string;
  categoryId: string;
}

export type ApiResponse<T> = T | ErrorResponse;

export type ErrorResponse = {
  statusCode: number;
  errorMessage: string;
};
