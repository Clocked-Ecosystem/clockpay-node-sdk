import { AxiosInstance, AxiosResponse } from 'axios';
import { CreateLinkDto, CreateLinkResponse } from './link.interface';

export class LinkService {
  constructor(private readonly http: AxiosInstance) {}

  async create(data: CreateLinkDto): Promise<CreateLinkResponse> {
    try {
      const response: AxiosResponse<CreateLinkResponse> = await this.http.post(
        `/payment/link/create`,
        data,
      );
      return response.data;
    } catch (error) {
      console.error('Error in ModuleA:getData', error);
      throw error;
    }
  }
}
