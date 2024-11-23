export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  status?: number;
  level?: string;
  timestamp?: string;
}

export interface ApiErrorResponse {
  success: boolean;
  message: string;
  status: number;
  level: string;
  timestamp: string;
}
