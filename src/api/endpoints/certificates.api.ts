import BaseApi from '../base.api';
import { GetCertificatesDTO } from '../../types/dto/get-certificates.dto';
import { ResponseType } from '../../types/types';
import { CheckoutDTO } from '../../types/dto/checkout.dto';

class ProductsApi {
  constructor(private readonly baseApi: BaseApi) {}

  private readonly baseUrl = '/api';

  getCertificates = async (apiKey: string) => {
    const response = await this.baseApi.get<ResponseType<GetCertificatesDTO>>(
      this.baseUrl,
      {
        params: {
          apiKey,
          methodName: 'OSGetGoodList',
        },
      }
    );

    return response.data;
  };

  postCertificates = async (body: CheckoutDTO) => {
    const response = await this.baseApi.post<
      ResponseType<{ CERTNUMBER: string }>
    >(this.baseUrl, undefined, {
      params: {
        methodName: 'OSSale',
        PaymentTypeId: 2,
        ...body,
      },
    });

    return response.data;
  };
}

export default ProductsApi;
