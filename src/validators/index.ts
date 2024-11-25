import { ClockPayError, ErrorCode } from 'src/errors';

export class InputValidator {
  static validateApiKey(apiKey: string): void {
    if (!apiKey) {
      throw new ClockPayError(
        'API key is required',
        ErrorCode.VALIDATION_ERROR,
      );
    }

    const keyPattern = /^cpay_(live|test)_sk_[a-z0-9]+$/;
    if (!keyPattern.test(apiKey)) {
      throw new ClockPayError(
        'Invalid API key format',
        ErrorCode.VALIDATION_ERROR,
      );
    }
  }

  static validateCreateLinkPayload(payload: any): void {
    const requiredFields = [
      'amount',
      'networkId',
      'coinId',
      'currency',
      'reference',
      'meta',
    ];
    const missingFields = requiredFields.filter((field) => !payload[field]);

    if (missingFields.length > 0) {
      throw new ClockPayError(
        `Missing required fields: ${missingFields.join(', ')}`,
        ErrorCode.VALIDATION_ERROR,
      );
    }

    if (payload.meta) {
      const requiredMetaFields = ['email', 'fullName'];
      const missingMetaFields = requiredMetaFields.filter(
        (field) => !payload.meta[field],
      );

      if (missingMetaFields.length > 0) {
        throw new ClockPayError(
          `Missing required meta fields: ${missingMetaFields.join(', ')}`,
          ErrorCode.VALIDATION_ERROR,
        );
      }
    }
  }
}
