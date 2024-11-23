import { AxiosRequestConfig } from 'axios';

export interface ClockPayConfig {
  apiKey: string;
  baseURL?: string;
  timeout?: number;
  maxRetries?: number;
}

export const DEFAULT_CONFIG: Partial<ClockPayConfig> = {
  baseURL: 'https://api.theclockchain.io/api/v1',
  timeout: 30000,
  maxRetries: 3,
};

export const getAxiosConfig = (config: ClockPayConfig): AxiosRequestConfig => ({
  baseURL: config.baseURL || DEFAULT_CONFIG.baseURL,
  timeout: config.timeout || DEFAULT_CONFIG.timeout,
  headers: {
    'clock-api-key': config.apiKey,
    'Content-Type': 'application/json',
  },
});
