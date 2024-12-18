export interface Meta {
  total: number;
  skipped: number;
  perPage: number;
  page: number;
  pageCount: number;
}
export interface BadRequest {
  status: boolean;
  message: string;
  data: null;
}
export interface Response {
  status: boolean;
  message: string;
}

export class PhoneNumberSchema {
  code: string | undefined;
  number: string | undefined;
  local: string | undefined;
}
