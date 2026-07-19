import type { ApiResponse } from "../types/order";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  let body: ApiResponse<T>;

  try {
    body = await response.json();
  } catch {
    throw new ApiError("Invalid response from server", response.status);
  }

  if (!response.ok || !body.success) {
    throw new ApiError(body.message || "Request failed", response.status);
  }

  return body.data as T;
}
