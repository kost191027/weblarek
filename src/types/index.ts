export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

// Data types per ТЗ

export type TPayment = 'card' | 'cash';

export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}

export interface IBuyer {
    payment: TPayment | null;
    email: string;
    phone: string;
    address: string;
}

// API contracts
export interface IProductsResponse {
    total: number;
    items: IProduct[];
}

export interface IOrderRequest {
    items: string[]; // array of product ids
    payment: TPayment;
    address: string;
    email: string;
    phone: string;
    total: number;
}

export interface IOrderResponse {
    id: string;
    total: number;
}
