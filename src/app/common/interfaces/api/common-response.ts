export interface CommonResponse<T> {
  result?: T;
  token?: string;
  error?: {
    type: string;
    field?: string;
    message: string;
    status: number;
  };
  totalItems?: number;
}
