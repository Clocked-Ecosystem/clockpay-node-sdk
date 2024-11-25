import { AxiosInstance, AxiosResponse } from 'axios';
import { ClockPayError, ErrorCode } from '../../../../src/errors';
import { ApiResponse } from '../../../../src/errors/response';
import {
  CreateLinkDto,
  CreateLinkResponse,
} from '../../../../src/payment/link.interface';
import { LinkService } from '../../../../src/payment/link.service';
import { InputValidator } from '../../../../src/validators';

jest.mock('../../../validators');

describe('LinkService', () => {
  let httpMock: jest.Mocked<AxiosInstance>;
  let linkService: LinkService;

  beforeEach(() => {
    httpMock = {
      post: jest.fn(),
    } as unknown as jest.Mocked<AxiosInstance>;

    linkService = new LinkService(httpMock);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('create', () => {
    const mockDto: CreateLinkDto = {
      amount: 10000,
      networkId: '10919c8d-387a-4208-b3a6-e77052aa7b71',
      coinId: '87d2f6c4-dd60-4ff0-9f6c-0d83cac9abc3',
      currency: 'usd',
      reference: '00d2f6c4-dd60-4ff0-9f6c-0d83cac9abc',
      meta: {
        email: 'string@gmail.com',
        fullName: 'String Tester',
      },
    };

    const mockResponse: CreateLinkResponse = {
      message: 'Link generated successfully',
      data: {
        reference: 'link_123',
        link: 'https://example.com/link_123',
        clientSecret: 'mkeeede',
      },
      status: true,
    };

    it('should create a payment link successfully', async () => {
      const axiosResponse: AxiosResponse<ApiResponse<CreateLinkResponse>> = {
        data: {
          success: true,
          message: 'Link generated successfully',
          data: mockResponse,
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: { headers: {} } as any,
      };

      httpMock.post.mockResolvedValueOnce(axiosResponse);

      const result = await linkService.create(mockDto);

      expect(InputValidator.validateCreateLinkPayload).toHaveBeenCalledWith(
        mockDto,
      );
      expect(httpMock.post).toHaveBeenCalledWith(
        `/payment/link/create`,
        mockDto,
      );
      expect(result).toEqual(mockResponse);
    });

    it('should throw a ClockPayError if Axios returns an API error', async () => {
      const errorResponse = {
        response: {
          data: {
            message: 'Invalid input',
            code: ErrorCode.VALIDATION_ERROR,
          },
        },
      };

      httpMock.post.mockRejectedValueOnce(errorResponse);

      await expect(linkService.create(mockDto)).rejects.toThrow(ClockPayError);
      await expect(linkService.create(mockDto)).rejects.toMatchObject({
        message: 'Invalid input',
        code: ErrorCode.VALIDATION_ERROR,
      });
    });

    it('should throw a ClockPayError for unexpected errors', async () => {
      httpMock.post.mockRejectedValueOnce(new Error('Unexpected error'));

      await expect(linkService.create(mockDto)).rejects.toThrow(ClockPayError);
      await expect(linkService.create(mockDto)).rejects.toMatchObject({
        message: 'An unexpected error occurred',
        code: ErrorCode.UNKNOWN_ERROR,
      });
    });

    it('should throw a ClockPayError if validation fails', async () => {
      (
        InputValidator.validateCreateLinkPayload as jest.Mock
      ).mockImplementationOnce(() => {
        throw new ClockPayError(
          'Validation failed',
          ErrorCode.VALIDATION_ERROR,
        );
      });

      await expect(linkService.create(mockDto)).rejects.toThrow(ClockPayError);
      await expect(linkService.create(mockDto)).rejects.toMatchObject({
        message: 'Validation failed',
        code: ErrorCode.VALIDATION_ERROR,
      });
    });
  });
});
