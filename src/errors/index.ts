export enum ErrorCode {
  AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  API_ERROR = 'API_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

export class ClockPayError extends Error {
  constructor(
    message: string,
    public readonly code: ErrorCode,
    public readonly status?: number,
    public readonly data?: unknown,
  ) {
    super(message);
    this.name = 'ClockPayError';
    Object.setPrototypeOf(this, ClockPayError.prototype);
  }

  static fromApiResponse(error: any): ClockPayError {
    if (error.response?.data) {
      const { data, status } = error.response;
      return new ClockPayError(
        data.message,
        ErrorCode.AUTHENTICATION_ERROR,
        status,
        data,
      );
    }

    return new ClockPayError(
      error.message || 'Unknown error occurred',
      ErrorCode.UNKNOWN_ERROR,
      error.status,
    );
  }
}
