import BaseApi from './base.api';
import CertificatesApi from './endpoints/certificates.api';

export function useApi() {
  const baseApi = new BaseApi(`${process.env.REACT_APP_API_BASE_URL}`);

  return {
    certificates: new CertificatesApi(baseApi),
  };
}
