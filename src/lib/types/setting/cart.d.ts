declare type productCart = {
  id: number;
  product: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    id: any;
    image: string;
    title: string;
    price: number;
  };
  description: string;
  quantity: {
    quantity: number;
    // ... other props if needed
  };
  count: number;
  price: number;
};



declare type PlaceOrderType = {
  voucher_code?: string | null;
  address_id: string;
  payment_method: string;
  notes?: string; // Allow undefined
};