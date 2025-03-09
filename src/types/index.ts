export interface NavItem {
  title: string;
  href?: string;
  description?: string;
}
/**
 * `NavItemWithChildren` extends `NavItem` and allows for nested structures.
 * The `card` and `menu` properties are of type `NavItemWithChildren[]`, meaning
 * they can contain children of the same type as their parent. This works because
 * TypeScript supports recursive types, enabling hierarchical or tree-like structures.
 */
export interface NavItemWithChildren extends NavItem {
  card?: NavItemWithChildren[];
  menu?: NavItemWithChildren[];
}

export type MainNavItem = NavItemWithChildren;

export type Image = {
  id: number;
  path: string;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  images: Image[];
  categoryId: string;
  price: number;
  discount: number;
  rating: number;
  inventory: number;
  status: string;
};

export type Post = {
  id: number;
  user: { fullName: string };
  title: string;
  content: string;
  image: string;
  body: string;
  updatedAt: string;
  tags: { name: string }[];
};

export type Category = {
  id: number;
  label: string;
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  imageUrl: string;
};

export type Cart = {
  id: number;
  name: string;
  price: string;
  inventory: number;
  quantity: number;
  storeId: string;
  image: Image;
  category: string;
  subcategory: string;
  storeName: string;
  storeStripeAccountId: string;
};
