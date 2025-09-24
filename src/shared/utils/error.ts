export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
    public readonly code?: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const normalizeError = (error: unknown): ApiError => {
  if (error instanceof ApiError) {
    return error;
  }

  if (typeof error === 'object' && error !== null && 'message' in error) {
    const {message, status, code} = error as {message: string; status?: number; code?: string};
    return new ApiError(message, status, code);
  }

  return new ApiError('Beklenmedik bir hata oluştu');
};
