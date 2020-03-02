import {Category} from '../categories/category';

export interface Order {
  id: string;
  title: string;
  description: string;
  price: number;
  popularity: 0;
  icon: string;
  categories: Category[];
}
