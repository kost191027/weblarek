export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface IProductsResponse {
  total: number;
  items: IProduct[];
}
 
export interface IOrderResponse {
  id: string;
  total: number;
}

export interface IOrderRequest {
  payment: TPayment;
  address: string;
  email: string;
  phone: string;
  items: string[];
  total: number;
}

export interface IProduct {
  id: ProductId;
  description: string;
  image: string;
  title: string;
  category: string;
  price: Price;
}

export interface IBuyer {
  payment: TPayment;
  email: string;
  phone: string;
  address: string;
}

export type TPayment = "card" | "cash" | "";

export type ProductId = string;

export type Price = number | null;