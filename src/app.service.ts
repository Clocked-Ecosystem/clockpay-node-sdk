import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { CurrencyService } from './currency/currency.service';
import { AxiosInstance } from 'axios';
import { LinkService } from './payment/link.service';

@Injectable()
export class ClockPay {
  private readonly baseUrl = 'https://api.theclockchain.io/api/v1';
  public readonly currency: CurrencyService;
  public readonly link: LinkService;
  private http: AxiosInstance;

  constructor(
    private readonly key: string,
    private readonly httpService: HttpService = new HttpService(),
  ) {
    this.http = this.httpService.axiosRef;
    // Create an Axios instance
    // Configure the AxiosInstance with custom defaults
    this.http.defaults.baseURL = this.baseUrl;
    this.http.defaults.headers.common['clock-api-key'] = this.key;
    this.http.defaults.headers.common['Content-Type'] = 'application/json';

    this.currency = new CurrencyService(this.http);
    this.link = new LinkService(this.http);
  }
}
