import { ProductStatus } from '../enums';
import { User } from './user.interface';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  status: ProductStatus;
  sellerId: number;
  seller: User;
  createdAt: Date;
  updatedAt: Date;
}
