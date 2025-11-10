export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ErrorResponse {
  success: false;
  error: string;
  message: string;
}

export interface SuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
}

