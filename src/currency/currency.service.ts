import { AxiosInstance, AxiosResponse } from 'axios';
import { Currency, CurrencyNetwork } from './currency.interface';

export class CurrencyService {
  constructor(private readonly http: AxiosInstance) {}

  async getCurrencies(): Promise<Currency> {
    try {
      const response: AxiosResponse<Currency> = await this.http.get(
        `/wallet/checkout/coins`,
      );
      return response.data;
    } catch (error) {
      console.error('Error in ModuleA:getData', error);
      throw error;
    }
  }

  async getCurrencyNetwork(id: string): Promise<CurrencyNetwork> {
    try {
      const response: AxiosResponse<CurrencyNetwork> = await this.http.get(
        `/wallet/checkout/networks/${id}`,
      );
      return response.data;
    } catch (error) {
      console.error('Error in ModuleA:getData', error);
      throw error;
    }
  }
}
