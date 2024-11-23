// src/payment/link.service.ts
import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { CreateLinkDto, CreateLinkResponse } from './link.interface';
import { InputValidator } from '../validators';
import { ClockPayError, ErrorCode } from '../errors';
import { ApiResponse } from '../errors/response';

export class LinkService {
  constructor(private readonly http: AxiosInstance) {}

  async create(data: CreateLinkDto): Promise<CreateLinkResponse> {
    try {
      // Validate input data
      InputValidator.validateCreateLinkPayload(data);

      const response: AxiosResponse<ApiResponse<CreateLinkResponse>> =
        await this.http.post<ApiResponse<CreateLinkResponse>>(
          `/payment/link/create`,
          data,
        );

      return response.data.data as CreateLinkResponse;
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
