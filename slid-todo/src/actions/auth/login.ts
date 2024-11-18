import { useLoginStore } from "@/stores/login";
import { instance } from "@/lib/axios";
import axios, { AxiosError } from "axios";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await instance.post<LoginResponse>("/auth/login", data);
    useLoginStore.getState().setAccessToken(response.data.accessToken);
    useLoginStore.getState().setRefreshToken(response.data.refreshToken);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message;

      if (errorMessage) {
        throw new Error(errorMessage);
      }

      throw new Error("로그인 중 오류가 발생했습니다.");
    }

    throw new Error("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
  }
};
