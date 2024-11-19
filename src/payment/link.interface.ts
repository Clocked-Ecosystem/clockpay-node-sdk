import { PhoneNumberSchema, Response } from 'src/global.interface';

export interface CurrencyNetwork {
  id: string;
  name: string;
  tag: string;
  code: string;
}

export interface CreateLinkDto {
  amount: number;
  networkId: string;
  coinId: string;
  currency: string;
  reference: string;
  meta: {
    title?: string;
    description?: string;
    url?: string;
    redirectUrl?: string;
    customerId?: string;
    email: string;
    fullName: string;
    phoneNumber?: PhoneNumberSchema;
  };
}

export interface CreateLinkResponse extends Response {
  message: string;
  data: {
    link: string;
    reference: string;
  };
}
