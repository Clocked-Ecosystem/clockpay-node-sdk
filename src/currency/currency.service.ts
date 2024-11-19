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
      const errorMessage =
        error?.response?.data?.message ||
        'An unexpected error occurred, please contact administrator';
      throw new Error(errorMessage);
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
      const errorMessage =
        error?.response?.data?.message ||
        'An unexpected error occurred, please contact administrator';
      throw new Error(errorMessage);
    }
  }
}
