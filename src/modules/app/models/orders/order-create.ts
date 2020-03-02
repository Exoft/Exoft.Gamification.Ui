export interface OrderCreate {
  id: string;
  title: string;
  description: string;
  price: number;
  icon: string | File;
  categoryIds: string[];
}
