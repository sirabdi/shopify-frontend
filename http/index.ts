import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import type { NextApiResponse } from 'next/types';

export default class Http {
  static STATUS_OK = 200;
  static STATUS_CREATED = 201;
  static STATUS_BAD_REQUEST = 400;
  static STATUS_UNAUTHORIZE = 401;
  static STATUS_NOT_FOUND = 404;
  static STATUS_METHOD_NOT_ALLOWED = 405;
  static STATUS_INTERNAL_ERROR = 500;

  static resBuilder = <T>(res: NextApiResponse, code: number, message: string, data?: T) => {
    return res.status(code).json({ message, data: data || null });
  };

  static addUnauthorizedInterceptor(instance: AxiosInstance) {
    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // --- IMPORTANT CHANGE START ---
        // Exclude the login and refresh endpoints from the refresh token logic
        const isLoginOrRefreshEndpoint =
          originalRequest.url === '/auth/login' || originalRequest.url === '/auth/refresh';

        if (
          error.response?.status === this.STATUS_UNAUTHORIZE &&
          !originalRequest._retry &&
          !isLoginOrRefreshEndpoint
        ) {
          originalRequest._retry = true;

          try {
            const refreshToken = localStorage.getItem('refresh_token');
            if (!refreshToken) {
              // If there's no refresh token, it means the user isn't logged in
              // or their session has fully expired. Redirect to login.
              localStorage.setItem('IsUnauthorized', 'true'); // Flag for redirect
              throw new Error('No refresh token available. Please log in again.'); // More informative error
            }

            // Attempt to refresh access token
            const res = await axios.post(
              process.env.NEXT_PUBLIC_BACKEND_HOSTNAME + '/auth/refresh',
              { refreshToken },
            );

            const newAccessToken = res.data.accessToken;
            const newRefreshToken = res.data.refreshToken;
            localStorage.setItem('access_token', newAccessToken);
            localStorage.setItem('refresh_token', newRefreshToken);

            // Retry original request with new token
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return instance(originalRequest);
          } catch (refreshError) {
            console.error('Token refresh failed:', refreshError);
            localStorage.setItem('IsUnauthorized', 'true'); // Flag for redirect
            return Promise.reject(refreshError);
          }
        }
        // --- IMPORTANT CHANGE END ---

        // If it's a 401 for login/refresh, or not a 401, or already retried, just reject
        return Promise.reject(error);
      },
    );
  }

  static get client() {
    const client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BACKEND_HOSTNAME,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    // Add token to every request if exists
    client.interceptors.request.use((config) => {
      // Don't attach access token to login or refresh endpoints during initial request
      // (Refresh token is sent in body for /auth/refresh, not header)
      if (config.url !== '/auth/login' && config.url !== '/auth/refresh') {
        const token = localStorage.getItem('access_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    });

    this.addUnauthorizedInterceptor(client);

    return client;
  }

  static async request<T = unknown, R = any>(
    method: Method,
    url: string,
    data?: T,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<R>> {
    try {
      const response = await this.client.request<R>({
        method,
        url,
        data,
        ...config,
      });

      return response;
    } catch (error: any) {
      const status = error?.response?.status;
      const message = error?.response?.data?.message || 'Unknown error occurred';

      switch (status) {
        case this.STATUS_UNAUTHORIZE:
          console.warn('Unauthorized access:', message); // Log the actual message from backend
          break;
        case this.STATUS_BAD_REQUEST: // Added handling for 400
          console.warn('Bad Request:', message);
          break;
        case this.STATUS_NOT_FOUND:
          console.warn('Resource not found:', message);
          break;
        case this.STATUS_INTERNAL_ERROR:
          console.error('Server error:', message);
          break;
        default:
          console.warn('HTTP Error:', message);
      }

      throw error; // Re-throw the original error so `useAuthLogin` can catch it
    }
  }
}
