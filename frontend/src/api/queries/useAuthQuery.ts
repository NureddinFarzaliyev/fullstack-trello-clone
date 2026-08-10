import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { LoginRequestBody, RegisterRequestBody } from "../openapi-types";
import { openApiClient } from "../openApiClient";
import { authQueryKeys } from "./queryKeys";
import { handleQueryError } from "../../shared/utils/errors/errorHandler";

const login = async (body: LoginRequestBody) => {
  const { error } = await openApiClient.POST("/api/v1/auth/login", {
    body,
  });

  if (error) handleQueryError(error);
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: authQueryKeys.all,
      });
    },
  });
};

const register = async (body: RegisterRequestBody) => {
  const { data, error } = await openApiClient.POST("/api/v1/auth/register", {
    body,
  });

  if (error) handleQueryError(error);
  return data;
};

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
  });
};

const logout = async () => {
  const { error } = await openApiClient.GET("/api/v1/auth/logout");

  if (error) handleQueryError(error);
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.resetQueries({
        queryKey: authQueryKeys.all,
        exact: false,
      });
    },
  });
};

const me = async () => {
  const { data, error } = await openApiClient.GET("/api/v1/auth/me");

  if (error) handleQueryError(error);
  return data;
};

export const useMe = () => {
  return useQuery({
    queryKey: authQueryKeys.all,
    queryFn: me,
  });
};
