import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

export type ErrorType = {
  message: string;
};

class BaseApi {
  private readonly axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        'Content-type': 'application/json; charset=utf-8',
        Accept: 'application/json, text/plain, */*',
      },
      params: {
        isMob: 0,
      },
    });

    this.axiosInstance.interceptors.request.use((response) => response);

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      this.addErrorHandler
    );
  }

  async get<Resp>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Resp>> {
    return this.axiosInstance.get<Resp>(url, config);
  }

  async post<Resp, Req = unknown>(
    url: string,
    data?: Req,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Resp>> {
    return this.axiosInstance.post<Resp>(url, data, config);
  }

  async put<Req, Resp>(
    url: string,
    data?: Req,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Resp>> {
    return this.axiosInstance.put<Resp>(url, data, config);
  }

  async delete<Resp>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Resp>> {
    return this.axiosInstance.delete<Resp>(url, config);
  }

  async addErrorHandler(error: AxiosError<ErrorType>): Promise<ErrorType> {
    return Promise.reject({
      message: error.response?.data.message || error.message,
    });
  }
}

export default BaseApi;
