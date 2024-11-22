import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { Currency, CurrencyNetwork } from './currency.interface';
import { ApiResponse } from '../errors/response';
import { ClockPayError, ErrorCode } from '../errors';

export class CurrencyService {
  constructor(private readonly http: AxiosInstance) {}

  async getCurrencies(): Promise<Currency[]> {
    try {
      const response: AxiosResponse<ApiResponse<Currency[]>> =
        await this.http.get('/wallet/checkout/coins');

      return response.data.data || [];
    } catch (error) {
      if (error instanceof ClockPayError) {
        throw error;
      }

      if (error instanceof AxiosError) {
        if (error.response?.data) {
          throw ClockPayError.fromApiResponse(error.response.data);
        }
      }

      throw new ClockPayError(
        'An unexpected error occurred',
        ErrorCode.UNKNOWN_ERROR,
      );
    }
  }

  async getCurrencyNetwork(id: string): Promise<CurrencyNetwork> {
    try {
      if (!id) {
        throw new ClockPayError(
          'Currency network ID is required',
          ErrorCode.VALIDATION_ERROR,
        );
      }

      const response: AxiosResponse<ApiResponse<CurrencyNetwork>> =
        await this.http.get(`/wallet/checkout/networks/${id}`);

      return response.data.data as CurrencyNetwork;
    } catch (error) {
      if (error instanceof ClockPayError) {
        throw error;
      }

      if (error instanceof AxiosError) {
        if (error.response?.data) {
          throw ClockPayError.fromApiResponse(error.response.data);
        }
      }

      throw new ClockPayError(
        'An unexpected error occurred',
        ErrorCode.UNKNOWN_ERROR,
      );
    }
  }
}
