import type { AxiosError, AxiosRequestConfig } from "axios";
import type { ApiResponse } from "@/types/order";
import api from "./api";
import { ApiError } from "./apiError";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

class MakeRequest {
  private static async request<T>(
    method: HttpMethod,
    url: string,
    data?: object,
    params?: Record<string, string>,
    headers?: Record<string, string>,
  ): Promise<T> {
    const config: AxiosRequestConfig = {
      method,
      url,
      data,
      params,
      headers,
    };

    try {
      const response = await api.request<ApiResponse<T>>(config);
      const body = response.data;

      if (!body.success) {
        throw new ApiError(body.message, response.status);
      }

      return body.data as T;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      const axiosError = error as AxiosError<ApiResponse<unknown>>;
      const message =
        axiosError.response?.data?.message ??
        axiosError.message ??
        "Request failed";

      throw new ApiError(message, axiosError.response?.status);
    }
  }

  static get<T>(url: string, params?: Record<string, string>) {
    return this.request<T>("GET", url, undefined, params);
  }

  static post<T>(
    url: string,
    data?: object,
    headers?: Record<string, string>,
  ) {
    return this.request<T>("POST", url, data, undefined, headers);
  }

  static put<T>(url: string, data: object) {
    return this.request<T>("PUT", url, data);
  }

  static patch<T>(
    url: string,
    data?: object,
    params?: Record<string, string>,
  ) {
    return this.request<T>("PATCH", url, data, params);
  }

  static delete<T>(url: string, params?: Record<string, string>) {
    return this.request<T>("DELETE", url, undefined, params);
  }
}

export default MakeRequest;
