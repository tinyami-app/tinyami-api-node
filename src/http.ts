import axios, { AxiosInstance, AxiosError, AxiosHeaders } from 'axios';
import FormData from 'form-data';
import { TinyamiError } from './types';

export interface TinyamiConfig {
  apiKey: string;
  baseURL?: string;
  timeout?: number;
  maxRetries?: number;
}

export class TinyamiHttpError extends Error {
  constructor(public error: TinyamiError) {
    super(error.message);
    this.name = 'TinyamiHttpError';
  }
}

export function createHttpClient(config: TinyamiConfig): AxiosInstance {
  const client = axios.create({
    baseURL: config.baseURL || 'https://api.tinyami.com',
    timeout: config.timeout || 30000,
    maxBodyLength: Infinity,
    headers: {
      'X-Tinyami-Access-Token': config.apiKey,
      'Content-Type': 'application/json',
    },
  });

  client.interceptors.request.use(
    (config) => {
      // If the request data is FormData, merge its headers
      if (config.data instanceof FormData) {
        const formHeaders = config.data.getHeaders();
        const headers = new AxiosHeaders(config.headers);
        Object.entries(formHeaders).forEach(([key, value]) => {
          headers.set(key, value);
        });
        config.headers = headers;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  client.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{ message?: string; detail?: string }>) => {
      if (error.response) {
        const tinyamiError: TinyamiError = {
          code: error.response.status.toString(),
          message: error.response.data?.message || error.response.data?.detail || 'An error occurred',
          details: error.response.data,
        };
        throw new TinyamiHttpError(tinyamiError);
      }
      throw error;
    }
  );

  return client;
}