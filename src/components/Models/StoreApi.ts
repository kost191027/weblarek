import { Api } from '../base/Api';
import type { IApi, IProductsResponse, IProduct, IOrderRequest, IOrderResponse } from '../../types/index';

export class StoreApi {
    private transport: IApi;

    constructor(transport: IApi | Api) {
        // Allow passing either concrete Api or anything implementing IApi
        this.transport = transport as unknown as IApi;
    }

    async getProducts(): Promise<IProduct[]> {
        const data = await this.transport.get<IProductsResponse>('/product/');
        return data.items;
    }

    createOrder(order: IOrderRequest): Promise<IOrderResponse> {
        return this.transport.post<IOrderResponse>('/order/', order, 'POST');
    }
}

export default StoreApi;

