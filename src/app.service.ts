import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { CurrencyService } from './currency/currency.service';
import { LinkService } from './payment/link.service';
import { ClockPayConfig, DEFAULT_CONFIG, getAxiosConfig } from './config';
import { InputValidator } from './validators';
import { ClockPayError } from './errors';

@Injectable()
export class ClockPay {
  public readonly currency: CurrencyService;
  public readonly link: LinkService;
  private readonly http: AxiosInstance;

  constructor(
    apiKey: string,
    config: Partial<ClockPayConfig> = {},
    httpService: HttpService = new HttpService(),
  ) {
    InputValidator.validateApiKey(apiKey);

    const fullConfig: ClockPayConfig = {
      ...DEFAULT_CONFIG,
      ...config,
      apiKey,
    };

    this.http = httpService.axiosRef;
    const axiosConfig = getAxiosConfig(fullConfig);
    Object.assign(this.http.defaults, axiosConfig);

    this.http.interceptors.request.use((config) => {
      config.headers['clock-request-timestamp'] = Date.now().toString();
      return config;
    });

    this.http.interceptors.response.use(
      (response) => response,
      (error) => {
        throw ClockPayError.fromApiResponse(error);
      },
    );

    this.currency = new CurrencyService(this.http);
    this.link = new LinkService(this.http);
  }
}
