export type Transaction = {
    id: number;
    order_number: string | null;
    points: number;
    type: "add" | "change";
    money: number;
    created_at: string;
  };
  
  export type PaginationLinks = {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  
  export type PaginationMeta = {
    current_page: number;
    from: number;
    last_page: number;
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
  
  export type TransactionsData = {
    data: Transaction[];
    links: PaginationLinks;
    meta: PaginationMeta;
  };
  
  export type PointsResponse = {
    status: number;
    message: string;
    data: {
      points: number;
      money: number;
      transactions: TransactionsData;
    };
  };
  