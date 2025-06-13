type AttributeOption = {
  id: number;
  title: string;
  price: number;
  image: string;
};

type Attribute = {
  id: number;
  title: string;
  view_type: string;
  type: "required" | "optional";
  options: AttributeOption[];
};

type QuantityOption = {
  id: number;
  quantity: number;
  notes?: string;
};

type Product = {
  id: number;
  image: string[];
  title: string;
  description: string;
  price: number;
  custom_quantity_from: number;
  custom_quantity_to: number;
  is_wishlist: boolean;
  quantities: QuantityOption[];
  need_design_files: boolean;
  attributes: Attribute[];
};

export type ProductDetails = {
  product: Product;
};
