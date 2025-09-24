import axios, {AxiosInstance} from 'axios';
import {appConfig} from '@shared/config';
import {normalizeError} from '@shared/utils/error';
import {logError} from '@shared/utils/logger';

let tokenProvider: (() => Promise<string | null | undefined>) | null = null;

export const setSessionTokenProvider = (provider: () => Promise<string | null | undefined>) => {
  tokenProvider = provider;
};

const createClient = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: appConfig.apiBaseUrl,
    timeout: 15000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use(async config => {
    if (tokenProvider) {
      try {
        const token = await tokenProvider();
        if (token) {
          config.headers = config.headers ?? {};
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        logError('Token provider error', error);
      }
    }

    if (appConfig.apiKey) {
      config.headers = config.headers ?? {};
      config.headers['x-api-key'] = appConfig.apiKey;
    }

    return config;
  });

  instance.interceptors.response.use(
    response => response,
    error => {
      const normalized = normalizeError(
        error.response?.data?.error ?? {
          message: error.message,
          status: error.response?.status,
        },
      );
      return Promise.reject(normalized);
    },
  );

  return instance;
};

export const apiClient = createClient();

export interface RequestConfig<TBody = unknown> {
  path: string;
  method: 'get' | 'post' | 'put' | 'patch' | 'delete';
  body?: TBody;
  params?: Record<string, unknown>;
  extraHeaders?: Record<string, string>;
  signal?: AbortSignal;
}

export const request = async <TResponse, TBody = unknown>({
  path,
  method,
  body,
  params,
  extraHeaders,
  signal,
}: RequestConfig<TBody>) => {
  try {
    const response = await apiClient.request<TResponse>({
      url: path,
      method,
      data: body,
      params,
      headers: extraHeaders,
      signal,
    });

    return response.data;
  } catch (error) {
    throw normalizeError(error);
  }
};
