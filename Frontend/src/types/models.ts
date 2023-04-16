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

export interface AddSubcategoryRequest {
  categoryId: string;
  name: string;
  icon: string;
  color: string;
}

export interface UpdateUserProfileRequest {
  email: string;
  firstName: string;
  lastName: string;
  birthday: Date;
}

export type ApiResponse<T> = T | ErrorResponse;

export type ErrorResponse = {
  statusCode: number;
  errorMessage: string;
};

export interface CreateOperationModel {
  type: OperationType;
  value: number;
  description: string;
  subCategoryId: string;
  accountId: string;
}
export enum OperationType {
  // / <summary>
  // / Income to account
  // / </summary>
  Income,
  // / <summary>
  // / How balance decreased
  // / </summary>
  Expense,
  // / <summary>
  // / If we transfer between cards
  // / </summary>
  Transfer,
  // / <summary>
  // / Transfer to save account
  // / </summary>
  Save,
}

export interface AccountModel {
  id: string;
  userId: string;
  name: string;
  iconColor: string;
  iconName: string;
  balance: number;
  operations: OperationModel[];
}

export interface CreateAccountModel {
  name: string;
  iconColor: string;
  iconName: string;
  balance: number;
  userId: string;
}

export interface OperationModel {
  id: string;
  type: string;
  value: number;
  description: string;
  createdDate: string;
  subCategoryId: string;
  accountId: string;
}

export interface UpdateAccountModel {
  id: string;
  name: string;
  balance: number;
}
